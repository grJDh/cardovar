import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cardsSelector, addCard, changeCard, closeCardTemplate } from '../../../../slices/cards';

import TextBox from '../../../../components/TextBox/TextBox';
import Checkbox from '../../../../components/CheckBox/CheckBox';
import FileInput from '../../../../components/FileInput/FileInput';
import Button from '../../../../components/Button/Button';
import TextArea from '../../../../components/TextArea/TextArea';

import { allowedFileTypes } from '../../../../constants';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.95);

  justify-content: center;
  align-items: center;

  z-index: 10;
  padding: 5px;
  box-sizing: border-box;
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

  .card-form-close { grid-area: card-form-close; }
  .card-form-front { grid-area: card-form-front; }
  .card-form-back { grid-area: card-form-back; }
  .card-form-submit { grid-area: card-form-submit; }

  overflow: auto;
  justify-items: center;
  align-items: center;

  @media (max-width: ${props => props.theme.tabletSmall}) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1fr 1fr 0.1fr;
    grid-template-areas:
      "card-form-close"
      "card-form-front"
      "card-form-back"
      "card-form-submit";

    width: 100%;
    height: 100%;
  }
`;

const FormPart = styled.div`
  min-width: 300px;
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

// const ButtonClose = styled(Button)`
//   grid-area: card-form-close;
// `;

// const FormFront = styled(FormPart)`
//   grid-area: card-form-front;
// `;

// const FormBack = styled(FormPart)`
//   grid-area: card-form-back;
// `;

// const ButtonSubmit = styled(Button)`
//   grid-area: card-form-submit;
// `;

const CardTemplate = () => {
  const dispatch = useDispatch();

  const { cards, cardTemplateMode, editedCard } = useSelector(cardsSelector);

  const card = cards[editedCard]

  const [newCardProps, setNewCardProps] = useState({});
  const [newCardFile, setNewCardFile] = useState();
  const [filePreview, setFilePreview] = useState();
  const [fileExpiration, toggleFileExpiration] = useState(true);

  const onSetNewCardProps = event => setNewCardProps({...newCardProps, [event.target.name]: event.target.value});
  const onSetNewCardHidden = () => setNewCardProps({...newCardProps, hidden: !newCardProps.hidden})
  const onSetNewCardFile = event => {
    const file = event.target.files;

    if (!allowedFileTypes.includes(file[0].type)) {
      alert("File format must be either png or jpg!");
      return;
    }

    // console.log(file)
    
    setNewCardFile(file[0]);

    const reader = new FileReader();
    reader.onload = () => setFilePreview(reader.result);

    reader.readAsDataURL(file[0]);
  };
  const onToggleFileExpiration = () => toggleFileExpiration(!fileExpiration);

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

      const expiration = () => fileExpiration ? "expiration=60&" : "";

      fetch(
        'https://api.imgbb.com/1/upload?' + expiration() + 'key=ec795ad415158afca4aa146094d5be55',
        {
          method: 'POST',
          body: formData,
        }
      )
      .then(response => response.json())
      // .then(result => console.log(result))
      .then(result => {
        if (result.data.medium) executeAction({...{...newCardProps, tags: tagsStringToArray(newCardProps.tags), img: result.data.medium.url, imgFull: result.data.image.url}})
        else executeAction({...{...newCardProps, tags: tagsStringToArray(newCardProps.tags), img: result.data.image.url, imgFull: result.data.image.url}})
      })
      .catch((error) => console.error('Uploading error: ', error));
    } else executeAction({...{...newCardProps, tags: tagsStringToArray(newCardProps.tags), img: newCardProps.img, imgFull: newCardProps.imgFull}});

    onCloseCardTemplate();
  };

  const onCloseCardTemplate = () => dispatch(closeCardTemplate());
  const onClose = event => (event.target.className.includes("wrapper") && window.innerWidth > 1230) && dispatch(closeCardTemplate());
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
        tags: "",
        hidden: false
      });
      setFilePreview("");
    } else {
      setNewCardProps({
        title: card.title,
        shortDesc: card.shortDesc,
        longDesc: card.longDesc,
        img: card.img,
        imgFull: card.imgFull,
        tags: card.tags.join(),
        hidden: card.hidden
      });
      setFilePreview(card.img);
    }
    toggleFileExpiration(true);
  }, [card, cardTemplateMode]);

  return (
    <Wrapper onClick={(event) => onClose(event)} className="wrapper">
      <Form onSubmit={onSubmit}>

        <Button className="card-form-close" label="Close" onFunc={onCloseCardTemplate}/>

        <FormPart className='card-form-front'>
          <TextBox label="Title" onFunc={onSetNewCardProps} autocomplete="off" name='title' value={newCardProps.title}/>

          <FileInput label="Select a picture" onFunc={onSetNewCardFile} name='file' src={filePreview} />

          <TextBox label="Short description" onFunc={onSetNewCardProps} autocomplete="off" name='shortDesc' value={newCardProps.shortDesc}/>
        </FormPart>

        <FormPart className='card-form-back'>
          <TextArea label="Description" onFunc={onSetNewCardProps} name={"longDesc"} cols="40" rows="20" value={newCardProps.longDesc} />

          <TextArea label="Tags" onFunc={onSetNewCardProps} name={"tags"} cols="40" rows="3" value={newCardProps.tags} />

          <Checkbox label="Hidden" onFunc={onSetNewCardHidden} value={newCardProps.hidden} />

          <Checkbox label="Expiration?" onFunc={onToggleFileExpiration} value={fileExpiration} />
        </FormPart>

        <Button className="card-form-submit" type="submit" label="Submit" />
      </Form>
    </Wrapper>
  );
}

export default CardTemplate;