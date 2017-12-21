// @flow
import type { Action } from '../actions';
import type { State } from '../state';

import queueReducer from './queue';
import { initialState } from '../state';

const reducer = (state: State = initialState, action: Action): State => ({
  queue: queueReducer(state.queue, action),
});

export default reducer;
