import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { modalSelector, closeModalImage } from '../../slices/modal';

import "./ModalImage.scss"

const ModalImage = ({alt, src, opened}) => {

  const dispatch = useDispatch();

  const onClose = (event) => {
    // if (event.target.tagName !== "IMG") dispatch(closeModalImage());
    dispatch(closeModalImage());
  }

  if (opened) {
    return (
      <div className={`modal ${!opened ? "" : "opened"}`} onClick={(event) => onClose(event)}>
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