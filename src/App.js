import React from 'react';
import './App.scss';

import CharsList from './containers/CharsList/CharsList';
import SideBar from './containers/SideBar/SideBar';

import { chars } from './charsArray';

const App = () => {

  return (
    <div className="App">
      <SideBar/>

      <CharsList chars={chars}/>
    </div>
  );
}

export default App;