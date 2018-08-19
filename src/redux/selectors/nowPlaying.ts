import { PlayingFrom, QueueItem, QueueState } from '../state/queue';

// Gets the QueueItem of the currently playing if there is an item currently
// playing and the currently playing queue item's playingFrom passes the
// checkPlayingFrom function.
export const getPlayingMatching = (
  queue: QueueState,
  checkPlayingFrom: CheckPlayingFromFn
): QueueItem | undefined => {
  const queueItem = nowPlaying(queue);
  if (!queueItem) {
    // Nothing is playing.
    return;
  }

  if (!checkPlayingFrom(queueItem.playingFrom)) {
    // Failed check.
    return;
  }

  return queueItem;
};

export type CheckPlayingFromFn = (playingFrom: PlayingFrom) => boolean;

export const isPlayingFromAlbum = (albumId: string): CheckPlayingFromFn => (
  playingFrom: PlayingFrom
) => playingFrom.type === 'ALBUM' && playingFrom.albumId === albumId;

export const isPlayingFromArtist = (artistId: string): CheckPlayingFromFn => (
  playingFrom: PlayingFrom
) => playingFrom.type === 'ARTIST' && playingFrom.artistId === artistId;

export const isPlayingFromSongs: CheckPlayingFromFn = (
  playingFrom: PlayingFrom
) => playingFrom.type === 'SONGS';

export const isPlayingFromSearch = (query: string): CheckPlayingFromFn => (
  playingFrom: PlayingFrom
) => playingFrom.type === 'SEARCH' && playingFrom.query === query;

export const nowPlaying = (queue: QueueState): QueueItem | undefined =>
  queue.items[queue.position];
