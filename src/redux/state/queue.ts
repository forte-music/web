export type ID = string;

export type Kind = 'PLAYLIST' | 'ALBUM' | 'ARTIST' | 'SONGS';

// A collection of information about where a song was queued from.
export interface Source {
  // An opaque string identifying the source list (playlist, album's tracks,
  // artist's songs) from which a song is being played.
  list?: string;

  // The kind of list the song was created from.
  kind?: Kind;

  // An opaque string identifying an item in the source list. If a
  // listSource is specified, a songSource may be specified. For
  // example, for playlists, this could be PlaylistItem.id, for albums this
  // might not be specified because a song id can only occur once in an album.
  song?: string;
}

export interface QueueItemSource {
  // The id of the song to play. Full information about this song can be
  // resolved by querying the graphql API.
  songId: string;

  source?: Source;
}

export type QueueItem = {
  // A cursor used to identify a specific item in a queue. The index wasn't used
  // used because it varies based on position. The song id wasn't used because
  // it could appear multiple times in a queue.
  id: ID;
} & QueueItemSource;

// State to represent a queue of songs.
export interface QueueState {
  // A list of songs.
  items: QueueItem[];

  // The position of the player in the queue (playing items[position]). If
  // (items[position]) is undefined, the queue had played to completion.
  position: number;

  // The state playback should be in. This is passed to the audio element
  // responsible for downloading and playing songs.
  shouldBePlaying: boolean;
}

export const initialState: QueueState = {
  items: [],
  position: 0,
  shouldBePlaying: false,
};

let lastId = 0;
export const getId = (): ID => String(lastId++);
