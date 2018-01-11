// @flow
import 'isomorphic-fetch';
import gql from 'graphql-tag';
import { buildASTSchema } from 'graphql';
import {
  findBreakingChanges,
  introspectionQuery as rawIntrospectionQuery,
  buildClientSchema,
} from 'graphql/utilities';

import query from './query.graphql';
import client from '../client';
import { now } from '../time';
import schema from 'schema/schema.graphql';

const introspectionQuery = gql(rawIntrospectionQuery);

const getSchema = async client => {
  const { data } = await client.query({ query: introspectionQuery });
  const schema = buildClientSchema(data);

  return schema;
};

it("shouldn't have any breaking changes against the schema", async () => {
  const expectedSchema = buildASTSchema(schema);
  const actualSchema = await getSchema(client);

  const changes = findBreakingChanges(actualSchema, expectedSchema).filter(
    change => change.type !== 'DIRECTIVE_LOCATION_REMOVED'
  );

  expect(changes).toEqual([]);
});

it('should resolve a query for data stemming from a playlist', async () => {
  const resp = await client.query({ query });
  expect(resp).toMatchSnapshot();
});

it('should toggle the liked status of a song', async () => {
  const variables = { songId: 'song:1:1' };
  const {
    data: { song: { stats: { id: queryId, liked } } },
  } = await client.query({
    query: gql`
      query LikeTest($songId: ID!) {
        song(id: $songId) {
          id

          stats {
            id
            liked
          }
        }
      }
    `,
    variables,
  });

  const expected = !liked;

  const {
    data: { toggleLike: { id: mutationId, liked: actual } },
  } = await client.mutate({
    mutation: gql`
      mutation LikeMutationTest($songId: ID!) {
        toggleLike(songId: $songId) {
          id
          liked
        }
      }
    `,
    variables,
  });

  expect(actual).toBe(expected);
  expect(queryId).toBe(mutationId);
});

it('should update the time a song was last played at', async () => {
  const variables = { songId: 'song:1:1' };
  const { data: { song: { stats: queryStats } } } = await client.query({
    query: gql`
      query StatsTest($songId: ID!) {
        song(id: $songId) {
          id

          stats {
            id
            playCount
            lastPlayed
          }
        }
      }
    `,
    variables,
  });

  const expected = {
    ...queryStats,
    playCount: queryStats.playCount + 1,
    lastPlayed: now(),
  };

  const { data: { playSong: mutationStats } } = await client.mutate({
    mutation: gql`
      mutation StatsTestMutation($songId: ID!) {
        playSong(songId: $songId) {
          id
          playCount
          lastPlayed
        }
      }
    `,
    variables,
  });

  expect(mutationStats).toEqual(expected);
});

it('should calculate the duration for an album', async () => {
  const variables = { albumId: 'album:4' };
  const { data: { album } } = await client.query({
    query: gql`
      query AlbumDurationTest($albumId: ID!) {
        album(id: $albumId) {
          id
          duration
        }
      }
    `,
    variables,
  });

  expect(album.id).toEqual(variables.albumId);
  expect(album.duration).toEqual(74 * 60 + 22);
});

it('should get the artists of a song', async () => {
  const variables = { songId: 'song:2:1' };
  const { data: { song } } = await client.query({
    query: gql`
      query SongArtistsTest($songId: ID!) {
        song(id: $songId) {
          id
          name

          artists {
            id
            name
          }
        }
      }
    `,
    variables,
  });

  expect(song.artists).not.toEqual([]);
});
