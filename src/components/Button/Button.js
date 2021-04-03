import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  height: 3rem;
  width: 100%;
  max-width: 150px;
  border: 1px solid black;
  border-radius: 0.25rem;
  background-color: ${props => props.theme.mainBack};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.main};
    transition: background-color 0.3s;
  }

  &:active {
    background-color: ${props => props.theme.mainDark};
  }
`;

const Button = ({ type="button", label, onFunc, name, className }) => {

  return (
    <StyledButton type={type} onClick={onFunc} name={name} className={className}>
      {label}
    </StyledButton>
  );
}

export default Button;
