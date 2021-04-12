import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;

  font-size: 0.8rem;
`;

const CardTagsBox = ({tags}) => {

  const tagsString = [...tags].sort().join(', ')

  return (
    <Wrapper>
      <span>{tagsString}</span>
    </Wrapper>
  );
}

export default CardTagsBox;
