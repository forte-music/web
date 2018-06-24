import * as React from 'react';
import * as styles from './Menu.css';
import Chevron from '../icons/Chevron';

export const Menu = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.menu}>{children}</div>
);

export const Item = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.item}>{children}</div>
);

export const MoreItems = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.composite}>
    <div className={styles.main}>{children}</div>
    <Chevron svgClass={styles.aux} />
  </div>
);

export const Divider = () => <div className={styles.divider} />;