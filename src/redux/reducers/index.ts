import { combineReducers } from 'redux';

import queue from './queue';
import { State } from '../state';

const reducer = combineReducers<State>({ queue });

export default reducer;
