import { Action } from './actions';
import { createStore } from 'redux';
import reducer from './reducers';
import { State } from './state';

export const getStateAfter = (action: Action): State => {
  const store = createStore(reducer);
  store.dispatch(action);
  return store.getState();
};
