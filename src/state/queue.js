// @flow
export type ID = string;

export type QueueItem = {
  // TODO: rename to cursor
  // A cursor used to identify a specific item in a queue. The index wasn't used
  // used because it varies based on position. The song id wasn't used because
  // it could appear multiple times in a queue.
  id: ID,

  // The id of the song to play. Full information about this song can be
  // resolved by querying the graphql API.
  songId: string,
};

// State to represent a queue of songs.
export type QueueState = {
  // A list of songs.
  items: QueueItem[],

  // The position of the player in the queue (playing items[position]). If
  // (items[position]) is undefined, the queue had played to completion.
  position: number,

  // The state playback should be in. This is passed to the audio element
  // responsible for downloading and playing songs.
  shouldBePlaying: boolean,
};

export const initialState: QueueState = {
  items: [],
  position: 0,
  shouldBePlaying: false,
};

let lastId = 0;
export const getId = (): ID => String(lastId++);
