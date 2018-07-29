import { PositionedHeading } from './PositionedHeading';
import { sizes, withPx } from '../../theme';
import styled from '../../styled-components';

export const SongListPageHeading = PositionedHeading.extend`
  margin-left: ${withPx(sizes.medium + sizes.small)};
`;

export const SongListContainer = styled.div`
  margin-top: ${props => props.theme.sizeSmall};
  margin-left: ${props => props.theme.sizeMedium};
  margin-right: ${props => props.theme.sizeMedium};
`;

export const Prompt = styled.div`
  color: ${props => props.theme.promptTextColor};
  text-align: center;
`;
