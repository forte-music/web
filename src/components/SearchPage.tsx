import React from 'react';
import styled from '../styled-components';

import { HeaderContainer } from './styled/HeaderContainer';
import { Container } from './Container';
import { SearchQuery } from './SearchContainer/enhancers/__generated__/SearchQuery';

interface Props {
  // The query currently displayed in the search field.
  query: string;

  // Called when typing happens in the search field.
  setQuery: (newQuery: string) => void;

  // Called to start loading results for the current query immediately. By
  // default results are loaded after the debounce timeout of setQuery.
  updateResultsNow: () => void;

  // Search results. Displays a prompt when undefined.
  results?: SearchQuery;

  // True whenever a request for data is in-flight.
  isLoading: boolean;
}

export const SearchPage = (props: Props) => (
  <div>
    <HeaderContainer>
      <SearchHeaderContainer>
        <SearchInput
          onKeyPress={event =>
            event.key === 'Enter' && props.updateResultsNow()
          }
          onChange={event => props.setQuery(event.target.value)}
          value={props.query}
          type="text"
          placeholder="Search..."
        />
      </SearchHeaderContainer>
    </HeaderContainer>

    <Container>
      <SearchResultTypeContainer>
        <SearchResultTypeHeader>Albums</SearchResultTypeHeader>
      </SearchResultTypeContainer>
    </Container>
  </div>
);

const placeholderColor = '#757575';
const focusedTextColor = '#ffffff';

const SearchHeaderContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;

  color: ${focusedTextColor};

  border-bottom: 1px solid ${placeholderColor};
  padding: ${props => props.theme.sizeTiny};
  font-size: ${props => props.theme.fontSizeMedium};

  margin-top: 68px;
  margin-bottom: ${props => props.theme.sizeLarge};
  margin-left: ${props => props.theme.sizeSmall};
  margin-right: ${props => props.theme.sizeSmall};

  &:focus {
    border-bottom-color: ${focusedTextColor};
  }
`;

const SearchResultTypeContainer = styled.div`
  padding: ${props => props.theme.sizeSmall};
`;

const SearchResultTypeHeader = styled.div`
  color: #ffffff;
  font-size: ${props => props.theme.fontSizeMedium};
`;

// TODO: Display Prompt
// TODO: Load More Results
// TODO: Albums
// TODO: Artists
// TODO: Songs
// TODO: Confirm Dimensions and Colors
