import React from 'react';

import './TagBox.scss';

const TagBox = ({ title, value }) => {

  return (
    <div className='tagbox'>
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}

export default TagBox;
