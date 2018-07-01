import { RouteComponentProps } from 'react-router';
import { WithIdParams } from '../../paths';
import { queryEnhancer } from './enhancers/query';
import Album from './component';

export type Props = RouteComponentProps<WithIdParams>;

const enhanced = queryEnhancer(Album);

export default enhanced;
