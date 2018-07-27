// State to represent a queue of songs.
export interface QueueState {
  // A list of songs.
  items: QueueItem[];

  // The position of the player in the queue (playing items[position]). If
  // (items[position]) is undefined, the queue had played to completion.
  position: number;

  // The state playback should be in. This is passed to the audio element
  // responsible for downloading and playing songs.
  isPlaying: boolean;
}

export interface QueueItem extends QueueItemSource {
  // A cursor used to identify a specific item in a queue.
  id: ID;
}

// Input type to many action creators. An identifier is created and assigned
// by reducers.
export interface QueueItemSource {
  // The id of the song to play.
  songId: string;

  playingFrom: PlayingFrom;
}

// Information about where a queue item is playing from.
export type PlayingFrom =
  | PlayingFromAlbum
  | PlayingFromArtist
  | PlayingFromSongs;

// Information about which a queue item from an album is playing from.
export interface PlayingFromAlbum {
  type: 'ALBUM';
  albumId: string;
  trackIndex: number;
}

// Information about where a queue item from an artist is playing from.
export interface PlayingFromArtist {
  type: 'ARTIST';
  artistId: string;
}

export interface PlayingFromSongs {
  type: 'SONGS';
}

export const initialState: QueueState = {
  items: [],
  position: 0,
  isPlaying: false,
};

export type ID = string;
let lastId = 0;
export const getId = (): ID => String(lastId++);
