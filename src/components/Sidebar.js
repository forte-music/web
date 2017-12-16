import React from 'react';
import { NavLink } from 'react-router-dom';

import { link as linkClass, active as activeClass } from './Sidebar.css';

const Sidebar = ({ className }) =>
  <aside className={className}>
    <Link to="/home">Home</Link>
    <Link to="/queue">Queue</Link>
    <Link to="/songs">Songs</Link>
    <Link to="/artists">Artists</Link>
    <Link to="/albums">Albums</Link>
    <Link to="/playlists">Playlists</Link>
    <Link to="/search">Search</Link>
  </aside>

const Link = ({ to, children }) =>
  <NavLink
    activeClassName={activeClass}
    className={linkClass}
    to={to}>
    { children }
  </NavLink>

export default Sidebar;
