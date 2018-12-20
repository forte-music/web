import { PositionedHeading } from './PositionedHeading';
import { sizes, withPx } from '../../theme';
import styled from '../../styled-components';

export const SongListPageHeading = styled(PositionedHeading)`
  margin-left: ${withPx(sizes.medium + sizes.small)};
`;

export const SongListContainer = styled.div`
  margin: ${props => props.theme.sizeSmall} ${props => props.theme.sizeMedium};
`;

export const Prompt = styled.div`
  margin-top: ${props => props.theme.sizeSmall};
  color: ${props => props.theme.promptTextColor};
  text-align: center;
`;
