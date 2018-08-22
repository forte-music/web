import React from 'react';
import Observer from 'react-intersection-observer';

interface Props {
  // Called when the sentinel comes into the view.
  onStartLoading: () => void;
}

// Calls a method on props when enters view. Often used to implement
// infinite scrolling.
export const ArtworkGridLoadMoreSentinel = (props: Props) => (
  <Observer
    onChange={inView => {
      if (!inView) {
        return;
      }

      props.onStartLoading();
    }}
  >
    <div />
  </Observer>
);
