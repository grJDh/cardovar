import React from 'react';
import { Router, Redirect } from "@reach/router"

import CardList from './pages/CardList/CardList';
import AlbumList from './pages/AlbumList/AlbumList';

import './App.scss';

import {ThemeProvider} from 'styled-components';

const colors = {
  main: "#212121",
  mainBack: "#323232",
  mainDark: "#151515",
  1: "#0d7377",
  2: "#14ffec"
};

const App = () => {
  return (
    <ThemeProvider theme={colors}>
      <Router className="app">
        <AlbumList path="/" />
        <CardList path="CardList" />
        <CardList path="albums/:albumID" />

        <Redirect
          from="albums"
          to="/"
          noThrow 
        />

      </Router>
    </ThemeProvider>
  );
}

export default App;

// better tag list
// mobile
// taglist overflow
// code review