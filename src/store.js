// @flow
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

import reducer from './reducers';

const store = createStore(reducer, devToolsEnhancer());

export default store;
