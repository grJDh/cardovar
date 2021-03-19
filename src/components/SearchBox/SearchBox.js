import React from 'react';
import styled from 'styled-components';

const StyledSearchBox = styled.input`
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
`;

const SearchBox = ({ onFunc }) => {

  return (
    <StyledSearchBox type="search" placeholder="Search" onChange={onFunc} autoComplete="off">
    </StyledSearchBox>
  );
}

export default SearchBox;
