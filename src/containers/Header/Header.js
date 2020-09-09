import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '../../components/CheckBox/CheckBox';

import './Header.scss';

import { filtersSelector, toggleMajor } from '../../slices/filters';

const Header = () => {

  const dispatch = useDispatch();
  const { isMajor } = useSelector(filtersSelector);

  const onToggleMajor = () => dispatch(toggleMajor(!isMajor));

  return (
    <header className='header'>
      <Checkbox label='Только важные' onFunc={onToggleMajor} />
    </header>
  );
}

export default Header;