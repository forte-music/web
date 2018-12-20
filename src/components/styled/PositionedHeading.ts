import styled from '../../styled-components';
import { Heading } from './Heading';

export const PositionedHeading = styled(Heading)`
  margin: ${props => props.theme.sizeMedium};
`;
