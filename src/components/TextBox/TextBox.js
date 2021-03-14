import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 100%;

  input {
    border:none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    width: 80%;
    height: 25px;
    margin-top: 5px;
    text-align: center;
    border-radius: 4px;
    appearance: none;
    outline: none;
  }
`;

const TextBox = ({ label, onFunc, autocomplete, name, value=" ", className}) => {

  return (
    <Label className={className}>
      {label}
      <input type="text" onChange={onFunc} autoComplete={autocomplete} name={name} value={value}/>
    </Label>
  );
}

export default TextBox;
