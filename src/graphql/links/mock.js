// @flow
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from '../resolvers';
import typeDefs from 'schema/schema.graphql';

const schema = makeExecutableSchema({ typeDefs, resolvers });
const link = new SchemaLink({ schema });

export default link;
