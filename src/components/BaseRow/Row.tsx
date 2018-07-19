import React from 'react';
import styles from './index.css';

interface Props {
  // Whether or not the current item should be styled as if it is active.
  active: boolean;

  // When this is true, the component show a loading state.
  empty: boolean;

  children: React.ReactNode;

  // Called when the component is double clicked.
  onDoubleClick?: () => void;
}

export const Row = ({ active, empty, children, onDoubleClick }: Props) => (
  <div
    className={[
      styles.row,
      empty ? styles.empty : '',
      active ? styles.active : '',
    ].join(' ')}
    onDoubleClick={onDoubleClick}
  >
    {children}
  </div>
);
