import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import CardList from './pages/CardList/CardList';
import AlbumList from './pages/AlbumList/AlbumList';

import './App.scss';

import {ThemeProvider} from 'styled-components';

const sizes = {
  mobileSmall: `410px`,
  mobile: `420px`,
  tabletSmall: `820px`,
  tablet: `1230px`,
}

const colors = {
  main: "#212121",
  mainBack: "#323232",
  mainDark: "#151515",
  1: "#0d7377",
  2: "#14ffec"
};

const App = () => {
  return (
    <ThemeProvider theme={{...colors, ...sizes}}>
      <Router>
        <Switch>
          <Route exact path="/" component={AlbumList} />
          <Route path="/albums/:albumID" component={CardList} />
        </Switch>
{/* 
        <Redirect
          exact
          from="/albums"
          to="/"
        /> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;

// router problem (https://grjdh.github.io/campaign-characters/albums/0)
 
// other albums
// code review