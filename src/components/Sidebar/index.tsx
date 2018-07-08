import * as React from 'react';
import * as styles from './style.css';
import { NavLink } from 'react-router-dom';

import { albums, artists, home, queue, search, songs } from '../../utils/paths';

interface Props {
  className: string;
}

const Sidebar = ({ className }: Props) => (
  <aside className={className}>
    <Link to={home}>Home</Link>
    <Link to={queue}>Queue</Link>
    <Link to={songs}>Songs</Link>
    <Link to={artists}>Artists</Link>
    <Link to={albums}>Albums</Link>
    <Link to={search}>Search</Link>
  </aside>
);

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

const Link = ({ to, children }: LinkProps) => (
  <NavLink activeClassName={styles.active} className={styles.link} to={to}>
    {children}
  </NavLink>
);

export default Sidebar;
