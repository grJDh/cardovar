import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 100%; 

  textarea {
    border:none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    width: 80%;
    border-radius: 4px;
  }
`;

const TextArea = ({ label, onFunc, cols, rows, name, value=" "}) => {

  return (
    <Label>
      {label}
      <textarea onChange={onFunc} cols={cols} rows={rows} name={name} value={value}></textarea>
    </Label>
  );
}

export default TextArea;
