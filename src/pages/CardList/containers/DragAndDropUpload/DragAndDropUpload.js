import React, { useState } from 'react';

// import styled from 'styled-components';

// const Wrapper = styled.div`
//   position: relative;
// `;

const dropAreaImageStyle = {
  width,
  height
};

const dropAreaStyle = {
  ...dropAreaImageStyle,
  border: borderStyle
};

const DragAndDropUpload = () => {

  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);

  const onDrop = e => {
    e.preventDefault();

    const {
      dataTransfer: { files }
    } = e;
    console.log("Files: ", files);
    const { length } = files;
    const reader = new FileReader();
    if (length === 0) {
      return false;
    }
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const { size, type } = files[0];
    setData(false);
    if (!fileTypes.includes(type)) {
      setErr("File format must be either png or jpg");
      return false;
    }
    if (size / 1024 / 1024 > 2) {
      setErr("File size exceeded the limit of 2MB");
      return false;
    }
    setErr(false);

    reader.readAsDataURL(files[0]);
    reader.onload = loadEvt => {
      setData(loadEvt.target.result);
    };
  };
  const onDragStart = e => {
    e.preventDefault();
  };
  const onDragOver = e => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <div
        style={dropAreaStyle}
        onDrop={e => onDrop(e)}
        onDragOver={e => onDragOver(e)}
      >
        {data && <img style={dropAreaImageStyle} src={data} />}
      </div>

      <div className="button-wrapper">
        {data && <button onClick={() => setData(false)}>Remove</button>}
      </div>
    </Wrapper>
  );
}

export default DragAndDropUpload;
