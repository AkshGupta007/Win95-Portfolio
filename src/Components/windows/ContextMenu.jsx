import React from "react";
import { MenuList, MenuListItem, Separator } from "react95";

function ContextMenu({ x, y, onClose, openWindow }) {
  const handleClick = (action) => {
    action();
    onClose();
  };

  return (
    <>
      {/* Invisible overlay to catch outside clicks */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 50,
        }}
      />

      {/* Menu */}
      <div
        style={{
          position: "fixed",
          top: y,
          left: x,
          zIndex: 51,
        }}
      >
        <MenuList style={{ width: "200px" }}>
          <MenuListItem onClick={() => handleClick(() => openWindow("about"))}>
            🖥️ About Me
          </MenuListItem>

          <MenuListItem
            onClick={() => handleClick(() => openWindow("projects"))}
          >
            📁 Projects
          </MenuListItem>

          <MenuListItem onClick={() => handleClick(() => openWindow("skills"))}>
            ⚙️ Skills
          </MenuListItem>

          <MenuListItem
            onClick={() => handleClick(() => openWindow("contact"))}
          >
            📬 Contact Me
          </MenuListItem>

          <Separator />

          <MenuListItem
            onClick={() => handleClick(() => window.location.reload())}
          >
            🔄 Refresh
          </MenuListItem>

          <Separator />

          <MenuListItem onClick={() => handleClick(() => openWindow("chrome"))}>
            🌐 Open Browser
          </MenuListItem>

          <MenuListItem
            onClick={() => handleClick(() => openWindow("wallpaper"))}
          >
            🖼️ Change Wallpaper
          </MenuListItem>

          <MenuListItem
            onClick={() => handleClick(() => openWindow("cmd"))}
          >
            🖥️ Open Command Prompt
          </MenuListItem>
        </MenuList>
      </div>
    </>
  );
}

export default ContextMenu;
