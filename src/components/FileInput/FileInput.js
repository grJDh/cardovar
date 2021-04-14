import React from 'react';

import styled from 'styled-components';

const StyledFileinput = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  box-sizing: border-box;
`;

const Label = styled.label`
  height: 350px;
  background-color: #a4a1a1;
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  &:hover {
    background-color: #727171;

    img {
      opacity: 50%;
    }
  }
`;

const Input = styled.input`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;


const FileInput = ({ onFunc, name, src }) => {

  return (
    <StyledFileinput>
      <Label>
        <Input className='visually-hidden' type="file" onChange={onFunc} name={name}/>
        <img src={src} alt="Choose a pic" />
      </Label>
    </StyledFileinput>
  );
}

export default FileInput;
