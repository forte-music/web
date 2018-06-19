import { ComponentType } from 'react';

import Footer from './Footer';
import { reduxEnhancer } from './redux';
import { graphqlEnhancer } from './query';
import { likeMutationEnhancer, playSongMutationEnhancer } from './mutate';

export interface InputProps {
  // A class applied to the component's container container element.
  className: string;
}

const EnhancedFooter: ComponentType<InputProps> = reduxEnhancer(
  graphqlEnhancer(likeMutationEnhancer(playSongMutationEnhancer(Footer)))
);

export default EnhancedFooter;
