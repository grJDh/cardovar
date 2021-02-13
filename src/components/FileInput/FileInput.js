import React from 'react';

import './FileInput.scss';

const FileInput = ({ label, onFunc, name, src }) => {

  return (
    <div className='fileinput'>
      <label className='fileinput-label' htmlFor={label}>
        <input className='visually-hidden' type="file" onChange={onFunc} id={label} name={name}/>
        <img src={src} alt="Choose pic" />
      </label>
    </div>
  );
}

export default FileInput;
