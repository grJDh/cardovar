import React  from 'react';

import './CharCard.scss';

const CharCard = ({name, desc, img}) => {

  return (
    <div className="charcard">
      <h3>{name}</h3>
      <img src={img} alt={name}/>
      <h4>{desc}</h4>
    </div>
  );
}

export default CharCard;