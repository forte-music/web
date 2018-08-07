import React from 'react';
import { SearchContainerState } from './enhancers/state';
import { SearchPage } from '../SearchPage';
import { SearchQuery } from './enhancers/query';
import { ReduxContainer } from './enhancers/redux';
import { Redirect } from 'react-router';
import { searchPath } from '../../utils/paths';

interface Props {
  query?: string;
}

export const Search = (props: Props) => (
  <SearchContainerState initialQuery={props.query} debounceMs={300}>
    {({ query, debouncedQuery, setQuery, updateDebouncedQueryNow }) => (
      <React.Fragment>
        <Redirect to={searchPath(debouncedQuery)} />

        <SearchQuery
          skip={!debouncedQuery}
          variables={{ query: debouncedQuery }}
        >
          {result => {
            // For some reason, apollo sets result.data to an empty object
            // when skip is true, violating the TypeScript contract.
            const data =
              debouncedQuery && !result.loading ? result.data : undefined;

            return (
              <ReduxContainer currentQuery={debouncedQuery} result={data}>
                {({ activeSongId, startPlayingFromSong }) => (
                  <SearchPage
                    query={query}
                    setQuery={setQuery}
                    updateResultsNow={updateDebouncedQueryNow}
                    // Needs to be done for same reason as above.
                    isLoading={!!debouncedQuery && result.loading}
                    results={data}
                    activeSongId={activeSongId}
                    startPlayingFromSong={startPlayingFromSong}
                  />
                )}
              </ReduxContainer>
            );
          }}
        </SearchQuery>
      </React.Fragment>
    )}
  </SearchContainerState>
);
