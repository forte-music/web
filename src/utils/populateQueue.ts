import { songs } from '@forte-music/mock/models';
import { replaceQueue } from '../redux/actions';
import { PlayingFrom, QueueItemSource } from '../redux/state/queue';

export const emptyPlayingFrom: PlayingFrom = {} as PlayingFrom;

const ids = Array.from(songs.keys());
ids.sort();

const getItems = (length: number): QueueItemSource[] =>
  new Array(length).fill(undefined).map((_, idx) => ({
    songId: ids[idx % ids.length],
    playingFrom: emptyPlayingFrom,
  }));

// An action creator to populate the queue with many items.
export const populateQueue = (length: number) => replaceQueue(getItems(length));
