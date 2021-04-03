import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Album from './containers/Album/Album';
import AlbumTemplate from './containers/AlbumTemplate/AlbumTemplate';
// import AlbumListHeader from './containers/AlbumListHeader/AlbumListHeader';

import { albumsSelector, fetchAlbums, openAlbumTemplate } from '../../slices/albums';

import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.mainBack};
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AddAlbumButton = styled.button`
  height: 360px;
  flex: 1 1 480px;

  border: 1px solid black;

  font-size: 120px;

  background-color: ${props => props.theme.main};

  &:hover {
    background-color: ${props => props.theme.mainDark};
    cursor: pointer;
  }
`;

const shine = keyframes`
  from {
    background-position: -300px;
  }

  to {
    background-position: 700px;
  }
`;

const SkeletonAlbum = styled.div`
  height: 360px;
  flex: 1 1 480px;
  margin: 0.7rem;
  padding: 0.5rem;
  background-image: linear-gradient(90deg, ${props => props.theme.main} 0px, ${props => props.theme.mainBack} 80px, ${props => props.theme.main} 160px);
  background-size: 1000px;
  border-radius: 6px;
  box-shadow: 2px 2px 4px 2px rgba( 0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  animation: ${shine} 2s infinite linear;
`;

const AlbumList = () => {
  const dispatch = useDispatch();

  const { albums, albumsLoading, albumsHasErrors, albumTemplateOpened } = useSelector(albumsSelector);

  const onAddAlbum = () => dispatch(openAlbumTemplate(["new", ""]));

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const loadingAlbumList = () => {
    return [1,2,3,4,5,6,7,8,9].map(key => (
      <SkeletonAlbum key={key}></SkeletonAlbum>
      ))
  }

  const renderAlbumList = () => {
    if (albumsLoading) return <List>{loadingAlbumList()}</List>
    if (albumsHasErrors) return <p>Unable to display albums.</p>

    return (
      <List>
        {Object.keys(albums).map(key => (
          <Album key={key} albumKey={key} album={albums[key]} />
        ))}

        <AddAlbumButton onClick={onAddAlbum}>+</AddAlbumButton>
      </List>
    )
  }

  return (
    <Wrapper>
      {/* <AlbumListHeader /> */}
      
      {renderAlbumList()}

      {(albumTemplateOpened) && <AlbumTemplate />}
    </Wrapper>
  );
}

export default AlbumList;