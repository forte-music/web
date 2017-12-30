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

  // The empty object is a workaround for a broken type definition.
  // https://github.com/flowtype/flow-typed/pull/1687
  devToolsEnhancer({})
);

export default store;
