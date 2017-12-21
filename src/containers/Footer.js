import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addToQueue, nextSong, previousSong } from '../actions';
import store from '../store';

import Player from '../components/Player';

class Footer extends Component {
  state = {
    playing: true,
  };

  constructor(props) {
    super(props);

    this.onEnded = this.onEnded.bind(this);
  }

  onEnded() {
    const { playing } = this.state;
    const { nextSong } = this.props;

    if (playing) {
      nextSong();
    }
  }

  render() {
    const { className, nowPlayingSrc } = this.props;
    const { playing } = this.state;

    return (
      <footer className={className}>
        <Player
          src={nowPlayingSrc}
          playing={playing}
          onEnded={this.onEnded} />
      </footer>
    );
  }
}

const SONGS = {
  'a': '13 - Control.flac',
  'b': '01 - Stole the Show (feat. Parson James).flac',
  'c': "01 - I'm That... (Remix) [feat. Beenie Man & Azealia Banks].m4a",
  'd': '01 - Bugatti (feat. Future & Rick Ross).flac',
};

store.dispatch(addToQueue([ 'a', 'b', 'c', 'd' ], "END"));

const mapDispatchToProps = dispatch => ({
  nextSong: () => dispatch(nextSong()),
  previousSong: () => dispatch(previousSong()),
});

const mapStateToProps = ({ queue: { items, position }}) => {
  const song = items[position] || {};
  const { songId } = song;

  return { nowPlayingSrc: `/music/${SONGS[songId]}` };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
