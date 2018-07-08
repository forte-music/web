import { createStore } from 'redux';
import { State } from './redux/state';

import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

import reducer from './redux/reducers';

const store = createStore<State>(
  reducer,

  devToolsEnhancer({})
);

export default store;
