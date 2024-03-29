import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { openModalImage } from '../../../../slices/modal';
import { cardsSelector, openCardTemplate, duplicateCard, toggleCardSelection } from '../../../../slices/cards';

import CardTagsBox from "./CardTagsBox";

import fullscreenIcon from '../../../../fullscreen.png';
import editIcon from '../../../../edit.png';
// import deleteIcon from '../../../../delete.png';
import duplicateIcon from '../../../../duplicate.png';

import styled from 'styled-components';

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
  margin: 0.7rem;
  padding: 0.5rem;
  background-color: transparent;

  text-align: center;
  perspective: 1000px;

  &.flipped ${CardInner} {
    transform: rotateY(180deg);
  }

  &.hidden  {
    opacity: 0.5;
  }

  &.selected  {
    background-color: red;
  }
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  box-sizing: border-box;

  background-color: ${props => props.theme.main};
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
  position: relative;
  padding: 1em;

  p {
    margin: 0px;
    font-size: 1.2em;
  }
`;

const CardTitle = styled.div`
  height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  padding: 0.6rem;
  font-size: 1rem;

  h2 {
    &.char-dead::after
  }
`;

const CardDesc = styled.div`
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  padding: 0.5rem;
  font-size: 0.8rem;
`;

const CardImgContainer = styled.div`
  height: 100%;
  max-height: 420px;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;

    max-height: 400px;
    object-fit: contain;

    &.char-dead {
      filter: grayscale(100%);
      transition: ease 0.2s;

      &:hover {
        filter: grayscale(0);
        transition: ease 0.2s;
      }
    }
  }
`;

const IconInput = styled.input`
  position: absolute;
  width: 35px;
  margin: 0.5em;

  opacity: 0.5;
  transition: 0.5s ease;

  cursor: pointer;
  &:hover {
    opacity: 1;
    transition: 0.5s ease;
  }

  ${({ alt }) => {
    switch (alt) {
      case "Duplicate card":
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

const Card = ({card, cardKey}) => {

  const {title, shortDesc, longDesc, img, imgFull, tags } = card;

  const dispatch = useDispatch();
  const { selectingMode, selectedCards } = useSelector(cardsSelector);

  const onOpenModalImage = () => dispatch(openModalImage({alt:title, src:imgFull}));
  const onOpenCardTemplate = () => dispatch(openCardTemplate(["edit", cardKey]));
  // const onDeleteCard = () => (window.confirm('Are you sure you want to delete this card?')) && dispatch(deleteCard(cardKey));
  const onDuplicateCard = () => dispatch(duplicateCard(cardKey));
  // const onToggleCardVisibility = () => dispatch(toggleCardVisibility(cardKey));

  const [isFlipped, toggleFlipped] = useState(false);
  const onCardClick = event => {
    
    if (selectingMode) dispatch(toggleCardSelection(cardKey))
    else {
      const selection = window.getSelection();
      (event.target.tagName !== "INPUT" && selection.type !== "Range") && toggleFlipped(!isFlipped);
    }
  }

  return (
    <CardWrapper className={`${isFlipped ? "flipped" : ""} ${card.hidden ? "hidden" : ""} ${(selectedCards.includes(cardKey) && selectingMode) ? "selected" : ""}`} onClick={(event) => onCardClick(event)}>
      <CardInner>
        <CardFront>
          <CardTitle>
            <h2 className={`${tags.includes("dead") ? "char-dead" : ""}`}>{title}</h2>
          </CardTitle>

          <CardImgContainer>
            <img className={`${tags.includes("dead") ? "char-dead" : ""}`} src={img} alt={title}/>
            <IconInput type="image" src={duplicateIcon} alt="Duplicate card" onClick={onDuplicateCard} title="Duplicate card" />
            {/* <IconInput type="image" src={deleteIcon} alt="Delete card" onClick={onDeleteCard} /> */}
            <IconInput type="image" src={fullscreenIcon} alt="Open full" onClick={onOpenModalImage} title="Open full image" />
            <IconInput type="image" src={editIcon} alt="Edit card" onClick={onOpenCardTemplate} title="Edit card" />
          </CardImgContainer>
        
          <CardDesc>
            <h3>{shortDesc}</h3>
          </CardDesc>
        </CardFront>

        <CardBack>
          <p>{longDesc}</p>
          <CardTagsBox tags={tags}/>
        </CardBack>
      </CardInner>
    </CardWrapper>
  );
}

export default Card;