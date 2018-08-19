import React from 'react';

import { HeaderContainer } from './styled/HeaderContainer';
import { SearchHeaderContainer, SearchInput } from './styled/search';

interface Props {
  // Query currently displayed in the search field.
  query: string;

  // Called when typing happens in the search field.
  setQuery: (newQuery: string) => void;

  // Called to start loading results for the current query immediately. By
  // default results are loaded after the debounce timeout of setQuery.
  updateResultsNow: () => void;
}

// Presentational component handling the shared header of search pages.
// Contains the text field where a query is entered.
export const SearchPageHeader = (props: Props) => (
  <HeaderContainer>
    <SearchHeaderContainer>
      <SearchInput
        onKeyPress={event => event.key === 'Enter' && props.updateResultsNow()}
        onChange={event => props.setQuery(event.target.value)}
        value={props.query}
        placeholder="Search..."
      />
    </SearchHeaderContainer>
  </HeaderContainer>
);
