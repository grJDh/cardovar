import React from 'react';
import { useDispatch } from 'react-redux';
import { navigate } from "@reach/router"

import { openAlbumTemplate, deleteAlbum, duplicateAlbum } from '../../../../slices/albums';

import editIcon from '../../../../edit.png';
import deleteIcon from '../../../../delete.png';
import duplicateIcon from '../../../../duplicate.png';
// import showIcon from '../../../../show.png';

import styled from 'styled-components';
import { colors } from '../../../../colors.js';

const Wrapper = styled.div`
  height: 360px;
  flex: 1 1 480px;

  border: 1px solid black;

  position: relative;

  cursor: pointer;

  background-color: ${props => props.color};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    margin: 0;
  }
`;

const AlbumImgContainer = styled.div`
  height: 100%;
  width:100%;
  position: relative;
`;

const IconInput = styled.input`
  position: absolute;
  width: 35px;

  opacity: 0.5;
  transition: 0.5s ease;
  &:hover {
    opacity: 1;
    transition: 0.5s ease;
  }

  ${({ alt }) => {
    switch (alt) {
      case "Delete album":
        return `
          top: 0;
          right: 0;
        `
      case "Edit album":
        return `
          bottom: 0;
          left: 0;
        `
      default:
        return `
          bottom: 0;
          right: 0;
        `
    }
  }}
`;

const Album = ({ album, albumKey }) => {
  const dispatch = useDispatch();

  const onOpenAlbumTemplate = () => dispatch(openAlbumTemplate(["edit", albumKey]));
  const onDeleteAlbum = () => window.confirm('Are you sure you want to delete this album?') && dispatch(deleteAlbum(albumKey));
  // const onToggleAlbumVisibility = () => dispatch(toggleAlbumVisibility(albumKey));
  const onDuplicateAlbum = () => dispatch(duplicateAlbum([albumKey]));
  const onAlbumClick = event => (event.target.tagName !== "INPUT") && navigate("/CardList");

  return (
    <Wrapper onClick={(event) => onAlbumClick(event)} color={colors.main}>
        <AlbumImgContainer>
          <img src={album.img} alt={album.title} />
          <IconInput type="image" src={deleteIcon} alt="Delete album" onClick={onDeleteAlbum} />
          <IconInput type="image" src={editIcon} alt="Edit album" onClick={onOpenAlbumTemplate} />
          <IconInput type="image" src={duplicateIcon} alt="Duplicate album" onClick={onDuplicateAlbum} />
        </AlbumImgContainer>

        <h1>{album.title}</h1>
    </Wrapper>
  );
}

export default Album;