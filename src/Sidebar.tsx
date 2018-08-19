import React from 'react';
import styled from './styled-components';
import { NavLink } from 'react-router-dom';
import { shade } from 'polished';

import {
  albumsPath,
  artistsPath,
  homePath,
  queuePath,
  searchPath,
  songsPath,
} from './utils/paths';

interface Props {
  className?: string;
}

export const Sidebar = (props: Props) => (
  <aside className={props.className}>
    <SidebarLink to={homePath}>Home</SidebarLink>
    <SidebarLink to={queuePath}>Queue</SidebarLink>
    <SidebarLink to={songsPath}>Songs</SidebarLink>
    <SidebarLink to={artistsPath}>Artists</SidebarLink>
    <SidebarLink to={albumsPath}>Albums</SidebarLink>
    <SidebarLink to={searchPath('')}>Search</SidebarLink>
  </aside>
);

const activeClassName = 'activeClass';

// A block navbar link with a hover effect and an accent for the selected item.
const SidebarLink = styled(NavLink).attrs({ activeClassName })`
  display: block;
  height: 36px;
  line-height: 36px;

  padding-left: 1em;
  border-left: 0.125em solid transparent;
  padding-right: 1.125em;

  /* Reset link look. */
  color: ${props => props.theme.sidebarLinkInactiveColor};
  text-decoration: none;
  outline: none;

  &.${activeClassName} {
    color: ${props => props.theme.sidebarLinkActiveColor};
    border-color: ${props => props.theme.accentColor};
  }

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    border-color: ${props => shade(0.3, props.theme.accentColor)};
  }

  &:active {
    opacity: 0.5;
  }
`;
