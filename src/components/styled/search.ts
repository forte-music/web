import styled from '../../styled-components';
import { StyledComponentClass } from 'styled-components';
import { Theme } from '../../theme';

import { artworkGrid } from '../../styled-mixins/artworkGrid';
import { Container } from '../Container';
import { FocusedTextInput } from '../FocusedTextInput';

// @ts-ignore
export const ArtworkGrid: StyledComponentClass<{}, Theme> = styled.div`
  ${artworkGrid};
`;

const placeholderColor = '#757575';
const focusedTextColor = '#ffffff';

export const SearchHeaderContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

export const SearchInput = styled(FocusedTextInput)`
  background: none;
  border: none;
  outline: none;

  color: ${focusedTextColor};

  border-bottom: 1px solid ${placeholderColor};
  padding: ${props => props.theme.sizeTiny};
  font-size: ${props => props.theme.fontSizeMedium};

  margin-top: 68px;
  margin-bottom: ${props => props.theme.sizeLarge};
  margin-left: ${props => props.theme.sizeSmall};
  margin-right: ${props => props.theme.sizeSmall};

  &:focus {
    border-bottom-color: ${focusedTextColor};
  }
`;

export const SearchResultTypeContainer = styled.div`
  padding: ${props => props.theme.sizeSmall};
`;

export const SearchResultTypeHeader = styled.div`
  color: #ffffff;
  font-size: ${props => props.theme.fontSizeMedium};
  margin-bottom: ${props => props.theme.sizeSmall};
`;

export const EmptyResult = styled.div`
  color: ${props => props.theme.headerSecondaryTextColor};
  text-align: center;
`;

export const SpacedEmptyResult = EmptyResult.extend`
  margin-top: ${props => props.theme.sizeSmall};
`;
