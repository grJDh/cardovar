import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { tagsSelector, closeTagTemplate, addTag } from '../../slices/tags';
import { addTagtoCards } from '../../slices/cards';

import TextBox from '../../components/TextBox/TextBox';
import Checkbox from '../../components/CheckBox/CheckBox';
import Button from '../../components/Button/Button';

import './TagTemplate.scss';

const TagTemplate = ({opened, mode}) => {

  const dispatch = useDispatch();

  const [newTagName, setNewTagName] = useState("");
  const [newTagValue, setNewTagValue] = useState("");
  const [newTagBoolValue, setNewTagBoolValue] = useState(false);
  const [newTagIsBool, setTagIsBool] = useState(false);

  const onSetNewTagName = event => setNewTagName(event.target.value);
  const onSetNewTagValue = event => setNewTagValue(event.target.value);
  const onSetNewTagBoolValue = () => setNewTagBoolValue(!newTagBoolValue);
  const onSetTagIsBool = () => setTagIsBool(!newTagIsBool);

  const onSubmit = e => {
    e.preventDefault();

    if (!newTagIsBool) {
      dispatch(addTag(["tags", newTagName, newTagValue]));
      if (window.confirm('Add this tag to all existing cards?')) dispatch(addTagtoCards(["tags", newTagName, newTagValue]));
    }
    else {
      dispatch(addTag(["boolTags", newTagName, newTagBoolValue]));
      if (window.confirm('Add this tag to all existing cards?')) dispatch(addTagtoCards(["boolTags", newTagName, newTagBoolValue]));
    }

    onCloseTagTemplate();
  }

  const onCloseTagTemplate = () => dispatch(closeTagTemplate());

  const escListener = (event) => {
    if (event.isComposing || event.key === "Escape") {
      onCloseTagTemplate();
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
      setNewTagName("");
      setNewTagValue("");
      setNewTagBoolValue(false);
      setTagIsBool(false);
    } else {
      return
    }
  }, [opened, mode]);

  return (
    <div className={`tags-template ${!opened ? "" : "opened"}`}>
      <form className='tag-form' onSubmit={onSubmit}>

        <Button type="button" className="tag-form-close" label={"Close"} onFunc={onCloseTagTemplate}/>

        <div className='tag-form-part tag-form-main'>
          <TextBox label="Name" onFunc={onSetNewTagName} autocomplete="off" name='key' value={newTagName} />

          { (newTagIsBool) ?
          <Checkbox label="Default value" onFunc={onSetNewTagBoolValue} name='value' value={newTagBoolValue} /> : 
          <TextBox label="Default value" onFunc={onSetNewTagValue} autocomplete="off" name='value' value={newTagValue} />}

          <Checkbox label="Is boolean?" onFunc={onSetTagIsBool} name="Is boolean?" value={newTagIsBool} />
        </div>

        <input className="tag-form-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default TagTemplate;