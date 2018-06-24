import { ComponentType } from 'react';

import Footer from './component';
import { reduxEnhancer } from './enhancers/redux';
import { graphqlEnhancer } from './enhancers/query';
import {
  likeMutationEnhancer,
  playSongMutationEnhancer,
} from './enhancers/mutate';

export interface InputProps {
  // A class applied to the component's container container element.
  className: string;
}

const EnhancedFooter: ComponentType<InputProps> = reduxEnhancer(
  graphqlEnhancer(likeMutationEnhancer(playSongMutationEnhancer(Footer)))
);

export default EnhancedFooter;
