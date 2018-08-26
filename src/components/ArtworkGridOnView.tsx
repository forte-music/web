import React from 'react';
import Observer from 'react-intersection-observer';

interface Props {
  // Called when the component comes into view.
  onView: () => void;
}

// Calls a method on props when enters view. Often used to implement
// infinite scrolling.
export const ArtworkGridOnView = (props: Props) => (
  <Observer
    onChange={inView => {
      if (!inView) {
        return;
      }

      props.onView();
    }}
  >
    <div />
  </Observer>
);
