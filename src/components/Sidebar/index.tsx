import React, { ReactNode } from 'react';
import styles from './style.css';
import { NavLink } from 'react-router-dom';

import {
  albumsPath,
  artistsPath,
  homePath,
  queuePath,
  searchPath,
  songsPath,
} from '../../utils/paths';

interface Props {
  className?: string;
}

const Sidebar = ({ className }: Props) => (
  <aside className={className}>
    <Link to={homePath}>Home</Link>
    <Link to={queuePath}>Queue</Link>
    <Link to={songsPath}>Songs</Link>
    <Link to={artistsPath}>Artists</Link>
    <Link to={albumsPath}>Albums</Link>
    <Link to={searchPath}>Search</Link>
  </aside>
);

interface LinkProps {
  to: string;
  children: ReactNode;
}

const Link = ({ to, children }: LinkProps) => (
  <NavLink activeClassName={styles.active} className={styles.link} to={to}>
    {children}
  </NavLink>
);

export default Sidebar;
