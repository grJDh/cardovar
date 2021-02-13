import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from './containers/Card/Card';
import ModalImage from "./parts/ModalImage/ModalImage";
import CreateCard from './containers/CardTemplate/CardTemplate';

import { filtersSelector } from '../../slices/filters';
import { modalSelector, closeModalImage } from '../../slices/modal';
import { cardsSelector } from '../../slices/cards';

import "./CardList.scss"

const CardList = () => {

  const dispatch = useDispatch();

  const { boolFilters, searchFilterValue } = useSelector(filtersSelector);
  const { modalImageAlt, modalImageSrc, modalImageOpened } = useSelector(modalSelector);
  const { cards, cardTemplateOpened, cardTemplateMode } = useSelector(cardsSelector);

  const boolTagsFilter = boolTags => {
    const boolTagsKeys = Object.keys(boolTags);
    if (boolTagsKeys.length) {
      for (let i of boolTagsKeys) {
        if (!(!boolFilters[i] || boolTags[i])) return false;
      };

      return true;
    }
  }

  const filteredCards = cards
  .filter(card => !card.hidden)

  .filter(card => boolTagsFilter(card.boolTags))

  .filter(card => card.title.toLowerCase().includes(searchFilterValue.toLowerCase()))
  .sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    // if (a.name === b.name) return 0;
    return 0;
  });

  const onClose = (event) => {
    // if (event.target.tagName !== "IMG") dispatch(closeModalImage());
    dispatch(closeModalImage());
  }

  return (
    <div className='chars-list'>

      <ModalImage alt={modalImageAlt} src={modalImageSrc} opened={modalImageOpened} close={onClose}/>

      {filteredCards.map((card) => (
        <Card key={card.img} card={card}/>
        ))}

      <CreateCard opened={cardTemplateOpened} mode={cardTemplateMode} />
    </div>
  );
}

export default CardList;