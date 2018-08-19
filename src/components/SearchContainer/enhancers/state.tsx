import React from 'react';
import { debounce } from 'lodash';

interface Props {
  // Value of ChildParam.query. By default is an empty string. Changes to
  // this property cause the children to re-render with the new query param.
  query?: string;

  // The amount of time in milliseconds to debounce calls to set
  // ChildParam.debouncedQuery.
  debounceMs: number;

  // Called when debounced query update has happened.
  setDebouncedQuery: (newDebouncedQuery: string) => void;

  children: (param: ChildParam) => React.ReactNode;
}

interface ChildParam {
  // Set by calls to setQuery.
  query: string;

  // Call to update the value of query.
  setQuery: (newQuery: string) => void;

  // Query updated after a debounce period.
  debouncedQuery: string;

  // Called to immediately update debounce query to the last value setQuery
  // was called with.
  updateDebouncedQueryNow: () => void;
}

interface State {
  query: string;
  debouncedQuery: string;
}

// Keeps track of the query string. The query passed to children is updated
// when the input props change or setQuery is called. `debouncedQuery` is
// updated when any of the following happen:
// * `debounceMs` milliseconds after the last call to `setQuery` pass
// * `updateDebouncedQueryNow` is called
// * the input query prop changes
// `setDebouncedQuery` is called in the first two of these cases.
export class SearchContainerState extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = SearchContainerState.getStateForProps(props);
  }

  private static getStateForProps(props: Props): State {
    const query = props.query || '';

    return {
      query,
      debouncedQuery: query,
    };
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.query !== this.props.query) {
      this.setState(SearchContainerState.getStateForProps(this.props));
    }
  }

  private setDebouncedQuery = (newDebouncedQuery: string) => {
    this.setState({ debouncedQuery: newDebouncedQuery });
    this.props.setDebouncedQuery(newDebouncedQuery);
  };

  private setDebouncedQueryDebounced = debounce(
    this.setDebouncedQuery,
    this.props.debounceMs,
    { trailing: true }
  );

  private setQuery = (newQuery: string) => {
    this.setState({ query: newQuery });
    this.setDebouncedQueryDebounced(newQuery);
  };

  public render() {
    return this.props.children({
      query: this.state.query,
      setQuery: this.setQuery,
      debouncedQuery: this.state.debouncedQuery,
      updateDebouncedQueryNow: this.setDebouncedQueryDebounced.flush,
    });
  }
}
