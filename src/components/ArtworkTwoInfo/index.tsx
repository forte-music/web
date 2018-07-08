import React, { ReactNode } from 'react';
import styles from './styles.css';

export interface Props {
  artwork: ReactNode;
  lineOne: ReactNode;
  lineTwo: ReactNode;
}

export const ArtworkTwoInfo = (props: Props) => (
  <div className={styles.container}>
    {props.artwork}
    <div className={styles.lineOne}>{props.lineOne}</div>

    <div className={styles.lineTwo}>{props.lineTwo}</div>
  </div>
);
