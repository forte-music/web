import { Store } from 'redux';
import { Component } from 'react';
import { State } from '../../redux/state';

import { nextSong, previousSong, togglePlayback } from '../../redux/actions';

// TODO: Use Connect
const handleKeydown = (store: Store<State>) => (e: KeyboardEvent) => {
  // This receives keyboard events even from input elements. These should
  // be ignored.
  // https://github.com/madrobby/keymaster#filter-key-presses
  const tagName = ((e.target || e.srcElement) as Element).tagName;
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

interface Props {
  store: Store<State>;
}

export class KeyboardInteraction extends Component<Props> {
  private handleKeydown: (_: KeyboardEvent) => void;

  constructor(props: Props) {
    super(props);

    this.handleKeydown = handleKeydown(props.store);
  }

  public componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  public render() {
    return null;
  }
}
