import React, { useState, useRef } from 'react';
import { usePopper } from 'react-popper';

import Panel from './Panel';

const Editor = () => {
  const [canvasWidth, setCanvasWidth] = useState(16);
  const [canvasHeight, setCanvasHeight] = useState(16);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideCanvas, setHideCanvas] = useState(true);
  const [buttonText, setButtonText] = useState("Start Drawing");
  const [selectedColor, setSelectedColor] = useState("#0d00ff");
  const [colorInput, setColorInput] = useState("#0d00ff");
  const [colorHistory, setColorHistory] = useState(Array(10).fill("#ffffff"));
  const [resetKey, setResetKey] = useState(0);
  const canvasRef = useRef(null);
  

  // Function to validate and set canvas width and height
  const validateCanvasSize = (value, setValue) => {
    const validValue = Math.max(1, Math.min(100, value)); // Ensure the value is between 1 and 100
    setValue(validValue);
  };

  const initializeCanvas = () => {
    setHideOptions(!hideOptions);
    setHideCanvas(!hideCanvas);
    setButtonText(prev => (prev === "Start Drawing" ? "Reset" : "Start Drawing"));
  };

  const handleWidthChange = (e) => {
    const newWidth = Number(e.target.value);
    validateCanvasSize(newWidth, setCanvasWidth);
  };

  const handleHeightChange = (e) => {
    const newHeight = Number(e.target.value);
    validateCanvasSize(newHeight, setCanvasHeight);
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setColorInput(color);
    setSelectedColor(color);
  };

  const updateColorHistory = (color) => {
    setColorHistory(prev => {
      const newHistory = [color, ...prev.filter(c => c !== color)];
      return newHistory.slice(0, 10);
    });
  };

  const handleHistoryClick = (color) => {
    setSelectedColor(color);
    setColorInput(color);
  };
  

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'vibe-canvas.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="editor-container">
      <h1 className="editor-title">Vibe Canvas</h1>
      {hideCanvas && <h2 className="canvas-subtitle">Enter Canvas Size</h2>}

      {hideCanvas && (
        <div className="canvas-options">
          <div className="canvas-option">
            <input
              type="number"
              className="canvas-input"
              value={canvasWidth}
              onChange={handleWidthChange}
            />
            <span className="canvas-label">Width</span>
          </div>

          <div className="canvas-option">
            <input
              type="number"
              className="canvas-input"
              value={canvasHeight}
              onChange={handleHeightChange}
            />
            <span className="canvas-label">Height</span>
          </div>
        </div>
      )}

      <button onClick={initializeCanvas} className="canvas-button">
        {buttonText}
      </button>

      {hideOptions && (
        <div className="hex-color-section">
          <input
            type="color"
            className="hex-color-picker"
            value={colorInput}
            onChange={handleColorChange}
          />
          <span className="hex-label">{colorInput.toUpperCase()}</span>

          <div className="color-history-bar">
            {colorHistory.map((color, index) => (
              <div
                key={index}
                className="color-history-block"
                style={{ backgroundColor: color }}
                onClick={() => handleHistoryClick(color)}
              />
            ))}
          </div>
        </div>
      )}

      {!hideCanvas && (
        <>
          <Panel
            key={resetKey}
            width={canvasWidth}
            height={canvasHeight}
            selectedColor={selectedColor}
            updateColorHistory={updateColorHistory}
            canvasRef={canvasRef}
          />
          <div className="canvas-actions">
            <button onClick={handleClearCanvas} className="clear-canvas-button">
              Clear Canvas
            </button>
            <button onClick={handleDownload} className="download-canvas-button">
              Download PNG
            </button>
          </div>
        </>
      )}

      <p>by <a style={{color: 'white'}} href="https://github.com/aurindumgit">@aurindumgit</a> </p>
    </div>
  );
};

export default Editor;
