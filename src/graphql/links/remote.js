// @flow
import { HttpLink } from 'apollo-link-http';

// This is a global variable to specify the url of the remote graphql
// endpoint. It is the result of the REACT_APP_API_URL environment variable.
declare var REACT_APP_API_URL: ?string;

// In the browser, by default, this client will send queries to the `/graphql`
// endpoint on the same host.
const link = new HttpLink({ uri: REACT_APP_API_URL || '/graphql' });

export default link;
