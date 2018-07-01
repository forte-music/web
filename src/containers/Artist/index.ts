import InnerComponent from './component';
import { queryEnhancer } from './enhancers/query';

export interface InputProps {
  id: string;
}

const enhanced = queryEnhancer(InnerComponent);

export default enhanced;
