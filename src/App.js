import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar';
import Footer from './containers/Footer';
import store from './store';

import {
  grid as gridClass, sidebar as sidebarClass, footer as footerClass,
  content as contentClass,
} from './App.css';

const App = () =>
  <HashRouter>
    <Provider store={store}>
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

        <Footer className={footerClass} />
      </div>
    </Provider>
  </HashRouter>

export default App;
