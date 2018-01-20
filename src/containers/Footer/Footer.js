// @flow
import React, { Component } from 'react';

import Audio from '../../components/Audio';
import NowPlaying from './NowPlaying';
import PlaybackControls from './PlaybackControls';
import AdditionalControls from './AdditionalControls';
import { SliderInput } from '../../components/Slider';
import Title from '../../components/Title';

import styles from './Footer.css';
import barStyles from '../../components/Bars.css';
import type { QueueItem } from '../../state/queue';

type Artist = {
  id: string,
  name: string,
};

type Album = {
  id: string,
  name: string,
  artworkUrl: string,
};

type SongUserStats = {
  liked: boolean,
};

export type Song = {
  streamUrl: string,
  duration: number,
  name: string,
  album: Album,
  artists: Artist[],
  stats: SongUserStats,
};

type Props = {
  // A class applied to the component's container container element.
  className: string,

  // Called to skip to the next song in the queue.
  nextSong: () => void,

  // Called to skip to the previous song in the queue.
  previousSong: () => void,

  // Called to report the currently playing song. This is after playing or
  // seek past the four minutes mark or after half of the track, whichever
  // comes first. This should be called at most once per song.
  playSong: () => void,

  // Whether or not audio should be playing.
  playing: boolean,

  // Called to start playback.
  play: () => void,

  // Called to temporarily stop playback.
  pause: () => void,

  // Toggles the liked state of this song. (nowPlaying.stats.liked).
  onToggleLike: () => void,

  // The currently playing song. If this is not defined no song is playing
  // and an inactive footer is rendered.
  nowPlaying?: Song,

  // The currently playing queue item.
  queueItem?: QueueItem,
};

// TODO: Loading States

type State = {
  volume: number,
  currentTime: number,
  duration: number,
  bufferedTo: number,
  loading: boolean,
};

class Footer extends Component<Props, State> {
  state = {
    volume: 1.0,
    currentTime: 0,
    duration: 1,
    bufferedTo: 0,
    loading: false,
  };

  // A reference to the audio element responsible for fetching and playing
  // audio files.
  audio: ?Audio;

  // Whether playSong was called for the current queueItem.
  hasCalledPlaySong: boolean = false;

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

  onCurrentTime = (currentTime: number) => {
    this.setState({ currentTime });

    const { duration } = this.state;
    if (!duration) {
      return;
    }

    if (
      !this.hasCalledPlaySong &&
      (currentTime >= duration / 2 || currentTime >= 4 * 60)
    ) {
      this.hasCalledPlaySong = true;
      this.props.playSong();
    }
  };

  onDuration = (duration: number) => this.setState({ duration });

  onBufferedTo = (bufferedTo: number) => this.setState({ bufferedTo });

  onLoadingChanged = (loading: boolean) => this.setState({ loading });

  onSeek = (position: number) => {
    if (this.state.loading || !this.audio) {
      return;
    }

    this.audio.seek(position);
  };

  onVolume = (volume: number) => this.setState({ volume });

  togglePlaying = () => {
    const { playing, play, pause } = this.props;
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  componentWillUpdate(nextProps: Props) {
    if (this.props.queueItem !== nextProps.queueItem) {
      // The playing song has changed, reset flag variable.
      this.hasCalledPlaySong = false;
    }
  }

  render() {
    const {
      className,
      nowPlaying,
      nextSong,
      playing,
      onToggleLike,
      pause,
      play,
    } = this.props;
    const { loading, currentTime, duration, bufferedTo, volume } = this.state;

    return (
      <footer className={className}>
        {nowPlaying && (
          <Title
            segments={[
              nowPlaying.album.name,
              nowPlaying.artists.map(({ name }) => name).join(', '),
            ]}
            important={true}
          />
        )}

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

          <SliderInput
            min={0}
            max={duration}
            onValueChange={this.onSeek}
            onStartSliding={pause}
            onEndSliding={play}
          />
        </div>

        <div className={styles.container}>
          {nowPlaying && <NowPlaying song={nowPlaying} />}

          <PlaybackControls
            next={nextSong}
            previous={this.onPrevious}
            disabled={!nowPlaying}
            playing={playing}
            onTogglePlayback={this.togglePlaying}
          />

          {nowPlaying && (
            <AdditionalControls
              currentTime={currentTime}
              duration={duration || nowPlaying.duration}
              volume={volume}
              onVolumeSet={this.onVolume}
              like={nowPlaying.stats.liked}
              onToggleLike={onToggleLike}
            />
          )}
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

export default Footer;
