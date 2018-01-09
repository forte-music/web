// @flow
import { albums, artists, songs, playlists } from './data';
import type { Playlist, PlaylistItem, Connection } from './data';

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

  Playlist: {
    items: (
      { items }: Playlist,
      args: ConnectionQuery
    ): Connection<PlaylistItem> => handleConnection(items, item => item, args),
  },
};

export default resolvers;
