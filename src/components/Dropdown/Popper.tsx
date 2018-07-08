import React, { Component, ReactNode } from 'react';

interface Props {
  // Whether or not the popper is open.
  isOpen: boolean;

  // Children to render inside the popper.
  children: ReactNode;

  // Function called to change the state of the popper.
  onOpenChanged: (a: boolean) => void;
}

// A component which hides itself when clicked away from.
class Popper extends Component<Props> {
  private element: HTMLElement | null = null;

  public componentDidMount() {
    this.handleProps();
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.handleProps();
    }
  }

  public componentWillUnmount() {
    this.removeEvents();
  }

  private onRef = (element: HTMLElement | null) => (this.element = element);

  private handleProps = () => {
    if (this.props.isOpen) {
      this.addEvents();
    } else {
      this.removeEvents();
    }
  };

  private addEvents = () => {
    document.addEventListener('click', this.handleDocumentClick, true);
    document.addEventListener('touchstart', this.handleDocumentClick, true);
  };

  private removeEvents = () => {
    document.removeEventListener('click', this.handleDocumentClick, true);
    document.removeEventListener('touchstart', this.handleDocumentClick, true);
  };

  private handleDocumentClick = (event: MouseEvent | TouchEvent) => {
    const { element } = this;

    if (!element || !event.target) {
      return;
    }

    if (!element.contains(event.target as Node)) {
      // clicked out of container
      this.props.onOpenChanged(!this.props.isOpen);
    }
  };

  public render() {
    if (this.props.isOpen) {
      return <div ref={this.onRef}>{this.props.children}</div>;
    }

    return null;
  }
}

export default Popper;
