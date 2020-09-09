import React from 'react';
import './App.scss';

import CharsList from './containers/CharsList/CharsList';
import Header from './containers/Header/Header';

import { chars } from './charsArray';

const App = () => {

  return (
    <div className="app">
      <Header/>

      <CharsList chars={chars}/>

      <div>Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
}

export default App;