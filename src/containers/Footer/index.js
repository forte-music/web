// @flow
import type { ComponentType } from 'react';
import { compose } from 'redux';

import Footer from './Footer';
import { reduxEnhancer } from './redux';
import { graphqlEnhancer } from './query';
import { likeMutationEnhancer, playSongMutationEnhancer } from './mutate';

export type InputProps = {
  className: string,
};

const enhancer = compose(
  reduxEnhancer,
  graphqlEnhancer,
  likeMutationEnhancer,
  playSongMutationEnhancer
);
const EnhancedFooter: ComponentType<InputProps> = enhancer(Footer);

export default EnhancedFooter;
