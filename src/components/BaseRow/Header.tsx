import React from 'react';
import styles from './index.css';

interface Props {
  children: React.ReactNode;
}

export const Header = (props: Props) => (
  <div className={styles.header}>{props.children}</div>
);
