import { createStore } from 'redux';
import { State } from './state';

import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

import reducer from './reducers';
import { Action } from './actions';

const store = createStore<State, Action, any, any>(
  reducer,

  devToolsEnhancer({})
);

export default store;
