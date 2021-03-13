import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import TextBox from '../../../../components/TextBox/TextBox';
import FileInput from '../../../../components/FileInput/FileInput';
import Button from '../../../../components/Button/Button';
import Checkbox from '../../../../components/CheckBox/CheckBox';

import { albumsSelector, closeAlbumTemplate, changeAlbum, addAlbum } from '../../../../slices/albums';

const Wrapper = styled.div`
  display: ${props => props.opened ? 'flex': 'none'};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.9);

  justify-content: center;
  align-items: center;
`;

const AlbumTemplate = () => {
  const dispatch = useDispatch();

  const { albums, albumTemplateOpened, albumTemplateMode, editedAlbum } = useSelector(albumsSelector);

  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumHidden, toggleNewAlbumHidden] = useState(false);
  const [filePreview, setFilePreview] = useState();
  const [newAlbumFile, setNewAlbumFile] = useState();

  const album = albums[editedAlbum];

  const onSetNewAlbumTitle = event => setNewAlbumTitle(event.target.value);
  const onToggleNewAlbumHidden = () => toggleNewAlbumHidden(!newAlbumHidden)
  const onSetNewAlbumFile = event => {
    setNewAlbumFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => setFilePreview(e.target.result);

    reader.readAsDataURL(event.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();

    const executeAction = payload => {
      if (albumTemplateMode === "edit") {
        dispatch(changeAlbum(payload));
      } else {
        dispatch(addAlbum(payload));
      }
    }

    if (newAlbumFile) {
      const formData = new FormData();
      formData.append('image', newAlbumFile);

      fetch(
        'https://api.imgbb.com/1/upload?expiration=600&key=ec795ad415158afca4aa146094d5be55',
        {
          method: 'POST',
          body: formData,
        }
      )
      .then((response) => response.json())
      .then((result) => executeAction({title: newAlbumTitle, url: "", img: result.data.medium.url, categories: [], hidden: false}))
      .catch((error) => console.error('Error: ', error));
    }
    else executeAction({title: newAlbumTitle, url: "", img: filePreview, categories: [], hidden: newAlbumHidden});

    onCloseAlbumTemplate();
  };

  const onCloseAlbumTemplate = () => dispatch(closeAlbumTemplate());
  // const onClose = event => (event.target.className === "card-template opened") ? dispatch(closeCardTemplate()) : "";

  const escListener = (event) => {
    if (event.isComposing || event.key === "Escape") {
      onCloseAlbumTemplate();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", event => escListener(event));
  
    return () => {
      window.removeEventListener("keydown", event => escListener(event))
    }
  });

  useEffect(() => {
    if (albumTemplateMode === "new") {
      setNewAlbumTitle("");
      toggleNewAlbumHidden(false)
      setFilePreview();
    } else {
      setNewAlbumTitle(album.title);
      toggleNewAlbumHidden(album.hidden);
      setFilePreview(album.img);
    }
  }, [album, albumTemplateMode]);

  return (
    <Wrapper opened={albumTemplateOpened}>
      <form className='' onSubmit={onSubmit}>

        <Button className='' type="button" label={"Close"} onFunc={onCloseAlbumTemplate}/>

        <div className=''>
          <TextBox label="Title" onFunc={onSetNewAlbumTitle} autocomplete="off" value={newAlbumTitle}/>

          <FileInput label="Select a picture" onFunc={onSetNewAlbumFile} name='file' src={filePreview} />

          <Checkbox label={"Hide album"} onFunc={onToggleNewAlbumHidden} value={newAlbumHidden} />
        </div>

        <input className="" type="submit" value="Submit" />
      </form>
    </Wrapper>
  );
}

export default AlbumTemplate;