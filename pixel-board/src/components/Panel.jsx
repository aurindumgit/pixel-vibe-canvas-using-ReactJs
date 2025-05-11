import React, { useEffect, useRef, useState } from 'react';

const Panel = ({ width, height, selectedColor, updateColorHistory, canvasRef }) => {
  const pixelSize = 20;
  const [isDrawing, setIsDrawing] = useState(false);

  // UseEffect to set up canvas dimensions and draw initial grid
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = width * pixelSize;
    canvas.height = height * pixelSize;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawGrid(ctx); // Draw the grid
  }, [width, height]);

  // Function to draw grid lines
  const drawGrid = (ctx) => {
    ctx.strokeStyle = '#C2C2C2'; // Color for grid lines
    ctx.lineWidth = 0.5;

    // Draw vertical grid lines
    for (let x = 0; x <= width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * pixelSize, 0);
      ctx.lineTo(x * pixelSize, height * pixelSize);
      ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * pixelSize);
      ctx.lineTo(width * pixelSize, y * pixelSize);
      ctx.stroke();
    }
  };

  // Function to draw on the canvas
  const draw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.nativeEvent.clientX - rect.left) / pixelSize);
    const y = Math.floor((e.nativeEvent.clientY - rect.top) / pixelSize);
    ctx.fillStyle = selectedColor;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    updateColorHistory(selectedColor); // Update color history
  };

  // Handle mouse down event (start drawing)
  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e); // Start drawing immediately
  };

  // Handle mouse up event (stop drawing)
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Handle mouse move event (continue drawing)
  const keepDrawing = (e) => {
    if (isDrawing) {
      draw(e); // Continue drawing when mouse is moving
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={keepDrawing}
      onMouseLeave={stopDrawing}
      className="pixel-canvas"
      style={{
        border: '1px solid #ccc',
        marginTop: '20px',
        cursor: 'crosshair',
      }}
    />
  );
};

export default Panel;
