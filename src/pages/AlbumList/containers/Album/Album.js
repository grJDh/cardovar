import React from 'react';
import { useDispatch } from 'react-redux';
import { navigate } from "@reach/router"

import { openAlbumTemplate, deleteAlbum, duplicateAlbum } from '../../../../slices/albums';

import editIcon from '../../../../edit.png';
import deleteIcon from '../../../../delete.png';
import duplicateIcon from '../../../../duplicate.png';
// import showIcon from '../../../../show.png';

import styled from 'styled-components';

const Wrapper = styled.div`
  height: 360px;
  flex: 1 1 480px;
  border: 1px solid black;
  position: relative;
  cursor: pointer;
  background-color: transparent;

  &:hover img {
    scale: 1.1
  }
  img {
    transition: scale 1s;
  }

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    
    margin: 0;
    color: white;

    background-color: rgba(0, 0, 0, 0.3);

    font-size: 3rem;
  }
`;

const AlbumImgContainer = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: content-box;
  overflow:hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

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
          bottom: 0;
          right: 0;
        `
      case "Edit album":
        return `
          bottom: 0;
          left: 0;
        `
      default:
        return `
          top: 0;
          left: 0;
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
  const onAlbumClick = event => {
    if (event.target.tagName !== "INPUT") {
      navigate("/albums/"+albumKey);
    }
  }

  return (
    <Wrapper onClick={(event) => onAlbumClick(event)}>
        <AlbumImgContainer>
          <img src={album.img} alt={album.title} />
          <h1>{album.title}</h1>
        </AlbumImgContainer>

        <IconInput type="image" src={deleteIcon} alt="Delete album" onClick={onDeleteAlbum} title="Delete album" />
        <IconInput type="image" src={editIcon} alt="Edit album" onClick={onOpenAlbumTemplate} title="Edit album" />
        <IconInput type="image" src={duplicateIcon} alt="Duplicate album" onClick={onDuplicateAlbum} title="Duplicate album" />
    </Wrapper>
  );
}

export default Album;