import React, { useRef, useState, useEffect } from "react";
import { Button } from "react95";
import BaseWindow from "./BaseWindow";

const COLORS = [
  "#000000",
  "#ffffff",
  "#808080",
  "#c0c0c0",
  "#cc0000",
  "#ff6666",
  "#cc6600",
  "#ffaa00",
  "#cccc00",
  "#ffff00",
  "#006600",
  "#00cc00",
  "#006666",
  "#00cccc",
  "#000080",
  "#0000ff",
  "#660066",
  "#cc00cc",
  "#8B4513",
  "#f4a460",
];

const TOOLS = [
  { id: "pencil", icon: "✏️", label: "Pencil" },
  { id: "eraser", icon: "⬜", label: "Eraser" },
  { id: "fill", icon: "🪣", label: "Fill" },
];

const SIZES = [2, 4, 8, 14];

function PaintWindow({ onClose, onMinimize }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("pencil");
  const [size, setSize] = useState(4);
  const lastPos = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const fill = (startX, startY, fillColor) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const idx = (startY * canvas.width + startX) * 4;
    const targetR = data[idx];
    const targetG = data[idx + 1];
    const targetB = data[idx + 2];

    const hex = fillColor.replace("#", "");
    const fillR = parseInt(hex.slice(0, 2), 16);
    const fillG = parseInt(hex.slice(2, 4), 16);
    const fillB = parseInt(hex.slice(4, 6), 16);

    if (targetR === fillR && targetG === fillG && targetB === fillB) return;

    const stack = [[startX, startY]];
    const match = (i) =>
      Math.abs(data[i] - targetR) < 30 &&
      Math.abs(data[i + 1] - targetG) < 30 &&
      Math.abs(data[i + 2] - targetB) < 30;

    while (stack.length) {
      const [x, y] = stack.pop();
      const i = (y * canvas.width + x) * 4;
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
      if (!match(i)) continue;
      data[i] = fillR;
      data[i + 1] = fillG;
      data[i + 2] = fillB;
      data[i + 3] = 255;
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const startDraw = (e) => {
    const pos = getPos(e);
    if (tool === "fill") {
      fill(Math.floor(pos.x), Math.floor(pos.y), color);
      return;
    }
    setDrawing(true);
    lastPos.current = pos;
  };

  const draw = (e) => {
    if (!drawing || tool === "fill") return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? size * 4 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    lastPos.current = pos;
  };

  const stopDraw = () => {
    setDrawing(false);
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "my-drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <BaseWindow
      title="🎨 Paint"
      onClose={onClose}
      onMinimize={onMinimize}
      width="580px"
      top="60px"
      left="120px"
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
          padding: "4px",
          borderBottom: "1px solid #808080",
          marginBottom: "4px",
          flexWrap: "wrap",
        }}
      >
        {/* Tools */}
        {TOOLS.map((t) => (
          <Button
            key={t.id}
            onClick={() => setTool(t.id)}
            active={tool === t.id}
            title={t.label}
            style={{ padding: "4px 8px", fontSize: "16px" }}
          >
            {t.icon}
          </Button>
        ))}

        <div
          style={{
            width: "1px",
            background: "#808080",
            height: "28px",
            margin: "0 4px",
          }}
        />

        {/* Brush sizes */}
        {SIZES.map((s) => (
          <div
            key={s}
            onClick={() => setSize(s)}
            style={{
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: size === s ? "2px inset #808080" : "2px outset #c0c0c0",
              background: "#c0c0c0",
            }}
          >
            <div
              style={{
                width: s + 2,
                height: s + 2,
                borderRadius: "50%",
                background: "#000000",
              }}
            />
          </div>
        ))}

        <div
          style={{
            width: "1px",
            background: "#808080",
            height: "28px",
            margin: "0 4px",
          }}
        />

        {/* Actions */}
        <Button onClick={clearCanvas} style={{ fontSize: "12px" }}>
          🗑️ Clear
        </Button>
        <Button onClick={saveCanvas} style={{ fontSize: "12px" }}>
          💾 Save
        </Button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={540}
        height={340}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        style={{
          display: "block",
          cursor:
            tool === "eraser"
              ? "cell"
              : tool === "fill"
                ? "crosshair"
                : "crosshair",
          border: "2px inset #808080",
        }}
      />

      {/* Color palette */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          padding: "4px",
          borderTop: "1px solid #808080",
          marginTop: "4px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Current color preview */}
        <div
          style={{
            width: "32px",
            height: "32px",
            background: color,
            border: "3px inset #808080",
            marginRight: "6px",
            flexShrink: 0,
          }}
        />

        {/* Colors */}
        {COLORS.map((c) => (
          <div
            key={c}
            onClick={() => setColor(c)}
            style={{
              width: "18px",
              height: "18px",
              background: c,
              border: color === c ? "3px inset #000000" : "1px solid #808080",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </BaseWindow>
  );
}

export default PaintWindow;
