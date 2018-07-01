import { queryEnhancer } from './enhancers/query';
import Album from './component';

export interface Props {
  id: string;
}

const enhanced = queryEnhancer(Album);

export default enhanced;
