import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import TextBox from '../../../../components/TextBox/TextBox';
import FileInput from '../../../../components/FileInput/FileInput';
import Button from '../../../../components/Button/Button';
import Checkbox from '../../../../components/CheckBox/CheckBox';

import { albumsSelector, closeAlbumTemplate, changeAlbum, addAlbum } from '../../../../slices/albums';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.95);

  z-index: 10;
  padding: 5px;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 3fr 0.2fr;
  gap: 10px 10px;
  grid-template-areas:
    "album-form-close"
    "album-form-part"
    "album-form-submit";

  .album-form-close { grid-area: album-form-close; }
  .album-form-part { grid-area: album-form-part; }
  .album-form-submit { grid-area: album-form-submit; }

  overflow: auto;
  justify-items: center;
  align-items: center;
  width: 500px;

  @media (max-width: ${props => props.theme.tabletSmall}) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 3fr 0.2fr;
    grid-template-areas:
      "album-form-close"
      "album-form-part"
      "album-form-submit";

    width: 100%;
    height: 100%;
  }
`;

const FormPart = styled.div`
  min-width: 300px;
  width: 100%;
  max-width: 500px;

  height: 550px;

  background-color: ${props => props.theme.main};
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  color: white;
`;

const AlbumTemplate = () => {
  const dispatch = useDispatch();

  const { albums, albumTemplateMode, editedAlbum } = useSelector(albumsSelector);

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
      .then(result => {
        if (result.data.medium) executeAction({title: newAlbumTitle, url: "", img: result.data.medium.url, categories: [], hidden: false})
        else executeAction({title: newAlbumTitle, url: "", img: result.data.image.url, categories: [], hidden: false})
      })
      .catch((error) => console.error('Error: ', error));
    }
    else executeAction({title: newAlbumTitle, url: "", img: filePreview, categories: [], hidden: newAlbumHidden});

    onCloseAlbumTemplate();
  };

  const onCloseAlbumTemplate = () => dispatch(closeAlbumTemplate());
  const onClose = event => (event.target.className.includes("wrapper") && window.innerWidth > 1230) && dispatch(closeAlbumTemplate());
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
    <Wrapper onClick={(event) => onClose(event)} className="wrapper">
      <Form onSubmit={onSubmit}>

        <Button className="album-form-close" type="button" label={"Close"} onFunc={onCloseAlbumTemplate} />

        <FormPart className="album-form-part">
          <TextBox label="Title" onFunc={onSetNewAlbumTitle} autocomplete="off" value={newAlbumTitle} />

          <FileInput label="Select a picture" onFunc={onSetNewAlbumFile} name='file' src={filePreview} />

          <Checkbox label={"Hide album"} onFunc={onToggleNewAlbumHidden} value={newAlbumHidden} />
        </FormPart>

        <Button className="album-form-submit" type="submit" label="Submit" />
      </Form>
    </Wrapper>
  );
}

export default AlbumTemplate;