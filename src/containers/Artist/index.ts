import InnerComponent from './component';
import { queryEnhancer } from './enhancers/query';
import { WithIdParams } from '../../paths';
import { RouteComponentProps } from 'react-router';

export type InputProps = RouteComponentProps<WithIdParams>;

const enhanced = queryEnhancer(InnerComponent);

export default enhanced;
