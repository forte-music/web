import { Component } from 'react';

// A functional wrapper around stateful components used for testing.
class StatefulComponent extends Component {
  constructor(props) {
    super(props);

    this.state = props.state;
  }

  render() {
    return this.props.children(this.state, this.setState.bind(this));
  }
}

export default StatefulComponent;
