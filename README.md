# web

[![Build Status][build-status-image]][build-status]

A web interface for streaming music from forte.

## Quickstart

    yarn query-codegen && yarn start-mock

## Generated Files

[GraphQL] is used to talk to the backend. Given a schema and a graphql
request string, we can compute the response type and provide it to typescript
so typechecking code around API calls works.

To generate typing information for responses which typescript understands,
use `yarn query-codegen`. Re-run this command every time a query or the
schema changes and after pulling new versions from the remote. Generated
files are stored in a sibling folder named `__generated__` to the file the
query is defined in. Files in `__generated__` are ignored by git.

## Backend

By default (`yarn start`) this application connects to a backend hosted at
`localhost:8080`. Configure this by changing the proxy key of `package.json`.
See the [create react app proxy guide][proxy-guide] for more.

There's a mock backend which can be enabled by using `yarn start-mock`. When
enabled, a mock graphql resolver will run inside the dev server. A playground
can be found at `localhost:3000/graphql`. The mock resolver is provided by
[`@forte-music/mock`][forte-music/mock]. The mock backend even configures the
app to use a set of royalty free tracks so features around playback can be
tested.

[graphql]: https://graphql.org/
[proxy-guide]: https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
[build-status-image]: https://img.shields.io/circleci/project/github/forte-music/web/master.svg
[build-status]: https://circleci.com/gh/forte-music/web
[forte-music/mock]: https://github.com/forte-music/schema/tree/master/packages/mock
