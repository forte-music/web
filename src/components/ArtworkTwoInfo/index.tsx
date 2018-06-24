import * as React from 'react';
import * as styles from './styles.css';

export interface Props {
  artwork: React.ReactNode;
  lineOne: React.ReactNode;
  lineTwo: React.ReactNode;
}

export const ArtworkTwoInfo = (props: Props) => (
  <div className={styles.container}>
    {props.artwork}
    <div className={styles.lineOne}>{props.lineOne}</div>

    <div className={styles.lineTwo}>{props.lineTwo}</div>
  </div>
);
