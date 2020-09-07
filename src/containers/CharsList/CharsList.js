import React from 'react';
import { useSelector } from 'react-redux';

import CharCard from '../../components/CharCard/CharCard';

import { filtersSelector } from '../../slices/filters';

import "./CharsList.scss"

const Chars = ({chars}) => {

  const { isMajor } = useSelector(filtersSelector);

  const filteredChars = chars
  .filter(char => !char.hidden)
  .filter(char => !isMajor || char.major)
  .sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    if (a.name == b.name) return 0;
  });

  return (
    <div className='chars-list'>
      {filteredChars.map((char) => (
        <CharCard key={char.name} char={char}/>
        ))}
    </div>
  );
}

export default Chars;