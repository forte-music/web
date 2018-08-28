import React from 'react';

interface Props {
  children: (params: ChildParams) => React.ReactNode;
}

interface ChildParams {
  isLoading: boolean;
  setLoading: (newLoading: boolean) => void;
}

interface State {
  isLoading: boolean;
}

export class PlaybackArtworkState extends React.Component<Props, State> {
  public state = {
    isLoading: false,
  };

  public render() {
    return this.props.children({
      isLoading: this.state.isLoading,
      setLoading: newLoading => this.setState({ isLoading: newLoading }),
    });
  }
}
