import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { startMassImageAdding } from '../../../../slices/cards';

import Button from '../../../../components/Button/Button';

import { allowedFileTypes } from '../../../../constants';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  position: fixed;
  z-index: 10;

  visibility: hidden;

  ${({ isDragged, imgsArray }) => (isDragged || imgsArray.length) && `
    visibility: visible;
    background-color: rgba(0,0,0,0.95);
  `}
`;

const DragText = styled.h1`
  font-size: 100px;
  color: white;
`;

const ImgsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const Imgs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width: 90%;
  height: 80%;

  margin: 15px;

  background-color: ${props => props.theme.main};
  border-radius: 6px;

  overflow: auto;
`;

const StyledImg = styled.img`
  height: 100%;
  width: 100%;

  transition: opacity 0.2s ease-in-out;
`;

const RemoveImage = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  opacity: 0;

  z-index: 1;

  transition: opacity 0.2s ease-in-out;

  font-size: 100px;
`;

const ImgDiv = styled.div`
  height: 100%;
  max-height: 200px;
  width: auto;

  position: relative;

  margin: 25px;

  color: white;

  cursor: pointer;

  &:hover {
    ${StyledImg} {
      opacity: 0.5;
      transition: opacity 0.2s ease-in-out;
    }

    ${RemoveImage} {
      opacity: 1;
      transition: opacity 0.2s ease-in-out;
    }
  }
`;

const DragAndDropUpload = () => {
  const dispatch = useDispatch();

  const [imgsArray, setImgsArray] = useState([]);
  const [isDragged, setIsDragged] = useState(false);

  useEffect(() => {
    window.addEventListener("dragenter", () => setIsDragged(true));
  
    return () => {
      window.removeEventListener("dragenter", () => setIsDragged(false))
    }
  });
  const onDragExit = e => {
    e.preventDefault();
    e.stopPropagation()

    setIsDragged(false);
  };
  const onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    setImgsArray([]);

    const {
      dataTransfer: { files }
    } = e;

    let promises = [];

    for (let i = 0; i < files.length; i++) {
      if (!allowedFileTypes.includes(files[i].type)) {
        alert("File format must be either png or jpg!");
        return;
      }

      let filePromise = new Promise(resolve => {
        const reader = new FileReader();

        reader.readAsDataURL(files[i]);

        reader.onload = () => resolve(reader.result);
      });
      promises.push(filePromise);
    }

    Promise.all(promises).then(fileContents => {
      setImgsArray(fileContents);
      setIsDragged(false);
    });
  };
  const onRemoveImg = i => setImgsArray([...imgsArray.slice(0, i), ...imgsArray.slice(i+1)]);
  const onSubmit = () => {
    dispatch(startMassImageAdding(imgsArray));
    setImgsArray([]);
  };

  const onCloseDragAndDrop = () => setImgsArray([]);
  const onClose = event => (event.target.className.includes("wrapper")) && setImgsArray([]);
  const escListener = (event) => {
    if (event.isComposing || event.key === "Escape") {
      onCloseDragAndDrop();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", event => escListener(event));
  
    return () => {
      window.removeEventListener("keydown", event => escListener(event))
    }
  });

  return (
    <Wrapper onDragExit={onDragExit} onDragOver={onDragOver} onDrop={onDrop} isDragged={isDragged} imgsArray={imgsArray} onClick={(event) => onClose(event)} className="wrapper">
    
      {isDragged && <DragText>drop it here :)</DragText>}

      {imgsArray.length && (
        <ImgsList>
          <Button onFunc={() => setImgsArray([])} label="Remove" />
          <Imgs>
            {imgsArray.map((pic, i) => (
              <ImgDiv onClick={() => onRemoveImg(i)} key={i}>
                <RemoveImage>🗙</RemoveImage>
                <StyledImg src={pic} alt=""/>
              </ImgDiv>
            ))}
          </Imgs>
          <Button onFunc={onSubmit} label="Submit" />
        </ImgsList>
      )}
    </Wrapper>
  );
}

export default DragAndDropUpload;
