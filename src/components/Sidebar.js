// @flow
import React from 'react';
import type { Node } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Sidebar.css';

type Props = {
  className: string,
};

const Sidebar = ({ className }: Props) => (
  <aside className={className}>
    <Link to="/home">Home</Link>
    <Link to="/queue">Queue</Link>
    <Link to="/songs">Songs</Link>
    <Link to="/artists">Artists</Link>
    <Link to="/albums">Albums</Link>
    <Link to="/playlists">Playlists</Link>
    <Link to="/search">Search</Link>
  </aside>
);

type LinkProps = {
  to: string,
  children: Node,
};

const Link = ({ to, children }: LinkProps) => (
  <NavLink activeClassName={styles.active} className={styles.link} to={to}>
    {children}
  </NavLink>
);

export default Sidebar;
