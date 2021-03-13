import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { openModalImage } from '../../../../slices/modal';
import { cardsSelector, openCardTemplate, deleteCard, toggleCardVisibility } from '../../../../slices/cards';

import TagBox from "../../parts/TagBox/TagBox";

import fullscreenIcon from '../../../../fullscreen.png';
import editIcon from '../../../../edit.png';
import deleteIcon from '../../../../delete.png';
import hideIcon from '../../../../hide.png';
import showIcon from '../../../../show.png';

import './Card.scss';

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

const CardWrapper = styled.div`
  min-width: 300px;
  width: 100%;
  max-width: 420px;
  height: 550px;
  margin: 1rem;
  padding: 0.5rem;
  background-color: transparent;

  text-align: center;
  perspective: 1000px;

  &.flipped ${CardInner} {
    transform: rotateY(180deg);
  }
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;

  background-color: #212121;
  border-radius: 6px;
  box-shadow: 2px 2px 4px 2px rgba( 0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  color: white;
`;

const CardBack = styled(CardFront)`
  transform: rotateY(180deg);

  p, h2 {
    margin: 0px;
  }

  p {
    font-size: 1.2rem;
  }
`;

const CardTitle = styled.div`
  height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardImgContainer = styled.div`
  max-height: 420px;
  max-width: 350px;
  position: relative;

  img {
    width: auto;
    height: auto;

    max-height: 420px;
    max-width: 350px;
  }
`;

const IconInput = styled.input`
  position: absolute;
  width: 35px;

  opacity: 0.5;
  transition: 0.5s ease;

  cursor: pointer;
  &:hover {
    opacity: 1;
    transition: 0.5s ease;
  }

  ${({ alt }) => {
    console.log(alt)
    switch (alt) {
      case "Show card":
      case "Hide card":
        return `
          top: 0;
          left: 0;
        `
      case "Delete card":
        return `
          top: 0;
          right: 0;
        `
      case "Open full":
        return `
          bottom: 0;
          right: 0;
        `
      default:
        return `
          bottom: 0;
          left: 0;
        `
    }
  }}
`;

const CardDesc = styled.div`
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = ({card, cardKey, selected}) => {

  const {title, desc, img, imgFull, tags, categories } = card;

  const dispatch = useDispatch();

  const { selectingMode } = useSelector(cardsSelector);

  const onOpenModalImage = () => dispatch(openModalImage({alt:title, src:imgFull}));
  const onOpenCardTemplate = () => dispatch(openCardTemplate(["edit", cardKey]));
  const onDeleteCard = () => (window.confirm('Are you sure you want to delete this card?')) && dispatch(deleteCard(cardKey));
  const onToggleCardVisibility = () => dispatch(toggleCardVisibility(cardKey));

  const [isFlipped, toggleFlipped] = useState(false);
  const onToggleFlipped = event => (event.target.tagName !== "INPUT") && toggleFlipped(!isFlipped)

  return (
    <CardWrapper className={`${isFlipped && "flipped"} ${card.hidden && "hidden"}`} onClick={(event) => onToggleFlipped(event)}>
      <CardInner>
        <CardFront>
          <CardTitle>
            <h2 className={`${!categories.includes("Alive") && "char-dead"}`}>{title}</h2>
          </CardTitle>

          <CardImgContainer>
            <img className={`${!categories.includes("Alive") && "char-dead"}`} src={img} alt={title}/>
            <IconInput type="image" src={card.hidden ? showIcon : hideIcon} alt={card.hidden ? "Show card"  : "Hide card" } onClick={onToggleCardVisibility} />
            <IconInput type="image" src={deleteIcon} alt="Delete card" onClick={onDeleteCard} />
            <IconInput type="image" src={fullscreenIcon} alt="Open full" onClick={onOpenModalImage} />
            <IconInput type="image" src={editIcon} alt="Edit card" onClick={onOpenCardTemplate} />
          </CardImgContainer>
        
          <CardDesc>
            <h3>{desc}</h3>
          </CardDesc>
        </CardFront>

        <CardBack>
          {Object.keys(tags).map((tag) => (
            <TagBox key={tag} title={tag} value={tags[tag]}/>
            ))}
        </CardBack>
      </CardInner>
    </CardWrapper>
  );
}

export default Card;