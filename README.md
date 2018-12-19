# web

[![Build Status][build-status-image]][build-status]

[Check out the demo site!][demo-site]

## Quickstart

    yarn query-codegen && yarn start-mock

## Build Configuration

This project was bootstrapped with [create-react-app]. We've since ejected, but still use many of its features.

## Generated Files

[GraphQL] is used to talk to the backend. Given a schema and a graphql request string, we can compute the response type and provide it to typescript so typechecking code around API calls works.

To generate typing information for responses which typescript understands, use `yarn query-codegen`. Re-run this command every time a query or the schema changes and after pulling new versions from the remote. These files are stored in a sibling folder named `__generated__` to the file the query is defined in. The files in `__generated__` are ignored by git.

The `query-codegen` script is run before the `build` and `check-all` scripts.

## Mock Backend

A few things change when the application is run in an environment with the `REACT_APP_MOCK_RESOLVER` variable set to a truthy value.

First, a mock [GraphQL] resolver is used instead of a resolver which queries a remote endpoint. The graphql resolver is provided by the [`@forte-music/mock`][forte-music/mock] npm package with data from the [`@forte-music/schema`][forte-music/schema] npm package. [The mock data can be found in the toml files here.][mock]

Second, instead of fetching audio files from the remote server, a fixed set of audio files is used instead. Each song in the mock data maps to an audio file based on the identifier of the mock song's identifier. Multiple songs may share the same underlying audio file.

These features allow developing the frontend independently of the backend.

The `start-mock` and `storybook` scripts enable mock behavior for their corresponding actions.

## External Server

To use an external graphql resolver, run `yarn start` instead of `yarn start-mock` and configure the [Create React App Proxy][proxy-guide] to proxy requests to your server.

[graphql]: https://graphql.org/
[demo-site]: https://forte.surge.sh/
[proxy-guide]: https://github.com/facebook/create-react-app/blob/cb1608b3e02e0eef5fd350f6e4cf5ce32bdfc215/packages/react-scripts/template/README.md#proxying-api-requests-in-development
[build-status-image]: https://img.shields.io/circleci/project/github/forte-music/web/master.svg
[build-status]: https://circleci.com/gh/forte-music/web
[forte-music/mock]: https://github.com/forte-music/schema/tree/master/packages/mock
[forte-music/schema]: https://github.com/forte-music/schema/tree/master/packages/schema
[mock]: https://github.com/forte-music/schema/tree/master/packages/schema/fixtures
[create-react-app]: https://github.com/facebook/create-react-app
