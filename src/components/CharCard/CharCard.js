import React from 'react';

import ModalImage from "react-modal-image";

import './CharCard.scss';

const CharCard = ({name, desc, img}) => {

  return (
    <div className='char-card'>
      <div className="char-name">
        <h2 className='char-text'>{name}</h2>
      </div>

      {/* <div className="char-img" style={{ backgroundImage: `url(${img})`}} /> */}
      {/* <img src={img} alt={name}/> */}
      <ModalImage
        small={img}
        medium={img}
        alt={name}
        className='char-img'
      />
    
      <div className="char-desc">
        <h3 className='char-text'>{desc}</h3>
      </div>
    </div>
  );
}

export default CharCard;