import React from 'react';
import { SearchContainerState } from './enhancers/state';
import { SearchPage } from '../SearchPage';
import { SearchQuery } from './enhancers/query';

export const Search = () => (
  <SearchContainerState debounceMs={300}>
    {({ query, debouncedQuery, setQuery, updateDebouncedQueryNow }) => (
      <SearchQuery skip={!debouncedQuery} variables={{ query: debouncedQuery }}>
        {result => (
          <SearchPage
            query={query}
            setQuery={setQuery}
            updateResultsNow={updateDebouncedQueryNow}
            // For some reason, apollo sets result.data to an empty object
            // when skip is true, violating the TypeScript contract.
            isLoading={!!debouncedQuery && result.loading}
            results={
              debouncedQuery && !result.loading ? result.data : undefined
            }
          />
        )}
      </SearchQuery>
    )}
  </SearchContainerState>
);
