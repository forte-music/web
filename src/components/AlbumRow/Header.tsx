import React from 'react';
import styles from './index.css';
import { BaseHeader } from '../BaseRow';

export const Header = () => (
  <BaseHeader>
    <div className={styles.trackNumber}>#</div>
    <div className={styles.name}>Name</div>
    <div className={styles.artists}>Artists</div>
    <div className={styles.duration}>Duration</div>
  </BaseHeader>
);
