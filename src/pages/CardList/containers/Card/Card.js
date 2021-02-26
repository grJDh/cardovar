import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { openModalImage } from '../../../../slices/modal';
import { openCardTemplate, deleteCard, toggleCardVisibility } from '../../../../slices/cards';

import TagBox from "../../parts/TagBox/TagBox";

import fullscreenIcon from '../../../../fullscreen.png';
import editIcon from '../../../../edit.png';
import deleteIcon from '../../../../delete.png';
import hideIcon from '../../../../hide.png';
import showIcon from '../../../../show.png';

import './Card.scss';

const Card = ({card, cardKey}) => {

  const {title, desc, img, imgFull, tags, boolTags} = card;

  const dispatch = useDispatch();

  const onOpenModalImage = () => dispatch(openModalImage({alt:title, src:imgFull}));
  const onOpenCardTemplate = () => dispatch(openCardTemplate(["edit", cardKey]));
  const onDeleteCard = () => (window.confirm('Are you sure you want to delete this card?')) ? dispatch(deleteCard(cardKey)) : "";
  const onToggleCardVisibility = () => dispatch(toggleCardVisibility(cardKey));

  const [isFlipped, toggleFlipped] = useState(false);
  const onToggleFlipped = event => (event.target.tagName !== "INPUT") ? toggleFlipped(!isFlipped) : "";

  return (
    <div className={`char-card ${!isFlipped ? "" : "flipped"} ${!card.hidden ? "" : "hidden"}`} onClick={(event) => onToggleFlipped(event)}>
      <div className='char-card-inner'>
        <div className='char-card-front'>
          <div className="char-name">
            <h2 className={`${boolTags["Alive"] ? "" : "char-dead"}`}>{title}</h2>
          </div>

          <div className='char-img-container'>
            <img className={`char-img ${boolTags["Alive"] ? "" : "char-dead"}`} src={img} alt={title}/>
            <input type="image" className='char-img-icon icon-hide' src={card.hidden ? showIcon : hideIcon} alt={card.hidden ? "Show card"  : "Hide card" } onClick={onToggleCardVisibility} />
            <input type="image" className='char-img-icon icon-delete' src={deleteIcon} alt="Delete card" onClick={onDeleteCard} />
            <input type="image" className='char-img-icon icon-full' src={fullscreenIcon} alt="Open full" onClick={onOpenModalImage} />
            <input type="image" className='char-img-icon icon-edit' src={editIcon} alt="Edit card" onClick={onOpenCardTemplate} />
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