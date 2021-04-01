import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cardsSelector } from '../../../../slices/cards';
import { filtersSelector, closeTagFilters, updateTagFilterArrays } from '../../../../slices/filters';

import TagFiltersCheckBox from '../../parts/TagFiltersCheckBox';
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
  background-color: rgba(0,0,0,0.8);

  justify-content: center;
  align-items: center;
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

const TagFilters = () => {
  const dispatch = useDispatch();

  const [newTagFilters, setNewTagFilters] = useState({});

  const { tags } = useSelector(cardsSelector);
  const { tagFilterOpened, tagFilterIncludeArray, tagFilterExcludeArray } = useSelector(filtersSelector);

  const onSetTagList = tag => {

    const changeState = () => {
      if (newTagFilters[tag] === 0) return 1;
      if (newTagFilters[tag] === 1) return 2;
      return 0
    }

    setNewTagFilters({...newTagFilters, [tag]: changeState()});
  }

  const onSubmit = e => {
    e.preventDefault();

    let newTagFilterIncludeArray = [];
    let newTagFilterExcludeArray = [];

    for (const tag in newTagFilters) {
      if (newTagFilters[tag] === 1) newTagFilterIncludeArray.push(tag);
      if (newTagFilters[tag] === 2) newTagFilterExcludeArray.push(tag);
    }

    dispatch(updateTagFilterArrays([newTagFilterIncludeArray, newTagFilterExcludeArray]));

    onCloseTagFilters();
  };

  useEffect(() => {
    if (tagFilterOpened) {
      setNewTagFilters(tags.reduce((obj, tag) => {
        if (tagFilterIncludeArray.includes(tag)) return {...obj, [tag]: 1};
        if (tagFilterExcludeArray.includes(tag)) return {...obj, [tag]: 2};
        return {...obj, [tag]: 0};
      }, {}));
    }
  }, [tagFilterOpened, tags, tagFilterIncludeArray, tagFilterExcludeArray]);

  const onClose = event => (event.target.className.includes("form") && window.innerWidth > 1230) && dispatch(closeTagFilters());
  const onCloseTagFilters = () => dispatch(closeTagFilters());
  const escListener = event => {
    if (event.isComposing || event.key === "Escape") {
      onCloseTagFilters();
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
        <Button type="button" label={"Close"} onFunc={onCloseTagFilters}/>

        <FormPart>
          {tags.map((tag) => (
            <TagFiltersCheckBox label={tag} state={newTagFilters[tag]} onFunc={() => onSetTagList(tag)} key={tag}/>
            ))}
        </FormPart>

        <input type="submit" value="Save" />
      </Form>
    </Wrapper>
  );
}

export default TagFilters;