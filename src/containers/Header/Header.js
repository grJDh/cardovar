import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '../../components/CheckBox/CheckBox';

import './Header.scss';

import { filtersSelector, toggleMajor, toggleDead } from '../../slices/filters';

const Header = () => {

  const dispatch = useDispatch();
  const { isMajor, isDead } = useSelector(filtersSelector);

  const onToggleMajor = () => dispatch(toggleMajor(!isMajor));
  const onToggleDead = () => dispatch(toggleDead(!isDead));

  return (
    <header className='header'>
      <Checkbox label='Только важные' onFunc={onToggleMajor} />
      <Checkbox label='Только живые' onFunc={onToggleDead} />
    </header>
  );
}

export default Header;