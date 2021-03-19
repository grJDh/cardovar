import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Album from './containers/Album/Album';
import AlbumTemplate from './containers/AlbumTemplate/AlbumTemplate';
// import AlbumListHeader from './containers/AlbumListHeader/AlbumListHeader';

import { albumsSelector, fetchAlbums, openAlbumTemplate } from '../../slices/albums';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const AlbumList = () => {
  const dispatch = useDispatch();

  const { albums, albumsLoading, albumsHasErrors } = useSelector(albumsSelector);

  const onAddAlbum = () => dispatch(openAlbumTemplate(["new", ""]));

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const renderAlbumList = () => {
    if (albumsLoading) return <p>Loading albums...</p>
    if (albumsHasErrors) return <p>Unable to display albums.</p>

    return (
      <List>
        {Object.keys(albums).map(key => (
          <Album key={key} albumKey={key} album={albums[key]} />
        ))}

        <AddAlbumButton onClick={onAddAlbum}>+</AddAlbumButton>
      </List>
    );
  }

  return (
    <Wrapper>
      {/* <AlbumListHeader /> */}
      
      {renderAlbumList()}

      <AlbumTemplate />
    </Wrapper>
  );
}

export default AlbumList;