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

function Desktop({ openWindow, wallpaperStyle }) {
  const [contextMenu, setContextMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );

  const longPressTimerRef = useRef(null);
  const touchMovedRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRightClick = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e) => {
    touchMovedRef.current = false;
    const touch = e.touches[0];
    const { clientX, clientY } = touch;

    longPressTimerRef.current = setTimeout(() => {
      if (!touchMovedRef.current) {
        setContextMenu({ x: clientX, y: clientY });
      }
    }, LONG_PRESS_DELAY);
  };

  const handleTouchMove = () => {
    touchMovedRef.current = true;
    if (longPressTimerRef.current) {
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

  // Mobile convention: a single tap opens the app, same as any phone home
  // screen. No double-tap requirement — that was desktop-only behavior
  // that doesn't belong here.
  const handleIconTouchEnd = (id) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (!touchMovedRef.current) {
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
