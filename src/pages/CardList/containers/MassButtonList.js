import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../../components/Button/Button';

import { massAddTagToCard, massDeleteTagFromCard, massDeleteCard, massToggleCardVisibility } from '../../../slices/cards';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ButtonList = styled.div`
  position: fixed;
  bottom: 0;
`;

const MassButtonList = () => {
  const dispatch = useDispatch();

  const onMassToggleCardVisibility = () => dispatch(massToggleCardVisibility());
  const onMassDeleteCard = () => dispatch(massDeleteCard());
  const onMassAddTagToCard = () => dispatch(massAddTagToCard(prompt("Enter the tag to add")));
  const onMassDeleteTagFromCard = () => dispatch(massDeleteTagFromCard(prompt("Enter the tag to delete")));

  return (
    <Wrapper>
      <ButtonList>
        <Button label="Mass visibility toggle" onFunc={onMassToggleCardVisibility}/>
        <Button label="Mass delete" onFunc={onMassDeleteCard}/>
        <Button label="Mass tag add" onFunc={onMassAddTagToCard}/>
        <Button label="Mass tag delete" onFunc={onMassDeleteTagFromCard}/>
      </ButtonList>
    </Wrapper>
  );
}

export default MassButtonList;