import React from 'react';
import { Router } from "@reach/router"

import CardList from './pages/CardList/CardList';
import AlbumList from './pages/AlbumList/AlbumList';

const App = () => {
  return (
    <Router>
      <AlbumList path="/" />
      <CardList path="CardList" />
    </Router>
  );
}

export default App;

// code review
// selecting cards to edit them
// settings
// different styles