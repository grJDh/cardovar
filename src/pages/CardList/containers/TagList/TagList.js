import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cardsSelector, updateTagsInCards, closeTagList } from '../../../../slices/cards';

import TextBox from '../../../../components/TextBox/TextBox';
import Button from '../../../../components/Button/Button';

import './TagList.scss';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormPart = styled.div`
  width: 400px;
  height: 750px;

  background-color: ${props => props.theme.main};
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  color: white;

  overflow: scroll;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  width: 90%
`;

const TagList = () => {
  const dispatch = useDispatch();

  const { tags, tagListOpened } = useSelector(cardsSelector);

  const [tagList, setTagList] = useState({});
  const [duplicates, setDuplicates] = useState([]);

  const onSetTagList = event => setTagList({...tagList, [event.target.name]: event.target.value});

  const deleteTag = tag => {
    const { [tag]: temp2, ...remainingNameTags } = tagList;
    setTagList(remainingNameTags);
  };

  const checkForDuplicates = useCallback(() => {
    let dupl = [];

    for (let i in tagList) {
      for (let j in tagList) {
        if (i !== j && tagList[i].toLowerCase() === tagList[j].toLowerCase()) dupl.push(i);
      }
    }

    setDuplicates(dupl);
  }, [tagList]);
  
  useEffect(() => checkForDuplicates(), [checkForDuplicates]);

  const onSubmit = e => {
    e.preventDefault();

    if (!duplicates.length) {
      dispatch(updateTagsInCards(tagList));
  
      onCloseTagTemplate();
    }

    else window.alert("Duplicates in tag names are not allowed!");
  };

  useEffect(() => {
    if (tagListOpened) {
      setTagList(tags.reduce((obj, key) => {
        return {...obj, [key]: key}
      }, {}));
      setDuplicates([]);
    }
  }, [tagListOpened, tags]);

  const onClose = event => (event.target.className.includes("wrapper")) ? dispatch(closeTagList()) : "";
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
    <Wrapper onClick={(event) => onClose(event)} className="wrapper">
      <Form onSubmit={onSubmit}>
        <Button type="button" label={"Close"} onFunc={onCloseTagTemplate}/>

        <FormPart>
          {tags.map((tag) => (
              <TagBox key={tag}>
                <TextBox className={`${duplicates.includes(tag) && "tag-error"}`} label={tag} onFunc={onSetTagList} autocomplete="off" name={tag} value={tagList[tag]} />
                <Button type="button" label="🗑️" onFunc={() => deleteTag(tag)}/>
              </TagBox>
            ))}
        </FormPart>

        <input type="submit" value="Submit" />
      </Form>
    </Wrapper>
  );
}

export default TagList;