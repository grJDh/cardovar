import React from 'react';
import styled from 'styled-components';

const StyledSearchBox = styled.div`
  position: relative;

  input {
    width: 100%;
    height: 2.5rem;
    border: 1px solid black;
    border-radius: 0.25rem;
    background-color: ${props => props.theme.mainBack};
    color: white;
    font-size: 1.3rem;

    &:hover {
      background-color: ${props => props.theme.main};
      transition: background-color 0.3s;
    }
  }

  button {
    position: absolute;
    right: 0;

    height: 2.5rem;
    cursor: pointer;
    font-size: 1.5rem;

    border: none;
    background-color: transparent;

    &:hover {
    background-color: ${props => props.theme.main};
    transition: background-color 0.3s;
    }

    &:active {
      background-color: ${props => props.theme.mainDark};
    }
  }
`;

const SearchBox = ({ onFunc, onResetFunc, value }) => {

  return (
    <StyledSearchBox>
      <input type="search" placeholder="Search" onChange={onFunc} autoComplete="off" value={value}/>
      <button onClick={onResetFunc}>✖</button>
    </StyledSearchBox>
  );
}

export default SearchBox;
