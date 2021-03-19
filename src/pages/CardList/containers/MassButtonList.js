import React from 'react';
import { useDispatch } from 'react-redux';

import ImageButton from '../../../components/ImageButton/ImageButton';

import { massAddTagToCard, massDeleteTagFromCard, massDeleteCard, massToggleCardVisibility } from '../../../slices/cards';

import deleteIcon from '../../../delete.png';
import hideIcon from '../../../hide.png';
import removeTagsIcon from '../../../removeTags.png';
import addTagsIcon from '../../../addTags.png';

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
        <StyledImageButton src={hideIcon} alt="Show/hide selected cards" onFunc={onMassToggleCardVisibility} />
        <StyledImageButton src={deleteIcon} alt="Delete selected cards" onFunc={onMassDeleteCard} />
        <StyledImageButton src={addTagsIcon} alt="Add tags to selected cards" onFunc={onMassAddTagToCard} />
        <StyledImageButton src={removeTagsIcon} alt="Remove tags from selected cards" onFunc={onMassDeleteTagFromCard} />
      </ButtonList>
    </Wrapper>
  );
}

export default MassButtonList;