import React from 'react';
import { useDispatch } from 'react-redux';

import ImageButton from '../../../components/ImageButton/ImageButton';
import Button from '../../../components/Button/Button';

import { massAddTagToCard, massDeleteTagFromCard, massDeleteCard, massToggleCardVisibility } from '../../../slices/cards';

import deleteIcon from '../../../delete.png';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ButtonList = styled.div`
  position: fixed;
  bottom: 0;

  display: flex;
`;

const StyledImageButton = styled(ImageButton)`
  width: 3rem;
`;

const MassButtonList = () => {
  const dispatch = useDispatch();

  const onMassToggleCardVisibility = () => dispatch(massToggleCardVisibility());
  const onMassDeleteCard = () => window.confirm('Are you sure you want to delete these cards?') && dispatch(massDeleteCard());
  const onMassAddTagToCard = () => dispatch(massAddTagToCard(prompt("Enter the tag to add")));
  const onMassDeleteTagFromCard = () => dispatch(massDeleteTagFromCard(prompt("Enter the tag to delete")));

  return (
    <Wrapper>
      <ButtonList> 
        <StyledImageButton src={deleteIcon} alt="Delete selected cards" onFunc={onMassDeleteCard} />
        <Button label="Show/hide selected cards" onFunc={onMassToggleCardVisibility}/>
        <Button label="Delete selected cards" onFunc={onMassDeleteCard}/>
        <Button label="Add tags to selected cards" onFunc={onMassAddTagToCard}/>
        <Button label="Remove tags from selected cards" onFunc={onMassDeleteTagFromCard}/>
      </ButtonList>
    </Wrapper>
  );
}

export default MassButtonList;