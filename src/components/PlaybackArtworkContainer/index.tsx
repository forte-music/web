import { ReactNode } from 'react';

import { Kind, QueueItemSource } from '../../redux/state/queue';
import PlaybackArtwork from '../PlaybackArtwork';
import reduxEnhancer from './enhancers/redux';

export interface Props {
  // The kind of list this is. Used to check whether the current playing
  // item is from this list. This information also passed to onStartPlayback.
  kind: Kind;

  // The id of this list. Used to check whether the current playing item is
  // from this list. This information is also passed to onStartPlayback.
  list: string;

  // A list of tracks to enqueue when play is pressed.
  tracks: QueueItemSource[];

  // See components/PlaybackArtwork.js.
  backgroundInteraction?: boolean;

  children: ReactNode;
}

// A connected playback artwork. It updates its state based on the current
// playing item and calls a prop when time to play more items.
const EnhancedComponent = reduxEnhancer(PlaybackArtwork);

export default EnhancedComponent;
