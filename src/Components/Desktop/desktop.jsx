import React, { useState } from "react";
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

function Desktop({ openWindow, wallpaperStyle }) {
  const [contextMenu, setContextMenu] = useState(null);

  const handleRightClick = (e) => {
    e.preventDefault(); // block default browser menu
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onContextMenu={handleRightClick}
      style={{
        width: "100vw",
        height: "calc(100vh - 40px)",
        ...wallpaperStyle,
        position: "relative",
        padding: "16px",

        display: "grid",
        gridAutoFlow: "column",
        gridTemplateRows: "repeat(7, 90px)",
        gap: "9px",

        justifyContent: "start",
        alignContent: "start",
      }}
    >
      {icons.map(({ id, icon, label }) => (
        <DesktopIcon
          key={id}
          icon={icon}
          label={label}
          onDoubleClick={() => openWindow(id)}
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
