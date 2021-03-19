import React from 'react';
import styled from 'styled-components';

const StyledSelect= styled.select`
  height: 2rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  background-color: ${props => props.theme.mainBack};
  color: white;
  font-size: 1rem;

  &:hover {
    background-color: ${props => props.theme.main};
    transition: background-color 0.3s;
  }
`;

const Dropdown = ({ onFunc, value, name, options }) => {

  return (
    <StyledSelect name={name} onChange={onFunc} defaultValue={value}>
      {options.map((currentOption) => (
        <option key={currentOption[0]} value={currentOption[0]}>{currentOption[1]}</option>
        ))}
    </StyledSelect>
  );
}

export default Dropdown;
