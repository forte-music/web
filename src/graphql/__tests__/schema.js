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
