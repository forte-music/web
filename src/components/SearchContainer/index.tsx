import React from 'react';
import { SearchContainerState } from './enhancers/state';
import { SearchPage } from '../SearchPage';
import { SearchQuery } from './enhancers/query';
import { ReduxContainer } from './enhancers/redux';

interface Props {
  // Query based on the url. If undefined, no query was passed.
  query?: string;

  // Called after a debounced update to the query by the user.
  setQuery: (newQuery: string) => void;
}

export const Search = (props: Props) => (
  <SearchContainerState
    key={props.query}
    initialQuery={props.query}
    debounceMs={300}
    setDebouncedQuery={props.setQuery}
  >
    {({ query, debouncedQuery, setQuery, updateDebouncedQueryNow }) => (
      <SearchQuery skip={!debouncedQuery} variables={{ query: debouncedQuery }}>
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
    )}
  </SearchContainerState>
);
