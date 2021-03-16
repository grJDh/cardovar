import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  height: 3rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  background-color: ${props => props.theme.mainBack};
  color: white;

  &:hover {
    background-color: ${props => props.theme.main};
    transition: background-color 0.3s;
  }

  &:active {
    transform: translateY(2px);
    background-color: ${props => props.theme.mainDark};
  }

  cursor: pointer;

  margin: 0.3rem;
`;

const Button = ({ label, onFunc, name, className="" }) => {

  return (
    <Wrapper onClick={onFunc} name={name} className={`${className}`}>
      {label}
    </Wrapper>
  );
}

export default Button;
