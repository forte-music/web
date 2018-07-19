import React from 'react';
import styles from './index.css';
import { BaseHeader } from '../BaseRow';

export const Header = () => (
  <BaseHeader>
    <div className={styles.song}>Name</div>
    <div className={styles.album}>Album</div>
    <div className={styles.artist}>Artists</div>
    <div className={styles.duration}>Duration</div>
  </BaseHeader>
);
