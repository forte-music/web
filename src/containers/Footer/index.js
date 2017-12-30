// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { nextSong, previousSong } from '../../actions';
import type { State as ReduxState } from '../../state';

import Player from '../../components/Player';
import NowPlaying from './NowPlaying';
import PlaybackControls from './PlaybackControls';
import AdditionalControls from './AdditionalControls';

import type { Song } from '../../model';
import SONGS from '../../model';

import { container as containerClass } from './index.css';

type Props = {
  className: string,
  nextSong: () => void,
  previousSong: () => void,
  nowPlaying?: Song,
};

type State = {
  playing: boolean,
  liked: boolean,
  volume: number,
  currentTime: number,
  duration: number,
};

class Footer extends Component<Props, State> {
  state = {
    playing: true,
    liked: false,
    volume: 1.0,
    currentTime: 0,
    duration: 0,
  };

  onEnded = () => {
    const { playing } = this.state;
    const { nextSong } = this.props;

    if (playing) {
      nextSong();
    }
  };

  onCurrentTime = (currentTime: number) => this.setState({ currentTime });

  onDuration = (duration: number) => this.setState({ duration });

  onVolume = (volume: number) => this.setState({ volume });

  onToggleLike = () => this.setState(({ liked }) => ({ liked: !liked }));

  togglePlaying = () => this.setState(({ playing }) => ({ playing: !playing }));

  render() {
    const { className, nowPlaying, nextSong, previousSong } = this.props;
    const { playing, currentTime, duration, volume, liked } = this.state;

    const { streamUrl = '' } = nowPlaying || {};

    return (
      <footer className={className}>
        <Player
          src={streamUrl}
          volume={volume}
          playing={playing}
          onEnded={this.onEnded}
          onCurrentTime={this.onCurrentTime}
          onDuration={this.onDuration}
        />

        <div className={containerClass}>
          <NowPlaying song={nowPlaying} />

          <PlaybackControls
            next={nextSong}
            previous={previousSong}
            playing={playing}
            onTogglePlayback={this.togglePlaying}
          />

          <AdditionalControls
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            onVolumeSet={this.onVolume}
            like={liked}
            onToggleLike={this.onToggleLike}
          />
        </div>
      </footer>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ nextSong, previousSong }, dispatch);

const mapStateToProps = ({ queue: { items, position } }: ReduxState) => {
  const song = items[position] || {};
  const { songId } = song;

  const nowPlaying = SONGS[songId];
  return { nowPlaying };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
