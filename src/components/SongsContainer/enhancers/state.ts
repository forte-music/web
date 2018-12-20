import React from 'react';
import { SortBy } from '../../../__generated__/globalTypes';

interface State {
  isReverse: boolean;
  sortBy: SortBy;
}

interface Props extends State {
  children: (state: ChildrenProps) => React.ReactNode;
}

interface ChildrenProps extends State {
  setReverse: (isReversed: boolean) => void;
  setSortBy: (newSort: SortBy) => void;
}

export class SongsContainerState extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { children: _, ...otherProps } = props;
    this.state = { ...otherProps };
  }

  public render() {
    return this.props.children({
      isReverse: this.state.isReverse,
      setReverse: isReverse => this.setState({ isReverse }),
      sortBy: this.state.sortBy,
      setSortBy: sortBy => this.setState({ sortBy }),
    });
  }
}
