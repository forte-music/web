# web

[![Build Status][build-status-image]][build-status]

[Check out the demo site!][demo-site]

Forte Music's web client. It's built using React and TypeScript.

# Development

    git clone git@github.com:forte-music/web.git
    yarn
    yarn start-mock

This will run the web interface against an embedded mock graphql source.

## External Server

To use an external graphql resolver, run `yarn start` instead of `yarn start-mock` and configure the [Create React App Proxy][proxy-guide] to proxy
requests to your server.

[demo-site]: https://forte.surge.sh/
[proxy-guide]: https://github.com/facebook/create-react-app/blob/cb1608b3e02e0eef5fd350f6e4cf5ce32bdfc215/packages/react-scripts/template/README.md#proxying-api-requests-in-development
[build-status-image]: https://img.shields.io/circleci/project/github/forte-music/web/master.svg
[build-status]: https://circleci.com/gh/forte-music/web
