import React from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.div`
  margin: 10px;
`;

const Checkbox = ({ label, onFunc, value=false, name }) => {

  return (
    <StyledCheckbox>
      <label>
        <input type="checkbox" onChange={onFunc} checked={value} name={name} />
        {label}
      </label>
    </StyledCheckbox>
  );
}

export default Checkbox;
