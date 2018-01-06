// @flow
import { Component } from 'react';
import type { Node } from 'react';

type Props<State> = {
  state: State,
  children: (State, Function) => Node,
};

// A functional wrapper around stateful components used for testing.
class StatefulComponent extends Component<Props<Object>, Object> {
  constructor(props: Props<Object>) {
    super(props);

    this.state = props.state;
  }

  render() {
    return this.props.children(this.state, this.setState.bind(this));
  }
}

export default StatefulComponent;
