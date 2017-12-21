import React, { Component } from 'react';

import {
  bars as barsClass, played as playedClass, bar as barClass,
  buffered as bufferedClass, loading as loadingClass, seek as seekClass,
  times as timesClass, time as timeClass,
} from './Player.css';

import { formatDuration } from '../utils';

// TODO: Expose Events and Refactor Bars + Timers

// This component is responsible for playing audio using the HTML5 audio element
// and rendering progress bars for buffering, played and loading states. It is
// hevily inspired by sampotts/plyr. plyr isn't used because it is heavy and has
// many features which are useless in this project.
//
// [plyr]: https://github.com/sampotts/plyr/blob/9c4b53d761929ab7305f6bfdbd7fc541ed902d43/src/js/plyr.js
//
// It isn't aware of a queue and can only play one song at a time (no
// crossfading).
class Player extends Component {
  state = {
    duration: 0,
    currentTime: 0,
    bufferedTo: 0,
    loading: true,
  };

  constructor(props) {
    super(props);

    this.onDurationChange = this.onDurationChange.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onPlaying = this.onPlaying.bind(this);
    this.onWaiting = this.onWaiting.bind(this);
    this.onCanPlay = this.onCanPlay.bind(this);
    this.onSeeked = this.onSeeked.bind(this);
    this.onSeeking = this.onSeeking.bind(this);
    this.onSeekChange = this.onSeekChange.bind(this);
    this.onRef = this.onRef.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.reconcilePlayingState(prevProps);
  }

  onRef(audioElem) {
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
  reconcilePlayingState(prevProps = {}) {
    const { audioElem } = this;
    const { playing: wasPlayingFromProps, src: oldSrc } = prevProps;
    const { playing: nowPlaying = false, src: newSrc } = this.props;

    const wasPlaying = wasPlayingFromProps && oldSrc === newSrc;

    if (wasPlaying && !nowPlaying) {
      audioElem.pause();
    } else if (!wasPlaying && nowPlaying) {
      audioElem.play();
    }
  }

  onDurationChange(e) {
    this.setState({ duration: this.audioElem.duration });
  }

  onTimeUpdate(e) {
    this.updateTime();
  }

  updateTime() {
    this.setState({ currentTime: this.audioElem.currentTime });
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
    const timeRanges = this.audioElem.buffered;
    if (!timeRanges.length) {
      return;
    }

    const lastBufferRangeIdx = this.audioElem.buffered.length - 1;
    this.setState({ bufferedTo: this.audioElem.buffered.end(lastBufferRangeIdx) });
  }

  waitingTimer = undefined
  onWaiting(e) {
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

  onSeekChange(e) {
    const rawPosition = Number(e.target.value);

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

        <div className={timesClass}>
          <span className={timeClass}>{ formatDuration(currentTime) }</span>
          <span className={timeClass}>{ formatDuration(duration) }</span>
        </div>
      </div>
    );
  }
}

export default Player;
