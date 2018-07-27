import { Dispatch, bindActionCreators } from 'redux';

import { State } from '../../../redux/state';
import { QueueItem } from '../../../redux/state/queue';
import {
  Action,
  nextSong,
  pause,
  play,
  previousSong,
} from '../../../redux/actions';
import { nowPlaying as nowPlayingSelector } from '../../../redux/selectors/nowPlaying';
import { createReduxComponent } from '../../../redux/render';

interface StateEnhancedProps {
  // Information about the currently playing item in the queue. Undefined if
  // nothing is playing.
  sourceMetadata?: PlaybackSourceMetadata;

  // Whether or not audio should be playing.
  playing: boolean;
}

const mapStateToProps = ({ queue }: State): StateEnhancedProps => {
  const nowPlaying = nowPlayingSelector(queue);
  if (!nowPlaying) {
    return { playing: queue.isPlaying };
  }

  const currentlyPlaying = getMetadata(nowPlaying);

  return { playing: queue.isPlaying, sourceMetadata: currentlyPlaying };
};

const getMetadata = (item: QueueItem): PlaybackSourceMetadata => {
  const songId = item.songId;
  const playingFrom = item.playingFrom;
  if (playingFrom.type === 'ALBUM') {
    return { songId, albumId: playingFrom.albumId };
  }

  if (playingFrom.type === 'ARTIST') {
    return { songId, artistId: playingFrom.artistId };
  }

  return { songId };
};

type PlayingFromIdentifier = { albumId: string } | { artistId: string } | {};

type PlaybackSourceMetadata = {
  songId: string;
} & PlayingFromIdentifier;

interface DispatchProps {
  // Called to skip to the next song in the queue.
  nextSong: () => void;

  // Called to skip to the previous song in the queue.
  previousSong: () => void;

  // Called to start playback.
  play: () => void;

  // Called to temporarily stop playback.
  pause: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps =>
  bindActionCreators({ nextSong, previousSong, play, pause }, dispatch);

export const FooterState = createReduxComponent<
  State,
  StateEnhancedProps,
  DispatchProps
>(mapStateToProps, mapDispatchToProps);
