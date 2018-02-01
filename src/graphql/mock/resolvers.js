// @flow
import type {
  Album,
  Artist,
  Connection,
  Playlist,
  PlaylistItem,
  Song,
  SongUserStats,
  StatsCollection,
  UserStats,
} from '.';
import { albums, artists, playlists, songs } from '.';
import { mustGet } from './utils';
import { now } from '../time';

type ConnectionArgs = {
  after?: string,
  first?: number,
};

type PlaySongArgs = {
  songId: string,
  artistId?: string,
  albumId?: string,
  playlistId?: string,
};

const itemResolver = <T>(map: Map<string, T>) => (
  _: void,
  { id }: { id: string }
): T => mustGet(map, id);

const connectionResolver = <T>(map: Map<string, T>) => (
  _: void,
  args: ConnectionArgs
): Connection<T> =>
  handleConnection(
    Array.from(map.keys()).sort(),
    (key: string): T => mustGet(map, key),
    args
  );

const handleConnection = <InputType, NodeType>(
  keys: InputType[],
  getNode: (key: InputType) => NodeType,
  { first = 25, after }: ConnectionArgs
): Connection<NodeType> => {
  const lowerBound = after ? parseInt(after, 10) + 1 : 0;
  const upperBound = first === -1 ? keys.length : lowerBound + first;

  const acceptedKeys = keys.slice(lowerBound, upperBound);

  return {
    pageInfo: {
      count: keys.length,
      hasNextPage: upperBound <= keys.length,
    },
    edges: acceptedKeys.map((key, index) => ({
      cursor: (index + lowerBound).toString(),
      node: getNode(key),
    })),
  };
};

const withSong = <T>(inner: Song => T) => (
  _: void,
  { songId }: { songId: string }
): T => inner(mustGet(songs, songId));

const transformStats = (transform: (old: SongUserStats) => SongUserStats) =>
  withSong((song: Song): SongUserStats => {
    const { stats } = song;
    const newStats = transform(stats);
    song.stats = newStats;
    return newStats;
  });

const updateStats = (old: UserStats): UserStats => ({
  ...old,
  playCount: old.playCount + 1,
  lastPlayed: now(),
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

    playSong: (
      _: void,
      { songId, artistId, albumId, playlistId }: PlaySongArgs
    ): StatsCollection => {
      const validDescriptors = [artistId, albumId, playlistId].filter(
        descriptor => !!descriptor
      );

      if (validDescriptors.length > 1) {
        throw new TypeError(
          'Multiple valid descriptors were passed: ' +
            validDescriptors.join() +
            '. Only one should be passed.'
        );
      }

      const song: Song = mustGet(songs, songId);
      song.stats.stats = updateStats(song.stats.stats);

      const album: Album | void = albumId
        ? mustGet(albums, albumId)
        : undefined;
      const artist: Artist | void = artistId
        ? mustGet(artists, artistId)
        : undefined;
      const playlist: Playlist | void = playlistId
        ? mustGet(playlists, playlistId)
        : undefined;

      if (album) {
        album.stats = updateStats(album.stats);
      }

      if (artist) {
        artist.stats = updateStats(artist.stats);
      }

      if (playlist) {
        playlist.stats = updateStats(playlist.stats);
      }

      return {
        songStats: song.stats,
        albumStats: album && album.stats,
        artistStats: artist && artist.stats,
        playlistStats: playlist && playlist.stats,
      };
    },
  },

  Playlist: {
    items: (
      { items }: Playlist,
      args: ConnectionArgs
    ): Connection<PlaylistItem> => handleConnection(items, item => item, args),
  },
};

export default resolvers;
