import React from 'react';
import './App.scss';

import CharsList from './containers/CharsList/CharsList';
import SideBar from './containers/SideBar/SideBar';

import { chars } from './charsArray';

const App = () => {

  const filteredChars = chars.filter(char => !char.hidden)

  return (
    <div className="App">
      {/* <SideBar/> */}

      <CharsList chars={filteredChars}/>
    </div>
  );
}

export default App;