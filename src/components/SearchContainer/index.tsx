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
            isLoading={result.loading}
            results={result.data}
          />
        )}
      </SearchQuery>
    )}
  </SearchContainerState>
);
