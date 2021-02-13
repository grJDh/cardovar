import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { openModalImage } from '../../../../slices/modal';

import TagBox from "../../parts/TagBox/TagBox";

import fullscreenIcon from '../../../../fullscreen.png';
import editIcon from '../../../../edit.png';

import './Card.scss';

const Card = ({card}) => {

  const {title, desc, img, imgFull, tags, boolTags } = card;

  const dispatch = useDispatch();

  const onOpenModalImage = () => dispatch(openModalImage({alt:title, src:imgFull}));

  const [isFlipped, toggleFlipped] = useState(false);
  const onToggleFlipped = (event) => {
    if (!event.target.className.includes('char-img-icon') && window.getSelection().toString().length === 0) toggleFlipped(!isFlipped);
  }

  return (
    <div className={`char-card ${!isFlipped ? "" : "flipped"}`} onClick={(event) => onToggleFlipped(event)}>
      <div className='char-card-inner'>
        <div className='char-card-front'>
          <div className="char-name">
            <h2 className={`${boolTags["Alive"] ? "" : "char-dead"}`}>{title}</h2>
          </div>

          <div className='char-img-container'>
            <img className={`char-img ${boolTags["Alive"] ? "" : "char-dead"}`} src={img} alt={title}/>
            <img className='char-img-icon icon-full' src={fullscreenIcon} alt="Open full" onClick={onOpenModalImage} />
            <img className='char-img-icon icon-edit' src={editIcon} alt="Open full" onClick={onOpenModalImage} />
          </div>
        
          <div className="char-desc">
            <h3>{desc}</h3>
          </div>
        </div>

        <div className='char-card-back'>

          {Object.keys(tags).map((tag) => (
            <TagBox key={tag} title={tag} value={tags[tag]}/>
            ))}

        </div>
      </div>
    </div>
  );
}

export default Card;