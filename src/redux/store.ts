import { createStore } from 'redux';
import { State } from './state';

import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

import reducer from './reducers';

const store = createStore<State>(
  reducer,

  devToolsEnhancer({})
);

export default store;
