import styled, { css, keyframes } from '../styled-components';
import { itemHeight } from './SongList';
import { SingleLine } from './styled/SingleLine';
import { lighten } from 'polished';
import { withPx } from '../theme';

const textColor = '#aaaaaa';
const tableSeparatorColor = '#323232';
const rowHoverColor = '#252525';
const rowActiveTextColor = '#ffffff';

export const BaseColumnContainer = styled.div`
  height: ${withPx(itemHeight)};
  font-size: ${props => props.theme.fontSizeTiny};

  color: ${textColor};

  padding-left: ${props => props.theme.sizeSmall};
  padding-right: ${props => props.theme.sizeSmall};
`;

export const ColumnContainer = BaseColumnContainer.extend`
  /* A collection of columns. It's used by both rows and headers. */
  display: flex;
  align-items: center;
  box-sizing: border-box;

  user-select: none;

  border-bottom: solid ${tableSeparatorColor};
`;

export const TableHeader = ColumnContainer.extend`
  text-transform: uppercase;
  border-bottom-width: 2px;
`;

const startingBackgroundColor = lighten(0.15, '#1b1b1b');
const endingBackgroundColor = lighten(0.17, '#1b1b1b');

const flashingBackgroundAnimation = keyframes`
  from {
    background: ${startingBackgroundColor};
  }

  to {
    background: ${endingBackgroundColor};
  }
`;

interface ColumnProps {
  isLoading?: boolean;
}

export const Column =
  SingleLine.extend <
  ColumnProps >
  `
  margin-left: ${props => props.theme.sizeVeryTiny};
  margin-right: ${props => props.theme.sizeVeryTiny};
  height: auto;

  /*
   * The element should have a height even when it's empty so the loading area
   * shows.
   */
  min-height: 14px;
  
  ${props =>
    props.isLoading &&
    css`
      margin-top: ${props => props.theme.sizeTiny};
      margin-bottom: ${props => props.theme.sizeTiny};

      animation-direction: alternate;
      animation-duration: 0.7s;
      animation-iteration-count: infinite;
      animation-name: ${flashingBackgroundAnimation};
      animation-timing-function: ease-in-out;
    `}
  }
`;

interface RowContainerProps {
  isActive: boolean;
}

export const RowContainer =
  ColumnContainer.extend <
  RowContainerProps >
  `
  border-bottom-width: 1px;
  ${props => props.isActive && `color: ${rowActiveTextColor}`};
  
  &:hover {
    background: ${rowHoverColor};
  }
`;
