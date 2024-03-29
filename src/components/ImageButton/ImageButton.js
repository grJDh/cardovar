import React from 'react';
import styled from 'styled-components';

const StyledImageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

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

  img {
    height: 2rem;
  }

  p {
    opacity: ${props => props.props ? 1 : 0};
    display: ${props => props.props ? "inline" : "none"};
    transition: opacity 0.5s ease-in-out;
    margin-left: 0.3rem;
  }

  @media (max-width: ${props => props.theme.tablet}) {
    flex-grow: 1;
    flex-basis: 170px;
  }
`;

const ImageButton = ({ src, alt, onFunc, name, label, className="", props=false }) => {

  return (
    <StyledImageButton onClick={onFunc} name={name} className={`${className}`} props={props} title={alt}>
      <img src={src} alt={alt} />
      <p>{label}</p>
    </StyledImageButton>
  );
}

export default ImageButton;
