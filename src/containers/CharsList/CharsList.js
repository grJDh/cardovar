import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CharCard from '../../components/CharCard/CharCard';

import "./CharsList.scss"

const Chars = ({chars}) => {

  return (
    <div className="chars-list">
      {chars.map((char) => (
        <CharCard key={char.name} name={char.name} desc={char.desc} img={char.img}/>
        ))}
    </div>
  );
}

export default Chars;