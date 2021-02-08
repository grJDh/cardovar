import React from 'react';
import { useSelector } from 'react-redux';

import CharCard from '../../components/CharCard/CharCard';
import ModalImage from "../../components/ModalImage/ModalImage";

import { filtersSelector } from '../../slices/filters';
import { mainSelector } from '../../slices/main';

import "./CharsList.scss"

const Chars = ({chars}) => {

  const { isMajor, isDead, searchFilterValue } = useSelector(filtersSelector);
  const { modalImageAlt, modalImageSrc, modalImageOpened } = useSelector(mainSelector);

  // делай коммиты, чтобы в гитхабе было видно, что ты работаешь
  const filteredChars = chars
  .filter(char => !char.hidden)

  .filter(char => !isMajor || char.tags.major)
  .filter(char => isDead || !char.tags.dead)

  .filter(char => char.title.toLowerCase().includes(searchFilterValue.toLowerCase()))
  .sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    if (a.name === b.name) return 0;
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