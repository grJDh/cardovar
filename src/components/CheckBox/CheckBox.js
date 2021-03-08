import React from 'react';

import './CheckBox.scss';

const Checkbox = ({ label, onFunc, value=false, name }) => {

  return (
    <div className='checkbox'>
      <label>
        <input type="checkbox" onChange={onFunc} checked={value} name={name} />
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
