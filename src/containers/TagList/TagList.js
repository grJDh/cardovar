import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './TagList.scss';

import { tagsSelector, updateInfo, closeTagList } from '../../slices/tags';
import { updateTagsinCards } from '../../slices/cards';

import TextBox from '../../components/TextBox/TextBox';
import Button from '../../components/Button/Button';

const TagList = () => {

  const { tagListOpened, tags, categories } = useSelector(tagsSelector);

  const dispatch = useDispatch();

  const [tagList, setTagList] = useState(tags);
  const [tagNamesList, setTagNamesList] = useState({});
  const [categoriesNamesList, setCategoriesNamesList] = useState({});
  const [duplicates, setDuplicates] = useState([]);
  const [categoriesDuplicates, setCategoriesDuplicates] = useState([]);

  const onSetTagValue = event => setTagList({...tagList, [event.target.name]: event.target.value});
  const onSetTagName = event => setTagNamesList({...tagNamesList, [event.target.name]: event.target.value});

  const onSetCategoriesNamesList = event => setCategoriesNamesList({...categoriesNamesList, [event.target.name]: event.target.value});

  const createNewTag = () => {
    const num = Date.now();
    setTagList({...tagList, [num]: ""});
    setTagNamesList({...tagNamesList, [num]: ""});
  };
  const createNewCategory = () => {
    const num = Date.now();
    setCategoriesNamesList({...categoriesNamesList, [num]: ""});
  };

  const deleteTag = tag => {
    const { [tag]: temp, ...remainingTags } = tagList;
    setTagList(remainingTags);
    const { [tag]: temp2, ...remainingNameTags } = tagNamesList;
    setTagNamesList(remainingNameTags);
  };
  const deleteCategory = tag => {
    const { [tag]: temp2, ...remainingNameTags } = categoriesNamesList;
    setCategoriesNamesList(remainingNameTags);
  };

  const checkForDuplicates = useCallback(val => {
    let dupl = [];

    const list = !val ? tagNamesList : categoriesNamesList;

    for (let i in list) {
      for (let j in list) {
        if (i !== j && list[i] === list[j]) dupl.push(i);
      }
    }

    !val ? setDuplicates(dupl) : setCategoriesDuplicates(dupl);
  }, [categoriesNamesList, tagNamesList]);
  
  useEffect(() => checkForDuplicates(0), [checkForDuplicates]);
  useEffect(() => checkForDuplicates(1), [checkForDuplicates]);

  const onSubmit = e => {
    e.preventDefault();

    if (!duplicates.length && !categoriesDuplicates.length) {
      const newTags = Object.keys(tagList).reduce((obj, key) => {
        return {...obj, [tagNamesList[key]]: tagList[key]}
      }, {});
      const newCategories = Object.values(categoriesNamesList);
  
      dispatch(updateInfo([newTags, newCategories]));
      dispatch(updateTagsinCards([tagNamesList, newTags, categoriesNamesList]));
  
      onCloseTagTemplate();
    }

    else window.alert("Duplicates in tag names are not allowed!");
  };

  useEffect(() => {
    setTagList(tags);
    setTagNamesList(Object.keys(tags).reduce((obj, key) => {
      return {...obj, [key]: key}
    }, {}));
    setCategoriesNamesList(categories.reduce((el, key) => {
      return {...el, [key]: key}
    }, {}));
    setDuplicates([]);
    setCategoriesDuplicates([]);
  }, [tagListOpened, categories, tags]);

  const onClose = event => (event.target.className === "tags-template opened") ? dispatch(closeTagList()) : "";
  const onCloseTagTemplate = () => dispatch(closeTagList());
  const escListener = event => {
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
    <div className={`tags-template ${tagListOpened && "opened"}`} onClick={(event) => onClose(event)}>
      <form className='tag-form' onSubmit={onSubmit}>

        <Button type="button" className="tag-form-close" label={"Close"} onFunc={onCloseTagTemplate}/>

        <div className='tag-form-part tag-form-main'>
          {Object.keys(tagList).map((tag) => (
            <div key={tag}>
              <TextBox className={`${duplicates.includes(tag) && "tag-error"}`} key={"tag"+tag} onFunc={onSetTagName} autocomplete="off" name={tag} value={tagNamesList[tag]} />
              <TextBox key={"value"+tag} onFunc={onSetTagValue} autocomplete="off" name={tag} value={tagList[tag]} />
              <Button type="button" className="tag-form-close" label="🗑️" onFunc={() => deleteTag(tag)}/>
            </div>
          ))}

          <Button type="button" className="tag-form-close" label="+" onFunc={createNewTag}/>
        </div>

        <div className='tag-form-part tag-form-second'>
          {Object.keys(categoriesNamesList).map((category) => (
            <div key={category}>
              <TextBox className={`${categoriesDuplicates.includes(category) && "tag-error"}`} key={"category"+category} onFunc={onSetCategoriesNamesList} autocomplete="off" name={category} value={categoriesNamesList[category]} />
              <Button type="button" className="tag-form-close" label="🗑️" onFunc={() => deleteCategory(category)}/>
            </div>
          ))}

          <Button type="button" className="tag-form-close" label="+" onFunc={createNewCategory}/>
        </div>

        <input className="tag-form-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default TagList;