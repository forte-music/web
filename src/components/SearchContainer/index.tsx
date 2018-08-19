import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { SearchPageHeader } from '../SearchPageHeader';
import { Container } from '../Container';

import { SearchContainerState } from './enhancers/state';
import { SongSearchResultsContainer } from '../SongSearchResultsContainer';
import { AlbumSearchResultsContainer } from '../AlbumSearchResultsContainer';
import { AllSearchResults } from '../AllSearchResults';

interface Props {
  // Query based on the url. If undefined, no query was passed.
  query?: string;

  // Called after a debounced update to the query by the user.
  setQuery: (newQuery: string) => void;
}

// Top level search page. Handles getting the query from the url and text input
// and fetching then rendering the appropriate search results.
export const Search = (props: Props) => (
  <SearchContainerState
    query={props.query}
    debounceMs={300}
    setDebouncedQuery={props.setQuery}
  >
    {({ query, debouncedQuery, setQuery, updateDebouncedQueryNow }) => (
      <div>
        <SearchPageHeader
          query={query}
          setQuery={setQuery}
          updateResultsNow={updateDebouncedQueryNow}
        />

        <Container>
          <Switch>
            <Route
              exact
              path={'/search/:query'}
              render={() => <AllSearchResults query={debouncedQuery} />}
            />

            <Route
              exact
              path={'/search/:query/songs'}
              render={() => (
                <SongSearchResultsContainer loadMore query={debouncedQuery} />
              )}
            />

            <Route
              exact
              path={'/search/:query/albums'}
              render={() => (
                <AlbumSearchResultsContainer loadMore query={debouncedQuery} />
              )}
            />

            <Redirect
              strict
              from="/search/:query/"
              to={`/search/${debouncedQuery}`}
            />
          </Switch>
        </Container>
      </div>
    )}
  </SearchContainerState>
);
