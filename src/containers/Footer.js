import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addToQueue, nextSong, previousSong } from '../actions';
import store from '../store';
import { formatDuration } from '../utils';

import Player from '../components/Player';
import PlayIcon from '../icons/Play';

import {
  controls as controlsClass,
  mainIcon as mainIconClass,
  time as timeClass,
  container as containerClass,
} from './Footer.css';

class Footer extends Component {
  state = {
    playing: true,
  };

  constructor(props) {
    super(props);

    this.onEnded = this.onEnded.bind(this);
    this.onCurrentTime = this.onCurrentTime.bind(this);
    this.onDuration = this.onDuration.bind(this);
    this.togglePlaying = this.togglePlaying.bind(this);
  }

  onEnded() {
    const { playing } = this.state;
    const { nextSong } = this.props;

    if (playing) {
      nextSong();
    }
  }

  onCurrentTime(currentTime: number) {
    this.setState({ currentTime });
  }

  onDuration(duration: number) {
    this.setState({ duration });
  }

  togglePlaying() {
    this.setState(({ playing }) => ({ playing: !playing }));
  }

  render() {
    const { className, nowPlayingSrc } = this.props;
    const { playing, currentTime, duration } = this.state;

    // TODO: Add Additional Icons

    return (
      <footer className={className}>
        <Player
          src={nowPlayingSrc}
          playing={playing}
          onEnded={this.onEnded}
          onCurrentTime={currentTime => this.setState({ currentTime })}
          onDuration={duration => this.setState({ duration })}
        />

        <div className={containerClass}>
          <span className={timeClass}>{formatDuration(currentTime)}</span>

          <div className={controlsClass}>
            <PlayIcon onClick={this.togglePlaying} svgClass={mainIconClass} />
          </div>

          <span className={timeClass}>{formatDuration(duration)}</span>
        </div>
      </footer>
    );
  }
}

const SONGS = {
  a: '13 - Control.flac',
  b: '01 - Stole the Show (feat. Parson James).flac',
  c: "01 - I'm That... (Remix) [feat. Beenie Man & Azealia Banks].m4a",
  d: '01 - Bugatti (feat. Future & Rick Ross).flac',
};

store.dispatch(addToQueue(['a', 'b', 'c', 'd'], 'END'));

const mapDispatchToProps = dispatch => ({
  nextSong: () => dispatch(nextSong()),
  previousSong: () => dispatch(previousSong()),
});

const mapStateToProps = ({ queue: { items, position } }) => {
  const song = items[position] || {};
  const { songId } = song;

  return { nowPlayingSrc: `/music/${SONGS[songId]}` };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
