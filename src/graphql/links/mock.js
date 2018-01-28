// @flow
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from '../mock/resolvers';
import typeDefs from '@forte-music/schema/schema.graphql';

const schema = makeExecutableSchema({ typeDefs, resolvers });
const link = new SchemaLink({ schema });

export default link;
