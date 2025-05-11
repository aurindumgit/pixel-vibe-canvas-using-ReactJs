import React, { useState, useEffect } from 'react';

const Pixel = ({ selectedColor, updateColorHistory }) => {
  const [pixelColor, setPixelColor] = useState("#ffffff");
  const [isMouseDown, setIsMouseDown] = useState(false);

  const applyColor = () => {
    setPixelColor(selectedColor);
    updateColorHistory(selectedColor);
  };

  const handleMouseEnter = () => {
    if (isMouseDown) {
      applyColor();
    }
  };

  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      className="pixel"
      style={{ backgroundColor: pixelColor }}
      onClick={applyColor}
      onMouseEnter={handleMouseEnter}
    ></div>
  );
};

export default Pixel;
