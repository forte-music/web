import { Component, ReactNode } from 'react';

interface Props<State> {
  state: State;

  children: <K extends keyof State>(
    prevState: Readonly<State>,
    setState: (state: Pick<State, K> | State) => void
  ) => ReactNode;
}

// A functional wrapper around stateful components used for testing.
class StatefulComponent<T> extends Component<Props<T>, T> {
  constructor(props: Props<T>) {
    super(props);

    this.state = props.state;
  }

  public render() {
    return this.props.children(this.state, this.setState.bind(this));
  }
}

export default StatefulComponent;
