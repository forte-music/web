// @flow
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { buildClientSchema, printSchema } from 'graphql';

import { data as rawSchema } from '@forte-music/schema';
import resolvers from './resolvers';

const typeDefs = printSchema(buildClientSchema(rawSchema));

const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

console.log('listening on port 4000');
app.listen(4000);
