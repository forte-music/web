import React from 'react';

import { HeaderContainer } from './styled/HeaderContainer';
import { SearchHeaderContainer, SearchInput } from './styled/search';

interface Props {
  // The query currently displayed in the search field.
  query: string;

  // Called when typing happens in the search field.
  setQuery: (newQuery: string) => void;

  // Called to start loading results for the current query immediately. By
  // default results are loaded after the debounce timeout of setQuery.
  updateResultsNow: () => void;
}

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
