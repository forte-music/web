import React from 'react';
import { SortBy } from './__generated__/SongsQuery';

interface State {
  isReversed: boolean;
  sortedBy: SortBy;
}

interface Props extends State {
  children: (state: ChildrenProps) => React.ReactNode;
}

interface ChildrenProps extends State {
  setReversed: (isReversed: boolean) => void;
  setSortedBy: (newSort: SortBy) => void;
}

export class SongsContainerState extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { children: _, ...otherProps } = props;
    this.state = { ...otherProps };
  }

  public render() {
    return this.props.children({
      isReversed: this.state.isReversed,
      setReversed: isReversed => this.setState({ isReversed }),
      sortedBy: this.state.sortedBy,
      setSortedBy: sortedBy => this.setState({ sortedBy }),
    });
  }
}
