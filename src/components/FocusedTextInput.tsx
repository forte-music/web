import React from 'react';

interface Props {
  className?: string;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void | false;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
}

// Text input focused on component mount.
export class FocusedTextInput extends React.Component<Props> {
  private element: HTMLInputElement | null = null;

  public componentDidMount() {
    if (!this.element) {
      return;
    }

    this.element.focus();
  }

  public render() {
    return (
      <input
        {...this.props}
        ref={element => (this.element = element)}
        type="text"
      />
    );
  }
}
