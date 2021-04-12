import React from 'react';

import './FileInput.scss';

// import styled from 'styled-components';

// const Wrapper = styled.div`
//   position: relative;
// `;

const FileInput = ({ onFunc, name, src }) => {

  return (
    <div className='fileinput'>
      <label className='fileinput-label'>
        <input className='visually-hidden' type="file" onChange={onFunc} name={name}/>
        <img src={src} alt="Choose a pic" />
      </label>
    </div>
  );
}

export default FileInput;
