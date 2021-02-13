import React from 'react';

import "./ModalImage.scss"

const ModalImage = ({alt, src, opened, close}) => {

  if (opened) {
    return (
      <div className={`modal ${!opened ? "" : "opened"}`} onClick={(event) => close(event)}>
        <img alt={alt} src={src} />
      </div>
    );
  } else {
    return (
      <div>
      </div>
    );
  }
}

export default ModalImage;