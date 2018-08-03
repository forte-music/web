import { Heading } from './Heading';

export const PositionedHeading = Heading.extend`
  margin: ${props => props.theme.sizeMedium};
`;
