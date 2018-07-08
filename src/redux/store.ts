import { createStore } from 'redux';
import { State } from './state/index';

import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

import reducer from './reducers/index';

const store = createStore<State>(
  reducer,

  devToolsEnhancer({})
);

export default store;
