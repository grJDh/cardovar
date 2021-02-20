import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './TagList.scss';

import { tagsSelector, closeTagList, updateTags } from '../../slices/tags';

import TextBox from '../../components/TextBox/TextBox';
import Checkbox from '../../components/CheckBox/CheckBox';
import Button from '../../components/Button/Button';

const TagList = () => {

  const { tagListOpened, tags } = useSelector(tagsSelector);

  const dispatch = useDispatch();

  const [tagList, setTagList] = useState(tags);
  const [tagNamesList, setTagNamesList] = useState(Object.keys(tags).reduce((obj, key) => {
    return {...obj, [key]: key}
  }, {}));

  const onSetTagValue = event => setTagList({...tagList, [event.target.name]: event.target.value});
  const onSetTagName = event => setTagNamesList({...tagNamesList, [event.target.name]: event.target.value});

  const onSubmit = e => {
    e.preventDefault();

    const newTags = Object.keys(tags).reduce((obj, key) => {
      return {...obj, [tagNamesList[key]]: tagList[key]}
    }, {})

    const newBoolTags = {
      "Major": false,
      "Alive": true
    };

    dispatch(updateTags([newTags, newBoolTags]))

    onCloseTagTemplate();
  }

  const onCloseTagTemplate = () => dispatch(closeTagList());
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

  return (
    <div className={`tags-template ${!tagListOpened ? "" : "opened"}`}>
      <form className='tag-form' onSubmit={onSubmit}>

        <Button type="button" className="tag-form-close" label={"Close"} onFunc={onCloseTagTemplate}/>

        <div className='tag-form-part tag-form-main'>
          {/* <TextBox label="Name" onFunc={onSetNewTagName} autocomplete="off" name='key' value={newTagName} />

          { (newTagIsBool) ?
          <Checkbox label="Default value" onFunc={onSetNewTagBoolValue} name='value' value={newTagBoolValue} /> : 
          <TextBox label="Default value" onFunc={onSetNewTagValue} autocomplete="off" name='value' value={newTagValue} />}

          <Checkbox label="Is boolean?" onFunc={onSetTagIsBool} name="Is boolean?" value={newTagIsBool} /> */}
 
          {Object.keys(tagList).map((tag) => (
            <div key={tag}>
              <TextBox key={"tag"+tag} onFunc={onSetTagName} autocomplete="off" name={tag} value={tagNamesList[tag]} />
              <TextBox key={"value"+tag} onFunc={onSetTagValue} autocomplete="off" name={tag} value={tagList[tag]} />
            </div>
          ))}
        </div>

        <input className="tag-form-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default TagList;