import { songs } from '@forte-music/mock';
import { replaceQueue } from '../redux/actions';
import { PlayingFrom } from '../redux/state/queue';

export const emptyPlayingFrom: PlayingFrom = {} as PlayingFrom;

const ids = Array.from(songs.keys());
ids.sort();

const itemSources = new Array(1000).fill(undefined).map((_, idx) => ({
  songId: ids[idx % ids.length],
  playingFrom: emptyPlayingFrom,
}));

// An action creator to populate the queue with many items.
export const populateQueue = () => replaceQueue(itemSources);
