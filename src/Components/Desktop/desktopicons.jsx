// DesktopIcon.jsx
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useClickSound } from "../../hooks/UseSound";

function isImageSource(src) {
  if (!src || typeof src !== "string") return false;
  const lower = src.toLowerCase();
  return (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".svg") ||
    lower.startsWith("data:") ||
    lower.includes("/")
  );
}

function DesktopIcon({ icon, label, onDoubleClick }) {
  const playClick = useClickSound();
  const [hover, setHover] = useState(false);

  const handleActivate = useCallback(() => {
    if (typeof playClick === "function") playClick();
    if (typeof onDoubleClick === "function") onDoubleClick();
  }, [playClick, onDoubleClick]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    width: "80px",
    padding: "8px",
    borderRadius: "4px",
    userSelect: "none",
    background: hover ? "rgba(255,255,255,0.12)" : "transparent",
    transition: "background 120ms ease",
  };

  const iconStyle = {
    fontSize: "40px",
    lineHeight: 1,
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const labelStyle = {
    color: "white",
    fontSize: "12px",
    textAlign: "center",
    marginTop: "4px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
    wordBreak: "break-word",
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      onDoubleClick={handleActivate}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={containerStyle}
    >
      <div style={iconStyle}>
        {isImageSource(icon) ? (
          <img
            src={icon}
            alt={label}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            draggable={false}
          />
        ) : (
          <span aria-hidden style={{ fontSize: "40px" }}>
            {icon}
          </span>
        )}
      </div>

      <span style={labelStyle}>{label}</span>
    </div>
  );
}

DesktopIcon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  label: PropTypes.string.isRequired,
  onDoubleClick: PropTypes.func,
};

DesktopIcon.defaultProps = {
  onDoubleClick: () => {},
};

export default DesktopIcon;
