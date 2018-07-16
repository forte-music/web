import React from 'react';
import styles from './index.css';

export const Header = () => (
  <div className={styles.header}>
    <div className={styles.song}>Name</div>
    <div className={styles.album}>Album</div>
    <div className={styles.artist}>Artists</div>
    <div className={styles.duration}>Duration</div>
  </div>
);
