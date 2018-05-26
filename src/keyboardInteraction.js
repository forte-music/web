// @flow
import { Component } from 'react';
import type { Store } from './store';

import { nextSong, previousSong, togglePlayback } from './actions';

const handleKeydown = (store: Store) => (e: KeyboardEvent) => {
  // This receives keyboard events even from input elements. These should
  // be ignored.
  // https://github.com/madrobby/keymaster#filter-key-presses
  const tagName = ((e.target || e.srcElement: any): HTMLElement).tagName;
  if (tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA') {
    return;
  }

  if (e.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (e.code) {
    case 'ArrowLeft':
    case 'KeyH':
      store.dispatch(previousSong());
      break;

    case 'ArrowRight':
    case 'KeyL':
      store.dispatch(nextSong());
      break;

    case 'Space':
      store.dispatch(togglePlayback());
      break;

    default:
      return;
  }

  e.preventDefault();
};

type Props = {
  store: Store,
};

export class KeyboardInteraction extends Component<Props> {
  handleKeydown = (e: KeyboardEvent): void => {};

  constructor(props: Props) {
    super(props);

    this.handleKeydown = handleKeydown(props.store);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    return null;
  }
}
