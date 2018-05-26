// @flow
import { HttpLink } from 'apollo-link-http';

// In the browser, by default, this client will send queries to the `/graphql`
// endpoint on the same host.
const link = new HttpLink({ uri: '/graphql' });

export default link;
