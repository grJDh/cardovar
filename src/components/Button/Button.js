import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  height: 3rem;
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
    transform: translateY(2px);
    background-color: ${props => props.theme.mainDark};
  }
`;

const Button = ({ label, onFunc, name, className="" }) => {

  return (
    <StyledButton onClick={onFunc} name={name} className={`${className}`}>
      {label}
    </StyledButton>
  );
}

export default Button;
