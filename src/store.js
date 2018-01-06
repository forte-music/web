// @flow
import { createStore } from 'redux';
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { State } from './state';
import type { Action } from './actions';

import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

import reducer from './reducers';

export type Dispatch = ReduxDispatch<Action>;
export type Store = ReduxStore<State, Action, Dispatch>;

const store: Store = createStore(
  reducer,

  devToolsEnhancer()
);

export default store;
