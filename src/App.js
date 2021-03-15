import React from 'react';
import { Router } from "@reach/router"

import CardList from './pages/CardList/CardList';
import AlbumList from './pages/AlbumList/AlbumList';

import './App.scss';

import {ThemeProvider} from 'styled-components';

const colors = {
  main: "#212121",
  mainBack: "#323232",
  1: "#0d7377",
  2: "#14ffec"
};

const App = () => {
  return (
    <ThemeProvider theme={colors}>
      <Router className="app">
        <AlbumList path="/" />
        <CardList path="CardList" />
      </Router>
    </ThemeProvider >
  );
}

export default App;

// tags viewing
// code review
// settings
// different styles