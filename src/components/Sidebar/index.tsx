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
    <SidebarLink to={homePath}>Home</SidebarLink>
    <SidebarLink to={queuePath}>Queue</SidebarLink>
    <SidebarLink to={songsPath}>Songs</SidebarLink>
    <SidebarLink to={artistsPath}>Artists</SidebarLink>
    <SidebarLink to={albumsPath}>Albums</SidebarLink>
    <SidebarLink to={searchPath}>Search</SidebarLink>
  </aside>
);

interface SidebarLinkProps {
  to: string;
  children: ReactNode;
}

const SidebarLink = ({ to, children }: SidebarLinkProps) => (
  <NavLink activeClassName={styles.active} className={styles.link} to={to}>
    {children}
  </NavLink>
);

export default Sidebar;
