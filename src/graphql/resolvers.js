// @flow
import { albums, artists, songs, playlists } from './data';
import type {
  Playlist,
  PlaylistItem,
  Connection,
  SongUserStats,
  Song,
} from './data';
import { mustGet } from './data/utils';
import { now } from './time';

type ConnectionQuery = {
  limit?: number,
  cursor?: string,
};

type ConnectionArgs = {
  input: ConnectionQuery,
};

const itemResolver = <T>(map: Map<string, T>) => (
  _: any,
  { id }: { id: string }
): T => mustGet(map, id);

const connectionResolver = <T>(map: Map<string, T>) => (
  _: any,
  { input }: ConnectionArgs
): Connection<T> =>
  handleConnection(
    Array.from(map.keys()).sort(),
    (key: string): T => mustGet(map, key),
    input
  );

const handleConnection = <InputType, NodeType>(
  keys: InputType[],
  getNode: (key: InputType) => NodeType,
  { limit = 25, cursor }: ConnectionQuery
): Connection<NodeType> => {
  const offset = cursor ? parseInt(cursor, 10) + 1 : 0;
  const acceptedKeys = keys.slice(offset, offset + limit);

  return {
    count: keys.length,
    edges: acceptedKeys.map((key, index) => ({
      cursor: (index + offset).toString(),
      node: getNode(key),
    })),
  };
};

const withSong = <T>(inner: Song => T) => (
  _: any,
  { songId }: { songId: string }
) => inner(mustGet(songs, songId));

const transformStats = (transform: (old: SongUserStats) => SongUserStats) =>
  withSong(song => {
    const { stats } = song;
    const newStats = transform(stats);
    song.stats = newStats;
    return newStats;
  });

// Resolvers for mock backend.
const resolvers = {
  Query: {
    album: itemResolver(albums),
    albums: connectionResolver(albums),

    artist: itemResolver(artists),
    artists: connectionResolver(artists),

    song: itemResolver(songs),
    songs: connectionResolver(songs),

    playlist: itemResolver(playlists),
    playlists: connectionResolver(playlists),
  },

  Mutation: {
    toggleLike: transformStats(old => ({ ...old, liked: !old.liked })),
    playSong: transformStats(old => ({
      ...old,
      playCount: old.playCount + 1,
      lastPlayed: now(),
    })),
  },

  Playlist: {
    items: (
      { items }: Playlist,
      args: ConnectionQuery
    ): Connection<PlaylistItem> => handleConnection(items, item => item, args),
  },
};

export default resolvers;
