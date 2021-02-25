import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './TagList.scss';

import { tagsSelector, closeTagList, updateTags } from '../../slices/tags';
import { updateTagsinCards } from '../../slices/cards';

import TextBox from '../../components/TextBox/TextBox';
import Checkbox from '../../components/CheckBox/CheckBox';
import Button from '../../components/Button/Button';

const TagList = () => {

  const { tagListOpened, tags, boolTags } = useSelector(tagsSelector);

  const dispatch = useDispatch();

  const [tagList, setTagList] = useState(tags);
  const [tagNamesList, setTagNamesList] = useState(Object.keys(tags).reduce((obj, key) => {
    return {...obj, [key]: key}
  }, {}));
  const [boolTagList, setBoolTagList] = useState(boolTags);
  const [boolTagNamesList, setBoolTagNamesList] = useState(Object.keys(boolTags).reduce((obj, key) => {
    return {...obj, [key]: key}
  }, {}));
  const [duplicates, setDuplicates] = useState([]);
  const [boolDuplicates, setBoolDuplicates] = useState([]);

  const onSetTagValue = event => setTagList({...tagList, [event.target.name]: event.target.value});
  const onSetTagName = event => setTagNamesList({...tagNamesList, [event.target.name]: event.target.value});

  const onSetBoolTagValue = event => setBoolTagList({...boolTagList, [event.target.name]: !boolTagList[event.target.name]});
  const onSetBoolTagName = event => setBoolTagNamesList({...boolTagNamesList, [event.target.name]: event.target.value});

  const createNewTag = () => {
    const num = Date.now();
    setTagList({...tagList, [num]: ""});
    setTagNamesList({...tagNamesList, [num]: ""});
  };
  const createNewBoolTag = () => {
    setBoolTagList({...boolTagList, "": false});
    setBoolTagNamesList({...boolTagNamesList, "": ""});
  };

  const deleteTag = tag => {
    const { [tag]: temp, ...remainingTags } = tagList;
    setTagList(remainingTags);
    const { [tag]: temp2, ...remainingNameTags } = tagNamesList;
    setTagNamesList(remainingNameTags);
  };
  const deleteBoolTag = tag => {
    const { [tag]: temp, ...remainingTags } = boolTagList;
    setBoolTagList(remainingTags);
    const { [tag]: temp2, ...remainingNameTags } = boolTagNamesList;
    setBoolTagNamesList(remainingNameTags);
  };

  const checkForDuplicates = useCallback(val => {
    let dupl = [];

    const list = !val ? tagNamesList : boolTagNamesList;

    for (let i in list) {
      for (let j in list) {
        if (i !== j && list[i] === list[j]) dupl.push(i);
      }
    }

    !val ? setDuplicates(dupl) : setBoolDuplicates(dupl);
  }, [boolTagNamesList, tagNamesList]);
  
  useEffect(() => checkForDuplicates(0), [checkForDuplicates]);
  useEffect(() => checkForDuplicates(1), [checkForDuplicates]);

  const onSubmit = e => {
    e.preventDefault();

    if (!duplicates.length && !boolDuplicates.length) {
      const newTags = Object.keys(tagList).reduce((obj, key) => {
        return {...obj, [tagNamesList[key]]: tagList[key]}
      }, {});
      const newBoolTags = Object.keys(boolTagList).reduce((obj, key) => {
        return {...obj, [boolTagNamesList[key]]: boolTagList[key]}
      }, {});
  
      dispatch(updateTags([newTags, newBoolTags]));
      dispatch(updateTagsinCards([[tagNamesList, newTags], [boolTagNamesList, newBoolTags]]));
  
      onCloseTagTemplate();
    }

    else window.alert("Duplicates in tag names are not allowed!");
  };

  useEffect(() => {
    setTagList(tags);
    setTagNamesList(Object.keys(tags).reduce((obj, key) => {
      return {...obj, [key]: key}
    }, {}));
    setBoolTagList(boolTags);
    setBoolTagNamesList(Object.keys(boolTags).reduce((obj, key) => {
      return {...obj, [key]: key}
    }, {}));
    setDuplicates([]);
    setBoolDuplicates([]);
  }, [tagListOpened, boolTags, tags]);

  const onClose = event => (event.target.className === "tags-template opened") ? dispatch(closeTagList()) : "";
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
    <div className={`tags-template ${!tagListOpened ? "" : "opened"}`} onClick={(event) => onClose(event)}>
      <form className='tag-form' onSubmit={onSubmit}>

        <Button type="button" className="tag-form-close" label={"Close"} onFunc={onCloseTagTemplate}/>

        <div className='tag-form-part tag-form-main'>
          {Object.keys(tagList).map((tag) => (
            <div key={tag}>
              <TextBox className={`${!duplicates.includes(tag) ? "" : "tag-error"}`} key={"tag"+tag} onFunc={onSetTagName} autocomplete="off" name={tag} value={tagNamesList[tag]} />
              <TextBox key={"value"+tag} onFunc={onSetTagValue} autocomplete="off" name={tag} value={tagList[tag]} />
              <Button type="button" className="tag-form-close" label="🗑️" onFunc={() => deleteTag(tag)}/>
            </div>
          ))}

          <Button type="button" className="tag-form-close" label="+" onFunc={createNewTag}/>
        </div>

        <div className='tag-form-part tag-form-second'>
          {Object.keys(boolTagList).map((tag) => (
            <div key={tag}>
              <TextBox className={`${!boolDuplicates.includes(tag) ? "" : "tag-error"}`} key={"boolTag"+tag} onFunc={onSetBoolTagName} autocomplete="off" name={tag} value={boolTagNamesList[tag]} />
              <Checkbox key={"boolValue"+tag} onFunc={onSetBoolTagValue} autocomplete="off" name={tag} value={boolTagList[tag]} />
              <Button type="button" className="tag-form-close" label="🗑️" onFunc={() => deleteBoolTag(tag)}/>
            </div>
          ))}

          <Button type="button" className="tag-form-close" label="+" onFunc={createNewBoolTag}/>
        </div>

        <input className="tag-form-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default TagList;