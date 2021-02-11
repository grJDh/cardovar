import React from 'react';
import { useSelector } from 'react-redux';

import CharCard from '../../components/CharCard/CharCard';
import ModalImage from "../../components/ModalImage/ModalImage";

import { filtersSelector } from '../../slices/filters';
import { modalSelector } from '../../slices/modal';

import "./CharsList.scss"

const Chars = ({chars}) => {

  const { boolFilters, searchFilterValue } = useSelector(filtersSelector);
  const { modalImageAlt, modalImageSrc, modalImageOpened } = useSelector(modalSelector);

  const boolTagsFilter = boolTags => {
    const boolTagsKeys = Object.keys(boolTags);
    if (boolTagsKeys.length) {
      //console.log(boolTagsKeys);
      for (let i of boolTagsKeys) {
        //console.log(i, boolFilters[i], boolTags[i]);
        if (!(!boolFilters[i] || boolTags[i])) return false;
      };

      return true;
    }
  }

  const filteredChars = chars
  .filter(char => !char.hidden)

  .filter(char => boolTagsFilter(char.boolTags))

  .filter(char => char.title.toLowerCase().includes(searchFilterValue.toLowerCase()))
  .sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    // if (a.name === b.name) return 0;
    return 0;
  });

  return (
    <div className='chars-list'>

      <ModalImage alt={modalImageAlt} src={modalImageSrc} opened={modalImageOpened} />

      {filteredChars.map((char) => (
        <CharCard key={char.name} char={char}/>
        ))}
    </div>
  );
}

export default Chars;