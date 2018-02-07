// @flow

import React, { Component } from 'react';

import type { Node as ReactNode } from 'react';

type Props = {
  // Whether or not the popper is open.
  isOpen: boolean,

  // Children to render inside the popper.
  children: ReactNode,

  // Function called to change the state of the popper.
  onOpenChanged: boolean => void,
};

// A component which hides itself when clicked away from.
class Popper extends Component<Props> {
  element: ?HTMLElement;

  componentDidMount() {
    this.handleProps();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.handleProps();
    }
  }

  componentWillUnmount() {
    this.removeEvents();
  }

  onRef = (element: ?HTMLElement) => (this.element = element);

  handleProps = () => {
    if (this.props.isOpen) {
      this.addEvents();
    } else {
      this.removeEvents();
    }
  };

  addEvents = () => {
    ['click', 'touchstart'].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };

  removeEvents = () => {
    ['click', 'touchstart'].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  handleDocumentClick = (event: MouseEvent | TouchEvent) => {
    const { element } = this;

    if (!element) {
      return;
    }

    if (!element.contains(((event.target: any): Node))) {
      // clicked out of container
      this.props.onOpenChanged(!this.props.isOpen);
    }
  };

  render() {
    if (this.props.isOpen) {
      return <div ref={this.onRef}>{this.props.children}</div>;
    }

    return null;
  }
}

export default Popper;
