import React, { useState } from 'react';

import ModalImage from "react-modal-image";

import './CharCard.scss';

const CharCard = ({char}) => {

  const {name, desc, img, age, organisation, gender, race, home, addDesc } = char;

  const [isFlipped, toggleFlipped] = useState(false);
  const onToggleFlipped = () => {
    toggleFlipped(!isFlipped);
  }

  return (
    <div className={`char-card ${!isFlipped ? "" : "flipped"}`} onClick={onToggleFlipped}>
      <div className='char-card-inner'>
        <div className='char-card-front'>
          <div className="char-name">
            <h2 className='char-text'>{name}</h2>
          </div>

          {/* <div className="char-img" style={{ backgroundImage: `url(${img})`}} /> */}
          <img className='char-img' src={img} alt={name}/>
          {/* <ModalImage
            small={img}
            medium={img}
            alt={name}
            className='char-img'
          /> */}
        
          <div className="char-desc">
            <h3 className='char-text'>{desc}</h3>
          </div>
        </div>

        <div className='char-card-back'>
          <p>Пол: {gender}</p>
          <p>Раса: {race}</p>
          <p>Возраст: {age}</p>
          <p>Местонахождение: {home}</p>
          <p>Фракция: {organisation}</p>
        </div>
      </div>
    </div>
  );
}

export default CharCard;