import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cardsSelector, updateTagsInCards, closeTagList } from '../../../../slices/cards';

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
  width: 75%;
  height: 550px;

  background-color: ${props => props.theme.main};
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  color: white;
`;

const TagBox = styled.div`
  border: 1px solid black;
  padding: 5px;
  margin: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TagBoxButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    height: 1.5rem;
  }
`;

const TagList = () => {
  const dispatch = useDispatch();

  const { tags, tagListOpened } = useSelector(cardsSelector);

  const [tagList, setTagList] = useState({});

  const onRenameTag = event => {
    event.preventDefault();
    const recursivePrompt = () => {
      const newName = prompt('Enter new name for a tag', tagList[event.target.name]);

      if (Object.values(tagList).includes(newName)) {
        alert("A tag with this name already exists!");
        recursivePrompt();
      }

      else setTagList({...tagList, [event.target.name]: newName});
    }

    recursivePrompt();
  }

  const deleteTag = tag => {
    const { [tag]: temp2, ...remainingNameTags } = tagList;
    setTagList(remainingNameTags);
  };

  const onSubmit = e => {
    e.preventDefault();

    dispatch(updateTagsInCards(tagList));

    onCloseTagTemplate();
  };

  useEffect(() => {
    if (tagListOpened) {
      setTagList(tags.reduce((obj, key) => {
        return {...obj, [key]: key}
      }, {}));
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
              {tagList[tag]}
              <TagBoxButtons>
                <Button type="button" label="🖊️" name={tag} onFunc={onRenameTag} />
                <Button type="button" label="🗑️" onFunc={() => deleteTag(tag)}/>
              </TagBoxButtons>
            </TagBox>
          ))}
        </FormPart>

        <input type="submit" value="Submit" />
      </Form>
    </Wrapper>
  );
}

export default TagList;