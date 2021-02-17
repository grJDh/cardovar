import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { tagsSelector } from '../../../../slices/tags';
import { addCard, changeCard, closeCardTemplate } from '../../../../slices/cards';

import TextBox from '../../../../components/TextBox/TextBox';
import Checkbox from '../../../../components/CheckBox/CheckBox';
import FileInput from '../../../../components/FileInput/FileInput';
import Button from '../../../../components/Button/Button';

import './CardTemplate.scss';

const CardTemplate = ({opened, mode, card}) => {

  const dispatch = useDispatch();

  const { tags, boolTags } = useSelector(tagsSelector);

  const [newCardReqs, setNewCardReqs] = useState("");
  const [newCardTags, setNewCardTags] = useState("");
  const [newCardBools, setNewCardBools] = useState(false);
  const [filePreview, setFilePreview] = useState("");
  const [newCardFile, setNewCardFile] = useState();

  const onSetNewCardReqs = event => setNewCardReqs({...newCardReqs, [event.target.name]: event.target.value});
  const onSetNewCardTags = event => setNewCardTags({...newCardTags, [event.target.name]: event.target.value});
  const onSetNewCardBools = event => setNewCardBools({...newCardBools, [event.target.name]: !newCardBools[event.target.name]});
  const onSetNewCardFile = event => {
    setNewCardFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => setFilePreview(e.target.result);

    reader.readAsDataURL(event.target.files[0]);
  }

  const onSubmit = e => {
    e.preventDefault();

    const executeAction = (payload) => {
      if (mode === "edit") {
        dispatch(changeCard(payload));
      } else {
        dispatch(addCard(payload));
      }
    }

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
      .then((result) => executeAction({...{...newCardReqs, img: result.data.medium.url, imgFull: result.data.image.url}, tags: newCardTags, boolTags: newCardBools}))
      .catch((error) => console.error('Error: ', error));
    } else executeAction({...{...newCardReqs, img: newCardReqs.img, imgFull: newCardReqs.imgFull}, tags: newCardTags, boolTags: newCardBools});

    onCloseCardTemplate();
  };

  const onCloseCardTemplate = () => dispatch(closeCardTemplate());

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
    if (mode === "new") {
      setNewCardReqs({
        title: "",
        desc: "",
        img: "",
        imgFull: "",
        hidden: false
      });
      setNewCardTags(tags);
      setNewCardBools(boolTags);
      setFilePreview("");
    } else {
      setNewCardReqs({
        title: card.title,
        desc: card.desc,
        img: card.img,
        imgFull: card.imgFull,
        hidden: card.hidden
      });
      setNewCardTags(card.tags);
      setNewCardBools(card.boolTags);
      setFilePreview(card.img);
    }
  }, [opened, boolTags, card, mode, tags]);

  return (
    <div className={`card-template ${!opened ? "" : "opened"}`}>
      <form className='card-form' onSubmit={onSubmit}>

        <Button type="button" className="card-form-close" label={"Close"} onFunc={onCloseCardTemplate}/>

        <div className='card-form-part card-form-front'>
          <TextBox label="Title" onFunc={onSetNewCardReqs} autocomplete="off" name='title' value={newCardReqs.title}/>

          <FileInput label="Select a picture" onFunc={onSetNewCardFile} name='file' src={filePreview} />

          <TextBox label="Description" onFunc={onSetNewCardReqs} autocomplete="off" name='desc' value={newCardReqs.desc}/>
        </div>

        <div className='card-form-part card-form-back'>
          {Object.keys(tags).map((tag) => (
            <TextBox key={tag} label={tag} onFunc={onSetNewCardTags} autocomplete="off" name={tag} value={newCardTags[tag]}/>
            ))}

          {Object.keys(boolTags).map((tag) => (
            <Checkbox key={tag} label={"Is " + tag.toLowerCase() + "?"} onFunc={onSetNewCardBools} name={tag} value={newCardBools[tag]} />
            ))}
        </div>

        <input className="card-form-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CardTemplate;