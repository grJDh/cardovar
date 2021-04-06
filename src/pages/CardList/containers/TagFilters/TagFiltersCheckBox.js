import React from 'react';
import styled from 'styled-components';

const SpanWrapper = styled.span`
  border: 1px solid black;
  padding: 5px;
  margin: 10px;

  cursor: pointer;

  ${({ state }) => {
    switch (state) {
      case 1:
        return `
          background-color: blue;
        `
      case 2:
        return `
          background-color: red;
        `
      default:
        return `
          background-color: transparent;
        `
    }
  }}
`;

const TagFiltersCheckBox = ({ label, onFunc, state, name }) => {

  // console.log(label, state)

  return (
    <SpanWrapper onClick={onFunc} state={state} name={name} >
      {label}
    </SpanWrapper>
  );
}

export default TagFiltersCheckBox;
