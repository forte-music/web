// @flow
import { albums, artists, songs, stats, playlists } from './data';
import type { Album, Artist, Playlist, PlaylistItem, Song } from './data';
import type { Connection } from '../model';

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
): T => handleItem(map, id);

const handleItem = <T>(map: Map<string, T>, id: string): T =>
  ((map.get(id): any): T);

const connectionResolver = <T>(map: Map<string, T>) => (
  _: any,
  { input }: ConnectionArgs
): Connection<T> =>
  handleConnection(
    Array.from(map.keys()).sort(),
    (key: string): T => ((map.get(key): any): T),
    input
  );

const handleConnection = <InputType, NodeType>(
  keys: InputType[],
  getNode: (key: InputType) => NodeType,
  { limit = 25, cursor }: ConnectionQuery
): Connection<NodeType> => {
  const offset = cursor ? parseInt(cursor, 10) + 1: 0;
  const acceptedKeys = keys.slice(offset, offset + limit);

  return {
    count: keys.length,
    edges: acceptedKeys.map((key, index) => ({
      cursor: (index + offset).toString(),
      node: getNode(key),
    })),
  };
};

const handleArray = <T>(map: Map<string, T>, entryKeys: string[]) =>
  entryKeys.map(entryKey => map.get(entryKey));

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

  Album: {
    songs: ({ songs: songKeys }: Album) => handleArray(songs, songKeys),
  },

  Artist: {
    albums: ({ albums: albumKeys }: Artist) => handleArray(albums, albumKeys),
  },

  Song: {
    album: ({ album: albumKey }: Song) => handleItem(albums, albumKey),

    artists: ({ artists: artistKeys }: Song) =>
      handleArray(artists, artistKeys),

    stats: ({ stats: statsKey }: Song) => handleItem(stats, statsKey),
  },

  PlaylistItem: {
    song: ({ song: songKey }: PlaylistItem) => handleItem(songs, songKey),
  },

  Playlist: {
    items: (
      { items }: Playlist,
      args: ConnectionQuery
    ): Connection<PlaylistItem> => handleConnection(items, item => item, args),
  },
};

export default resolvers;
