// @flow
export { default as albums } from './albums';
export { default as artists } from './artists';
export { default as songs } from './songs';
export { default as playlists } from './playlists';

export type { Album } from './albums';
export type { Artist } from './artists';
export type { Song } from './songs';
export type { SongUserStats, UserStats, StatsCollection } from './stats';
export type { Playlist, PlaylistItem } from './playlists';

export type Edge<T> = {
  cursor: string,
  node: T,
};

// TODO: Figure Out How To Move This Type
export type Connection<T> = {
  edges: Edge<T>[],
  pageInfo: PageInfo,
};

type PageInfo = {
  count: number,
  hasNextPage: boolean,
};
