// @flow
import React, { Component } from 'react';

import Audio from '../../components/Audio';
import NowPlaying from './NowPlaying';
import PlaybackControls from './PlaybackControls';
import AdditionalControls from './AdditionalControls';

import type { Song } from '../../model';

import styles from './Footer.css';
import barStyles from '../../components/Bars.css';

type Props = {
  // A class applied to the component's container container element.
  className: string,

  playing: boolean,

  // Called to skip to the next song in the queue.
  nextSong: () => void,

  // Called to skip to the previous song in the queue.
  previousSong: () => void,

  play: () => void,
  pause: () => void,

  // The currently playing song.
  nowPlaying?: Song,
};

// TODO: Loading and Inactive States
// TODO: Like Mutation

type State = {
  liked: boolean,
  volume: number,
  currentTime: number,
  duration: number,
  bufferedTo: number,
  loading: boolean,
};

class Footer extends Component<Props, State> {
  state = {
    liked: false,
    volume: 1.0,
    currentTime: 0,
    duration: 1,
    bufferedTo: 0,
    loading: false,
  };

  // A reference to the audio element responsible for fetching and playing
  // audio files.
  audio: ?Audio;

  onAudioRef = (audio: ?Audio) => (this.audio = audio);

  onPrevious = () => {
    const { currentTime } = this.state;
    const { previousSong } = this.props;

    if (currentTime <= 3) {
      previousSong();
    } else if (this.audio) {
      this.audio.seek(0);
    }
  };

  onEnded = () => {
    const { nextSong, playing } = this.props;

    if (playing) {
      nextSong();
    }
  };

  onCurrentTime = (currentTime: number) => this.setState({ currentTime });

  onDuration = (duration: number) => this.setState({ duration });

  onBufferedTo = (bufferedTo: number) => this.setState({ bufferedTo });

  onLoadingChanged = (loading: boolean) => this.setState({ loading });

  onSeek = (position: number) => {
    if (this.state.loading) {
      return;
    }

    const time = position / 100 * this.state.duration;

    if (this.audio) {
      this.audio.seek(time);
    }
  };

  onVolume = (volume: number) => this.setState({ volume });

  onToggleLike = () => this.setState(({ liked }) => ({ liked: !liked }));

  togglePlaying = () => {
    const { playing, play, pause } = this.props;
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  render() {
    const { className, nowPlaying, nextSong, playing } = this.props;
    const {
      loading,
      currentTime,
      duration,
      bufferedTo,
      volume,
      liked,
    } = this.state;

    return (
      <footer className={className}>
        {nowPlaying && (
          <Audio
            ref={this.onAudioRef}
            src={nowPlaying.streamUrl}
            playing={playing}
            volume={volume}
            onCurrentTime={this.onCurrentTime}
            onDuration={this.onDuration}
            onBufferedTo={this.onBufferedTo}
            onLoadingChanged={this.onLoadingChanged}
            onEnded={this.onEnded}
          />
        )}

        <div className={barStyles.bars}>
          <Bar
            className={barStyles.buffered}
            position={(nowPlaying && bufferedTo / duration) || 0}
          />
          <Bar
            className={barStyles.played}
            position={(nowPlaying && currentTime / duration) || 0}
          />
          <div
            className={[barStyles.bar, loading ? barStyles.loading : ''].join(
              ' '
            )}
          />

          <BarSlider onChange={this.onSeek} />
        </div>

        <div className={styles.container}>
          <NowPlaying song={nowPlaying} />

          <PlaybackControls
            next={nextSong}
            previous={this.onPrevious}
            disabled={!nowPlaying}
            playing={playing}
            onTogglePlayback={this.togglePlaying}
          />

          <AdditionalControls
            currentTime={nowPlaying && currentTime}
            duration={nowPlaying && (duration || nowPlaying.duration)}
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

type BarProps = {
  className: string,
  position: number,
};

const Bar = ({ className, position }: BarProps) => (
  <div
    style={{ width: `${position * 100}%` }}
    className={[barStyles.bar, className].join(' ')}
  />
);

type BarSliderProps = {
  onChange: (position: number) => void,
};

const BarSlider = ({ onChange }: BarSliderProps) => (
  <input
    onChange={(e: SyntheticInputEvent<HTMLInputElement>) =>
      onChange(Number(e.target.value))
    }
    className={[barStyles.bar, barStyles.seek].join(' ')}
    min={0}
    max={100}
    type="range"
  />
);

export default Footer;
