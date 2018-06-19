import * as React from 'react';

import Audio from '../../components/Audio';
import NowPlaying from '../../components/Footer/NowPlaying';
import PlaybackControls from '../../components/Footer/PlaybackControls';
import AdditionalControls from '../../components/Footer/AdditionalControls';
import { SliderInput } from '../../components/Slider';
import Title from '../../components/Title';

import * as styles from './Footer.css';
import * as barStyles from '../../components/Bars.css';
import { PlayMutationProps } from './mutate';

type Props = PlayMutationProps;

// TODO: Loading States

interface State {
  volume: number;
  currentTime: number;
  duration: number;
  bufferedTo: number;
  loading: boolean;
}

class Footer extends React.Component<Props, State> {
  public state = {
    volume: 1.0,
    currentTime: 0,
    duration: 1,
    bufferedTo: 0,
    loading: false,
  };

  // A reference to the audio element responsible for fetching and playing
  // audio files.
  private audio: Audio | null = null;

  // Whether playSong was called for the current queueItem.
  private hasCalledPlaySong: boolean = false;

  private onAudioRef = (audio: Audio | null) => (this.audio = audio);

  private onPrevious = () => {
    const { currentTime } = this.state;
    const { previousSong } = this.props;

    if (currentTime <= 3) {
      previousSong();
    } else if (this.audio) {
      this.audio.seek(0);
    }
  };

  private onEnded = () => {
    const { nextSong, playing } = this.props;

    if (playing) {
      nextSong();
    }
  };

  private onCurrentTime = (currentTime: number) => {
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

  private onDuration = (duration: number) => this.setState({ duration });

  private onBufferedTo = (bufferedTo: number) => this.setState({ bufferedTo });

  private onLoadingChanged = (loading: boolean) => this.setState({ loading });

  private onSeek = (position: number) => {
    if (this.state.loading || !this.audio) {
      return;
    }

    this.audio.seek(position);
  };

  private onVolume = (volume: number) => this.setState({ volume });

  private togglePlaying = () => {
    const { playing, play, pause } = this.props;
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  public componentWillUpdate(nextProps: Props) {
    if (this.props.queueItem !== nextProps.queueItem) {
      // The playing song has changed, reset flag variable.
      this.hasCalledPlaySong = false;
    }
  }

  public render() {
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
            important
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
              like={nowPlaying.songStats.liked}
              onToggleLike={onToggleLike}
            />
          )}
        </div>
      </footer>
    );
  }
}

interface BarProps {
  className: string;
  position: number;
}

const Bar = ({ className, position }: BarProps) => (
  <div
    style={{ width: `${position * 100}%` }}
    className={[barStyles.bar, className].join(' ')}
  />
);

export default Footer;
