import React, { useEffect } from 'react';
import './App.scss';

import CharsList from './containers/CharsList/CharsList';
import Header from './containers/Header/Header';

import { chars } from './charsArray';

const App = () => {

  return (
    <div className="app">
      <Header/>

      <CharsList chars={chars}/>
    </div>
  );
}

export default App;

// tags
// different styles
// categories
// hidden/shown