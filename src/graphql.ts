import ApolloClient from 'apollo-boost';

// In the browser, by default, this client will send queries to the `/graphql`
// endpoint on the same host.
const client = new ApolloClient({ uri: '/graphql' });

export default client;
