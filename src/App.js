import React from 'react';
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar';

import {
  grid as gridClass, sidebar as sidebarClass, footer as footerClass,
  content as contentClass,
} from './App.css';

const App = () =>
  <HashRouter>
    <div className={gridClass}>
      <Sidebar className={sidebarClass} />

      <main className={contentClass}>
        <Switch>
          <Route path='/songs' />
          <Route path='/songs/:id' />

          <Route path='/artists' />
          <Route path='/artists/:id' />

          <Route path='/albums' />
          <Route path='/albums/:id' />

          <Route path='/playlists' />
          <Route path='/playlists/:id' />

          <Route path='/home' />
          <Route path='/queue' />
          <Route path='/search' />

          <Redirect from='/' to='/home' />
        </Switch>
      </main>

      <footer className={footerClass}>

      </footer>
    </div>
  </HashRouter>

export default App;
