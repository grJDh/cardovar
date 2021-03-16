import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cardsSelector, addCard, changeCard, closeCardTemplate } from '../../../../slices/cards';

import TextBox from '../../../../components/TextBox/TextBox';
import Checkbox from '../../../../components/CheckBox/CheckBox';
import FileInput from '../../../../components/FileInput/FileInput';
import Button from '../../../../components/Button/Button';
import TextArea from '../../../../components/TextArea/TextArea';

import './CardTemplate.scss';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.8);

  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.2fr 3fr 0.2fr;
  gap: 10px 10px;
  grid-template-areas:
    "card-form-close card-form-close"
    "card-form-front card-form-back"
    "card-form-submit card-form-submit";
`;

const FormPart = styled.div`
  min-width: 400px;
  width: 100%;
  max-width: 420px;
  height: 550px;

  background-color: ${props => props.theme.main};
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  color: white;
`;

const CardTemplate = () => {
  const dispatch = useDispatch();

  const { cards, cardTemplateMode, editedCard } = useSelector(cardsSelector);

  const card = cards[editedCard]

  const [newCardProps, setNewCardProps] = useState({});
  const [filePreview, setFilePreview] = useState();
  const [newCardFile, setNewCardFile] = useState();

  const onSetNewCardProps = event => setNewCardProps({...newCardProps, [event.target.name]: event.target.value});
  const onSetNewCardHidden = () => setNewCardProps({...newCardProps, hidden: !newCardProps.hidden})
  const onSetNewCardFile = event => {
    setNewCardFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => setFilePreview(e.target.result);

    reader.readAsDataURL(event.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();

    const executeAction = payload => {
      if (cardTemplateMode === "edit") {
        dispatch(changeCard(payload));
      } else {
        dispatch(addCard(payload));
      }
    }

    const tagsStringToArray = tags => [...new Set(tags.split(","))].map(tag => tag.trim().toLowerCase());

    if (newCardFile) {
      const formData = new FormData();
      formData.append('image', newCardFile);

      fetch(
        'https://api.imgbb.com/1/upload?expiration=600&key=ec795ad415158afca4aa146094d5be55',
        {
          method: 'POST',
          body: formData,
        }
      )
      .then((response) => response.json())
      .then((result) => executeAction({...{...newCardProps, tags: tagsStringToArray(newCardProps.tags), img: result.data.medium.url, imgFull: result.data.image.url}}))
      .catch((error) => console.error('Uploading error: ', error));
    }
    else executeAction({...{...newCardProps, tags: tagsStringToArray(newCardProps.tags), img: newCardProps.img, imgFull: newCardProps.imgFull}});

    onCloseCardTemplate();
  };

  const onCloseCardTemplate = () => dispatch(closeCardTemplate());
  const onClose = event => (event.target.className.includes("wrapper")) && dispatch(closeCardTemplate());

  const escListener = (event) => {
    if (event.isComposing || event.key === "Escape") {
      onCloseCardTemplate();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", event => escListener(event));
  
    return () => {
      window.removeEventListener("keydown", event => escListener(event))
    }
  });

  useEffect(() => {
    if (cardTemplateMode === "new") {
      setNewCardProps({
        title: "",
        shortDesc: "",
        longDesc: "",
        img: "",
        imgFull: "",
        tags: [],
        hidden: false
      });
      setFilePreview("");
    } else {
      setNewCardProps({
        title: card.title,
        shortDesc: card.desc,
        longDesc: card.longDesc,
        img: card.img,
        imgFull: card.imgFull,
        tags: card.tags.join(),
        hidden: card.hidden
      });
      setFilePreview(card.img);
    }
  }, [card, cardTemplateMode]);

  return (
    <Wrapper onClick={(event) => onClose(event)} className="wrapper">
      <Form onSubmit={onSubmit}>

        <Button className="card-form-close" type="button" label={"Close"} onFunc={onCloseCardTemplate}/>

        <FormPart className='card-form-front'>
          <TextBox label="Title" onFunc={onSetNewCardProps} autocomplete="off" name='title' value={newCardProps.title}/>

          <FileInput label="Select a picture" onFunc={onSetNewCardFile} name='file' src={filePreview} />

          <TextBox label="Short description" onFunc={onSetNewCardProps} autocomplete="off" name='shortDesc' value={newCardProps.shortDesc}/>
        </FormPart>

        <FormPart className='card-form-back'>
          <TextArea label="Description" onFunc={onSetNewCardProps} name={"longDesc"} cols="40" rows="20" value={newCardProps.longDesc} />

          <TextArea label="Tags" onFunc={onSetNewCardProps} name={"tags"} cols="40" rows="3" value={newCardProps.tags} />

          <Checkbox label={"Hidden"} onFunc={onSetNewCardHidden} value={newCardProps.hidden} />
        </FormPart>

        <input className="card-form-submit" type="submit" value="Submit" />
      </Form>
    </Wrapper>
  );
}

export default CardTemplate;