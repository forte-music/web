import { Component } from 'react';

import { nextSong, previousSong, togglePlayback } from '../../redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface Props {
  previousSong: () => void;
  nextSong: () => void;
  togglePlayback: () => void;
}

class KeyboardInteractionInner extends Component<Props> {
  // TODO: Remove Me
  constructor(props: Props) {
    super(props);
  }

  private handleKeydown = (e: KeyboardEvent) => {
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
        if (!e.altKey){
            this.props.previousSong();
        }
        break;

      case 'ArrowRight':
      case 'KeyL':
        if (!e.altKey){
            this.props.nextSong();
        }
        break;

      case 'Space':
        this.props.togglePlayback();
        break;

      default:
        return;
    }

    e.preventDefault();
  };

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

const enhancer = connect<{}, Props>(undefined, dispatch =>
  bindActionCreators({ nextSong, previousSong, togglePlayback }, dispatch)
);

export const KeyboardInteraction = enhancer(KeyboardInteractionInner);
