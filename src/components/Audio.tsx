import * as React from 'react';

interface Props {
  // The source. Passed to the audio element.
  src: string;

  // Whether or not the track is playing.
  playing?: boolean;

  // Called when the playing state changes. Playing is true when not paused
  // or stopped, this includes when buffering.
  // onSetPlaying: boolean => void,

  // The playback volume.
  volume?: number;

  // Called when the duration has changed with the new duration in seconds.
  onDuration?: (duration: number) => void;

  // Called when position has changed with the new position in seconds.
  onCurrentTime: (time: number) => void;

  // Called when the amount of data buffered has increased with the new
  // position in seconds from the beginning.
  onBufferedTo?: (time: number) => void;

  // Called when the track is played completely by playing or seeking.
  onEnded?: () => void;

  // Called when the entire track is buffered.
  onCanPlayThrough?: () => void;

  // Called when a non-recoverable error has occurred (cannot fetch track).
  onError?: () => void;

  // Called when the loading state changes.
  onLoadingChanged?: (isLoading: boolean) => void;
}

// A simple, declarative wrapper around the HTML audio element.
class Audio extends React.Component<Props> {
  // The audio element which handles playback.
  private audioElem: HTMLAudioElement | null = null;

  private reconcileProps = async () => {
    const { audioElem } = this;
    if (!audioElem) {
      // There is nothing to reconcile if there isn't an audio element.
      return;
    }

    const wasPlaying = !audioElem.paused;
    const { playing: nowPlaying, volume } = this.props;

    if (volume !== undefined && audioElem.volume !== volume) {
      audioElem.volume = volume;
    }

    if (wasPlaying !== nowPlaying) {
      if (nowPlaying) {
        try {
          await audioElem.play();
        } catch (e) {
          // suppress errors
          // tslint:disable-next-line: no-console
          console.log(e);
        }
      } else {
        audioElem.pause();
      }
    }
  };

  public componentDidUpdate() {
    this.reconcileProps();
  }

  // A public function to seek to an offset in seconds relative to the
  // beginning of the track.
  //
  // This is provided because differentiating between the currentTime prop
  // being updated from the onCurrentTime event and something else isn't
  // possible. This is a problem because the time between the currentTime
  // is updated through the event and the time that update triggers an
  // update in reconcileProps can be larger than the tolerance specified in
  // reconcileProps causing the player to be sent backwards during normal
  // playback.
  //
  // Audio playback is a performance critical region (stutters are not fun
  // to hear).
  public seek = (currentTime: number) => {
    if (!this.audioElem) {
      throw new Error('Called seek before audioElem was populated.');
    }

    this.audioElem.currentTime = currentTime;
  };

  private onDurationChange = () => {
    if (!this.audioElem) {
      throw new Error('Got duration callback without an audio element.');
    }

    const duration = this.audioElem.duration;
    if (this.props.onDuration) {
      this.props.onDuration(duration);
    }
  };

  private updateTime = () => {
    if (!this.audioElem) {
      throw new Error('updateTime called without an audio element.');
    }

    const currentTime = this.audioElem.currentTime;
    this.props.onCurrentTime(currentTime);
  };

  // Update state from the audio element to reflect the amount of buffered
  // content.
  private updateLoaded = () => {
    if (!this.audioElem) {
      throw new Error('updateLoaded called without an audio element.');
    }

    const timeRanges = this.audioElem.buffered;
    if (!timeRanges.length) {
      return;
    }

    const lastBufferRangeIdx = this.audioElem.buffered.length - 1;
    const bufferedTo = this.audioElem.buffered.end(lastBufferRangeIdx);

    if (this.props.onBufferedTo) {
      this.props.onBufferedTo(bufferedTo);
    }
  };

  private waitingTimer?: number;
  private onWaiting = () => {
    window.clearTimeout(this.waitingTimer);

    this.waitingTimer = window.setTimeout(() => this.onWaitingDelayed(), 250);
  };

  private setLoaded = () => {
    clearTimeout(this.waitingTimer);
    if (this.props.onLoadingChanged) {
      this.props.onLoadingChanged(false);
    }
  };

  private onWaitingDelayed = () => {
    if (this.props.onLoadingChanged) {
      this.props.onLoadingChanged(true);
    }
  };

  public render() {
    return (
      <audio
        ref={(audioElem: HTMLAudioElement | null) => {
          this.audioElem = audioElem;
          this.reconcileProps();
        }}
        src={this.props.src}
        onCanPlayThrough={this.props.onCanPlayThrough}
        onEnded={this.props.onEnded}
        onError={this.props.onError}
        onTimeUpdate={this.updateTime}
        onProgress={this.updateLoaded}
        onPlaying={this.updateLoaded}
        onDurationChange={this.onDurationChange}
        onWaiting={this.onWaiting}
        onCanPlay={this.setLoaded}
        // The time changes while seeking even before the new data is loaded.
        onSeeked={this.setLoaded}
        onSeeking={this.updateTime}
      />
    );
  }
}

export default Audio;
