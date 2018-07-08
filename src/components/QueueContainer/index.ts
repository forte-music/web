import Queue from './component';
import { reduxEnhancer } from './enhancers/redux';

const EnhancedComponent = reduxEnhancer(Queue);

export default EnhancedComponent;
