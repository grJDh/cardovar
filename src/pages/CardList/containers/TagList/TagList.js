import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cardsSelector, updateTagsInCards, closeTagList } from '../../../../slices/cards';

import Button from '../../../../components/Button/Button';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.95);

  justify-content: center;
  align-items: center;

  padding: 5px;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

const FormPart = styled.div`
  width: 75%;
  height: 80%;
  max-height: 550px;

  margin: 15px;

  background-color: ${props => props.theme.main};
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  color: white;

  box-sizing: border-box;
  overflow: auto;
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

      if (newName) {
        if (Object.values(tagList).includes(newName)) {
          alert("A tag with this name already exists!");
          recursivePrompt();
        }
        else setTagList({...tagList, [event.target.name]: newName});
      }
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

  const onClose = event => (event.target.className.includes("form") && window.innerWidth > 1230) && dispatch(closeTagList());
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
    <Wrapper onClick={(event) => onClose(event)}>
      <Form onSubmit={onSubmit} className="form">
        <Button label={"Close"} onFunc={onCloseTagTemplate}/>

        <FormPart>
          {tags.map((tag) => (
            <TagBox key={tag}>
              {tagList[tag]}
              <TagBoxButtons>
                <Button label="🖊️" name={tag} onFunc={onRenameTag} title="Edit tag name"/>
                <Button label="🗑️" onFunc={() => deleteTag(tag)} title="Delete tag"/>
              </TagBoxButtons>
            </TagBox>
          ))}
        </FormPart>

        <Button type="submit" label="Submit" />
      </Form>
    </Wrapper>
  );
}

export default TagList;