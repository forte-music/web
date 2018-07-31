import React, { Component } from 'react';
import styled from '../../../styled-components';

import Audio from '../../Audio';
import { NowPlaying, NowPlayingContainer } from '../../Footer/NowPlaying';
import { PlaybackControls } from '../../Footer/PlaybackControls';
import {
  AdditionalControls,
  AdditionalControlsContainer,
} from '../../Footer/AdditionalControls';
import { SliderInput } from '../../SliderInput';
import Title from '../../Title';
import { BarsContainer, BufferedBar, LoadingBar, PlayedBar } from '../../Bars';

import { FooterQuery_song as Song } from '../enhancers/__generated__/FooterQuery';
import { QueueItem } from '../../../redux/state/queue';

interface Props {
  // A class applied to the component's container element.
  className?: string;

  // The currently playing song. If this is not defined no song is playing
  // and an inactive footer is rendered.
  nowPlaying?: Song;

  // Toggles the liked state of this song. (nowPlaying.stats.liked).
  onToggleLike: () => void;

  // Called to report the currently playing song. This is after playing or
  // seek past the four minutes mark or after half of the track, whichever
  // comes first. This should be called at most once per song.
  playSong: () => void;

  // Called to skip to the next song in the queue.
  nextSong: () => void;

  // Called to skip to the previous song in the queue.
  previousSong: () => void;

  // Called to start playback.
  play: () => void;

  // Called to temporarily stop playback.
  pause: () => void;

  // The currently playing queue item. Undefined if nothing is playing.
  queueItem?: QueueItem;

  // Whether or not audio should be playing.
  playing: boolean;
}

// TODO: Loading States

interface State {
  volume: number;
  currentTime: number;
  duration: number;
  bufferedTo: number;
  loading: boolean;
}

class Footer extends Component<Props, State> {
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

        <BarsContainer>
          <BufferedBar position={(nowPlaying && bufferedTo / duration) || 0} />
          <PlayedBar position={(nowPlaying && currentTime / duration) || 0} />

          {nowPlaying && loading && <LoadingBar />}

          {nowPlaying &&
            !loading && (
              <SliderInput
                min={0}
                max={duration}
                value={currentTime}
                onValueChange={this.onSeek}
                onStartSliding={pause}
                onEndSliding={play}
              />
            )}
        </BarsContainer>

        <PlayerContainer>
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
        </PlayerContainer>
      </footer>
    );
  }
}

const PlayerContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;

  /*
  Disable user selection because finding a good highlight color is hard. People
  who really want to copy stuff can use inspect element.
  */
  user-select: none;

  & ${NowPlayingContainer}, & ${AdditionalControlsContainer} {
    flex: 1;
  }
`;

export default Footer;
