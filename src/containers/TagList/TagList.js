import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './TagList.scss';

import { tagsSelector, closeTagList, updateTags } from '../../slices/tags';

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
  const [boolTagList, setboolTagList] = useState(boolTags);
  const [boolTagNamesList, setboolTagNamesList] = useState(Object.keys(boolTags).reduce((obj, key) => {
    return {...obj, [key]: key}
  }, {}));
  const [duplicates, setDuplicates] = useState([]);
  const [boolDuplicates, setBoolDuplicates] = useState([]);

  const onSetTagValue = event => setTagList({...tagList, [event.target.name]: event.target.value});
  const onSetTagName = event => setTagNamesList({...tagNamesList, [event.target.name]: event.target.value});

  const onSetBoolTagValue = event => setboolTagList({...boolTagList, [event.target.name]: !boolTagList[event.target.name]});
  const onSetBoolTagName = event => setboolTagNamesList({...boolTagNamesList, [event.target.name]: event.target.value});

  const createNewTag = () => {
    const num = Date.now();
    setTagList({...tagList, [num]: ""});
    setTagNamesList({...tagNamesList, [num]: ""});
  };
  const createNewBoolTag = () => {
    setboolTagList({...boolTagList, "": false});
    setboolTagNamesList({...boolTagNamesList, "": ""});
  };

  const checkForDuplicates = val => {
    let dupl = [];

    const list = !val ? tagNamesList : boolTagNamesList;

    for (let i in list) {
      for (let j in list) {
        if (i !== j && list[i] === list[j]) dupl.push(i);
      }
    }

    !val ? setDuplicates(dupl) : setBoolDuplicates(dupl);
  };
  
  useEffect(() => checkForDuplicates(0), [tagNamesList]);
  useEffect(() => checkForDuplicates(1), [boolTagNamesList]);

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
  
      onCloseTagTemplate();
    } else window.alert("Duplicates in tag keys are not allowed!");
  };

  useEffect(() => {
    setTagList(tags);
    setTagNamesList(Object.keys(tags).reduce((obj, key) => {
      return {...obj, [key]: key}
    }, {}));
    setboolTagList(boolTags);
    setboolTagNamesList(Object.keys(boolTags).reduce((obj, key) => {
      return {...obj, [key]: key}
    }, {}));
    setDuplicates([]);
    setBoolDuplicates([]);
  }, [boolTags, tags]);

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
          {Object.keys(tagList).map((tag) => (
            <div key={tag}>
              <TextBox className={`${!duplicates.includes(tag) ? "" : "tag-error"}`} key={"tag"+tag} onFunc={onSetTagName} autocomplete="off" name={tag} value={tagNamesList[tag]} />
              <TextBox key={"value"+tag} onFunc={onSetTagValue} autocomplete="off" name={tag} value={tagList[tag]} />
            </div>
          ))}

          <Button type="button" className="tag-form-close" label="+" onFunc={createNewTag}/>
        </div>

        <div className='tag-form-part tag-form-second'>
          {Object.keys(boolTagList).map((tag) => (
            <div key={tag}>
              <TextBox className={`${!boolDuplicates.includes(tag) ? "" : "tag-error"}`} key={"boolTag"+tag} onFunc={onSetBoolTagName} autocomplete="off" name={tag} value={boolTagNamesList[tag]} />
              <Checkbox key={"boolValue"+tag} onFunc={onSetBoolTagValue} autocomplete="off" name={tag} value={boolTagList[tag]} />
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