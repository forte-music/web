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

  const changes = findBreakingChanges(actualSchema, expectedSchema);

  expect(changes).toEqual([]);
});

it('should resolve a query for data stemming from a playlist', async () => {
  const resp = await client.query({ query });
  expect(resp).toMatchSnapshot();
});

it('should toggle the liked status of a song', async () => {
  const variables = { songId: '69120ac9-1e48-494f-a1f4-4a34735fe408' };
  const {
    data: { song: { stats: { id: queryId, liked } } },
  } = await client.query({
    query: gql`
      query($songId: ID!) {
        song(id: $songId) {
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
      mutation($songId: ID!) {
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
  const variables = { songId: '69120ac9-1e48-494f-a1f4-4a34735fe408' };
  const { data: { song: { stats: queryStats } } } = await client.query({
    query: gql`
      query($songId: ID!) {
        song(id: $songId) {
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
      mutation($songId: ID!) {
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
