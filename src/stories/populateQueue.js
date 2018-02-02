// @flow

import { songs } from '@forte-music/mock/models';
import { replaceQueue } from '../actions';

const ids = Array.from(songs.keys());
ids.sort();

const itemSources = new Array(1000).fill(undefined).map((_, idx) => ({
  songId: ids[idx % ids.length],
}));

// An action creator to populate the queue with many items.
export const populateQueue = () => replaceQueue(itemSources);
