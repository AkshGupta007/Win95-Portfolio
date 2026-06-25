import React from "react";
import { Separator } from "react95";
import BaseWindow from "./BaseWindow";
import wallpapers from "../data/wallpapers";

function WallpaperWindow({ onClose, onMinimize, currentWallpaper, onSelect }) {
  return (
    <BaseWindow
      title="🖼️ Change Wallpaper"
      onClose={onClose}
      onMinimize={onMinimize}
      width="420px"
      top="120px"
      left="250px"
    >
      <p style={{ fontSize: "13px", marginBottom: "12px", color: "#444" }}>
        Select a wallpaper for your desktop:
      </p>

      <Separator />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "12px",
        }}
      >
        {wallpapers.map((wp) => (
          <div
            key={wp.id}
            onClick={() => onSelect(wp.id)}
            style={{
              cursor: "pointer",
              border:
                currentWallpaper === wp.id
                  ? "3px solid #000080"
                  : "3px solid transparent",
              borderRadius: "2px",
            }}
          >
            {/* Preview box */}
            <div
              style={{
                height: "70px",
                ...wp.style,
                border: "1px solid #808080",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Mini taskbar preview */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "8px",
                  background: "#c0c0c0",
                  borderTop: "1px solid #808080",
                }}
              />
              {currentWallpaper === wp.id && (
                <span style={{ fontSize: "18px" }}>✓</span>
              )}
            </div>

            {/* Label */}
            <div
              style={{
                fontSize: "11px",
                textAlign: "center",
                marginTop: "4px",
                padding: "2px",
                background:
                  currentWallpaper === wp.id ? "#000080" : "transparent",
                color: currentWallpaper === wp.id ? "white" : "black",
              }}
            >
              {wp.label}
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
        💡 Double-click an icon or right-click desktop to open windows
      </div>
    </BaseWindow>
  );
}

export default WallpaperWindow;
