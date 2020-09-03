import React from 'react';
import { useSelector } from 'react-redux';

import CharCard from '../../components/CharCard/CharCard';

import { filtersSelector } from '../../slices/filters';

import "./CharsList.scss"

const Chars = ({chars}) => {

  const { isSidebarOpened } = useSelector(filtersSelector);

  const sortedChars = chars.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    if (a.name == b.name) return 0;
  });

  return (
    <div className={`chars-list ${isSidebarOpened ? "" : "chars-wide"}`}>
      {sortedChars.map((char) => (
        <CharCard key={char.name} name={char.name} desc={char.desc} img={char.img}/>
        ))}
    </div>
  );
}

export default Chars;