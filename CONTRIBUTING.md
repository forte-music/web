# Contributing to forte-music/web

Thanks for taking the time to contribute to forte. Here are some guidelines to follow when contributing.

Some of the code in this project hasn't been refactored to follow these guidelines yet.

## CSS

For the most part, CSS is written using [styled-components]. Currently, they are scattered near the presentational components they are used in, in `src/components/styled` and in `src/components`. Going forward, mixins should be placed in `src/styled-mixins`, shared styled components in `src/components/styled` and unshared styled components, near where they are used.

Avoid using theming unless needed. They add un-needed complexity for most use cases. If you are using the same component with slightly different styles in two different places, then use themeing.

## Redux
The [render-props] pattern is used to decouple data providing components with components consuming data. We use a wrapper around `connect` (a Higher Order Component from `react-redux`) to use the render props pattern with redux. This wrapper is called `createReduxComponent` and can be found in `src/redux/render.tsx`.

## Component Folder Structure
There are a few different types of components.

* Presentational Components
  Stateless components which are primarily concerned with how things look. State and actions are passed as props and prop callbacks respectively. These are usually functional components. Usually placed in `src/components/`.

* Enhancer Components
  Often handle data fetching and state storage concerns. Usually stored next to the container component they are used in (for example `src/components/AlbumsContainer/enhancers/redux.ts`).

* Container Components
  Made up by composing many enhancers and on or more presentational components. Found in folders ending with `Container` (for example `src/components/AlbumsContainer/index.tsx`).

[Here is some more information about the presentational and container component pattern.][container-component]

## Code Style

[Prettier] is used to keep our code formatted consistently. Run `yarn fix-style` to reformat code to follow adhere to Prettier's style. Run `yarn check-style` to see which files don't adhere to Prettier's style.

## Storybook

[Storybook] is used for testing react components outside of the complete application. Run `yarn storybook` to start it with mock data. Files ending with `.stories.tsx` are picked up storybook. A test ensures that all stories render without crashing.

## Tests

Tests are run using [Jest]. Run `yarn test` to start jest. Tests should placed in files ending with `.test.ts` or `.test.tsx`.

## Linting

[TSLint] is used for linting code. Run `yarn tslint` to run tslint on this project.

## CircleCI Build

CircleCI does a number of [tasks] after your code is pushed. Make sure your code passes before submitting a PR. Many of the same tests run in CircleCI can be run with `yarn check-all`.

## Contributor Agreement

By contributing code to our project in any form, including sending a pull request via Github, a code fragment or patch via private email or public discussion groups, you agree to release your code under the terms of the license that you can find in the LICENSE.md file included in the forte-music/web source distribution.

[jest]: https://jestjs.io/
[prettier]: https://prettier.io/
[storybook]: https://storybook.js.org/
[tslint]: https://palantir.github.io/tslint/
[tasks]: ./.circleci/config.yml
[styled-components]: https://www.styled-components.com/
[render-props]: https://reactjs.org/docs/render-props.html
[container-component]: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
