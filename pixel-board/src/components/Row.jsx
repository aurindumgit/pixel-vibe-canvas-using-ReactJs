import React from 'react';
import Pixel from './Pixel';

const Row = ({ width, selectedColor, updateColorHistory }) => {
  const pixels = [];

  for (let i = 0; i < width; i++) {
    pixels.push(
      <Pixel
        key={i}
        selectedColor={selectedColor}
        updateColorHistory={updateColorHistory}
      />
    );
  }

  return <div className="row">{pixels}</div>;
};

export default Row;
