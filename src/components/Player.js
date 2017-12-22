// @flow
import React, { Component } from 'react';

import {
  bars as barsClass, played as playedClass, bar as barClass,
  buffered as bufferedClass, loading as loadingClass, seek as seekClass,
} from './Player.css';

type Props = {
  src?: string,

  // Whether or not the track is playing.
  playing?: boolean,

  // Called when the duration has changed with the new duration in seconds.
  onDuration?: (duration: number) => void,

  // Called when position has changed with the new position in seconds.
  onCurrentTime?: (time: number) => void,

  // Called when the track is played completely by playing or seeking.
  onEnded?: () => void,

  onCanPlayThrough?: () => void,
  onError?: () => void,
};

type State = {
  duration: number,
  currentTime: number,
  bufferedTo: number,
  loading: boolean,
};

// A declarative wrapper around the HTML5 audio element. It renders fancy
// progress bars for buffering, played and loading states and exposes a minimal
// amount of information.
//
// It is heavily inspired by sampotts/plyr.
// [plyr]: https://github.com/sampotts/plyr/blob/9c4b53d761929ab7305f6bfdbd7fc541ed902d43/src/js/plyr.js
class Player extends Component<Props, State> {
  audioElem: ?HTMLAudioElement;

  state = {
    duration: 0,
    currentTime: 0,
    bufferedTo: 0,
    loading: true,
  };

  constructor(props: Props) {
    super(props);

    // Hack to get around the hack that is javascript classes.
    const self: any = this;
    self.onDurationChange = this.onDurationChange.bind(this);
    self.onTimeUpdate = this.onTimeUpdate.bind(this);
    self.onProgress = this.onProgress.bind(this);
    self.onPlaying = this.onPlaying.bind(this);
    self.onWaiting = this.onWaiting.bind(this);
    self.onCanPlay = this.onCanPlay.bind(this);
    self.onSeeked = this.onSeeked.bind(this);
    self.onSeeking = this.onSeeking.bind(this);
    self.onSeekChange = this.onSeekChange.bind(this);
    self.onRef = this.onRef.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    this.reconcilePlayingState(prevProps);
  }

  onRef(audioElem: ?HTMLAudioElement) {
    this.audioElem = audioElem;

    this.reconcilePlayingState();
  }

  // TODO: When Seeking Multiple Songs Back to Back This Function Throws
  // DOMException: The play() request was interrupted by a new load request.
  // https://goo.gl/LdLk22
  //
  // The HTML5 audio element doesn't have a declarative playing attribute. It
  // only exposes an imperative (.play(), .pause()) api for controlling
  // playback. There aren't any events which allow the user agent to pause
  // playback; this is the only property which can change the playing state.
  reconcilePlayingState(prevProps: Props = {}) {
    const { audioElem } = this;
    if (!audioElem) {
      return;
    }

    const { playing: wasPlayingFromProps, src: oldSrc } = prevProps;
    const { playing: nowPlaying = false, src: newSrc } = this.props;

    const wasPlaying = wasPlayingFromProps && oldSrc === newSrc;

    if (wasPlaying && !nowPlaying) {
      audioElem.pause();
    } else if (!wasPlaying && nowPlaying) {
      audioElem.play();
    }
  }

  onDurationChange() {
    if (!this.audioElem) {
      return;
    }

    const duration = this.audioElem.duration;
    this.setState({ duration });

    this.props.onDuration && this.props.onDuration(duration);
  }

  onTimeUpdate() {
    this.updateTime();
  }

  updateTime() {
    if (!this.audioElem) {
      return;
    }

    const currentTime = this.audioElem.currentTime;
    this.setState({ currentTime });
    this.props.onCurrentTime && this.props.onCurrentTime(currentTime);
  }

  onPlaying() {
    this.updateLoaded();
  }

  onProgress() {
    this.updateLoaded();
  }

  // Update state from the audio element to reflect the amount of buffered
  // content.
  updateLoaded() {
    if (!this.audioElem) {
      return;
    }

    const timeRanges = this.audioElem.buffered;
    if (!timeRanges.length) {
      return;
    }

    const lastBufferRangeIdx = this.audioElem.buffered.length - 1;
    this.setState({ bufferedTo: this.audioElem.buffered.end(lastBufferRangeIdx) });
  }

  waitingTimer = undefined
  onWaiting() {
    clearTimeout(this.waitingTimer);

    this.waitingTimer = setTimeout(() => this.onWaitingDelayed(), 250);
  }

  setLoaded() {
    clearTimeout(this.waitingTimer);
    this.setState({ loading: false });
  }

  onWaitingDelayed() {
    this.setState({ loading: true });
  }

  onCanPlay() {
    this.setLoaded();
  }

  // The time changes while seeking even before the new data is loaded.
  onSeeking() {
    this.updateTime();
  }

  onSeeked() {
    this.setLoaded();
  }

  onSeekChange(e: SyntheticInputEvent<HTMLInputElement>) {
    const rawPosition = Number(e.target.value);

    if (!this.audioElem) {
      return;
    }

    // Request seek to position.
    this.audioElem.currentTime = rawPosition / 100 * this.state.duration;
  }

  render() {
    const { src, onCanPlayThrough, onEnded, onError } = this.props;
    const { duration, currentTime, bufferedTo, loading } = this.state;

    return (
      <div>
        <audio
          ref={this.onRef}
          src={src}
          onCanPlayThrough={onCanPlayThrough}
          onEnded={onEnded}
          onError={onError}
          onTimeUpdate={this.onTimeUpdate}
          onProgress={this.onProgress}
          onPlaying={this.onPlaying}
          onDurationChange={this.onDurationChange}
          onWaiting={this.onWaiting}
          onCanPlay={this.onCanPlay}
          onSeeked={this.onSeeked}
          onSeeking={this.onSeeking} />

        <div className={barsClass}>
          <div
            style={{width: `${bufferedTo/duration * 100}%`}}
            className={[barClass, bufferedClass].join(' ')} />

          <div
            style={{width: `${currentTime/duration * 100}%`}}
            className={[barClass, playedClass].join(' ')} />

          <div
            className={[barClass, loading && loadingClass].join(' ')} />

          <input
            onChange={this.onSeekChange}
            className={[barClass, seekClass].join(' ')}
            min={0}
            max={100}
            type='range' />
        </div>
      </div>
    );
  }
}

export default Player;
