// @flow
import type { ComponentType } from 'react';
import { compose } from 'redux';

import Footer from './Footer';
import { reduxEnhancer } from './redux';
import { graphqlEnhancer } from './query';
import { graphqlMutationEnhancer } from './mutate';

export type InputProps = {
  className: string,
};

const enhancer = compose(
  reduxEnhancer,
  graphqlEnhancer,
  graphqlMutationEnhancer
);
const EnhancedFooter: ComponentType<InputProps> = enhancer(Footer);

export default EnhancedFooter;
