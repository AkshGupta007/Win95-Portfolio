import React, { useState, useEffect, useRef } from "react";
import DesktopIcon from "./desktopicons";
import ContextMenu from "../windows/ContextMenu";
import cmd from "../../assets/cmd.png";
import computer from "../../assets/computer.png";
import folder from "../../assets/folder.png";

const icons = [
  { id: "about", icon: computer, label: "About Me" },
  { id: "projects", icon: folder, label: "Projects" },
  { id: "skills", icon: "⚙️", label: "Skills" },
  { id: "contact", icon: "📬", label: "Contact" },
  { id: "chess", icon: "♟️", label: "Chess" },
  { id: "chrome", icon: "🌐", label: "Browser" },
  { id: "cmd", icon: cmd, label: "cmd.exe" },
  { id: "calculator", icon: "🧮", label: "Calculator" },
  { id: "paint", icon: "🎨", label: "Paint" },
];

const LONG_PRESS_DELAY = 500; // ms to hold before context menu opens
const MOVE_THRESHOLD = 12; // px of finger drift still considered a "tap"

function Desktop({ openWindow, wallpaperStyle }) {
  const [contextMenu, setContextMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );

  const longPressTimerRef = useRef(null);
  const touchStartPosRef = useRef({ x: 0, y: 0 });
  const longPressFiredRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRightClick = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const distanceFromStart = (touch) => {
    const dx = touch.clientX - touchStartPosRef.current.x;
    const dy = touch.clientY - touchStartPosRef.current.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
    longPressFiredRef.current = false;

    longPressTimerRef.current = setTimeout(() => {
      longPressFiredRef.current = true;
      setContextMenu({ x: touch.clientX, y: touch.clientY });
    }, LONG_PRESS_DELAY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (
      distanceFromStart(touch) > MOVE_THRESHOLD &&
      longPressTimerRef.current
    ) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleTouchEndDesktopBg = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleIconTouchEnd = (id) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // If the long-press context menu already fired during this touch,
    // don't also open the window.
    if (longPressFiredRef.current) {
      longPressFiredRef.current = false;
      return;
    }

    const touch = e.changedTouches[0];
    if (distanceFromStart(touch) <= MOVE_THRESHOLD) {
      openWindow(id);
    }
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEndDesktopBg : undefined}
      style={{
        width: "100vw",
        height: "calc(100vh - 40px)",
        ...wallpaperStyle,
        position: "relative",
        padding: isMobile ? "10px" : "16px",
        boxSizing: "border-box",
        overflow: "hidden",
        touchAction: "manipulation",

        display: "grid",
        gridAutoFlow: isMobile ? "row" : "column",
        gridTemplateColumns: isMobile
          ? "repeat(auto-fill, minmax(70px, 1fr))"
          : "none",
        gridTemplateRows: isMobile ? "none" : "repeat(7, 90px)",
        gap: isMobile ? "6px" : "9px",

        justifyContent: "start",
        alignContent: "start",
      }}
    >
      {icons.map(({ id, icon, label }) => (
        <DesktopIcon
          key={id}
          icon={icon}
          label={label}
          compact={isMobile}
          onDoubleClick={() => openWindow(id)}
          onTouchEnd={isMobile ? handleIconTouchEnd(id) : undefined}
        />
      ))}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          openWindow={openWindow}
        />
      )}
    </div>
  );
}

export default Desktop;
