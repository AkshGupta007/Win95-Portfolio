import React from "react";
import { MenuList, MenuListItem, Separator } from "react95";

function StartMenu({ onClose, openWindow , onShutdown }) {
  const handleOpen = (name) => {
    openWindow(name);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        left: "0",
        zIndex: 100,
      }}
    >
      <MenuList style={{ width: "200px" }}>
        {/* Header */}
        <div
          style={{
            background: "#000080",
            color: "white",
            padding: "8px 12px",
            fontSize: "13px",
            fontWeight: "bold",
            letterSpacing: "1px",
            marginBottom: "4px",
          }}
        >
          👨‍💻 Aksh Gupta
        </div>

        <MenuListItem onClick={() => handleOpen("about")}>
          🖥️ About Me
        </MenuListItem>

        <MenuListItem onClick={() => handleOpen("projects")}>
          📁 Projects
        </MenuListItem>

        <MenuListItem onClick={() => handleOpen("skills")}>
          ⚙️ Skills
        </MenuListItem>

        <MenuListItem onClick={() => handleOpen("contact")}>
          📬 Contact
        </MenuListItem>

        <Separator />

        <MenuListItem
          onClick={() => {
            window.open("https://github.com/AkshGupta007", "_blank");
            onClose();
          }}
        >
          👾 GitHub
        </MenuListItem>

        <MenuListItem
          onClick={() => {
            window.open("https://www.linkedin.com/in/akshgupta593/", "_blank");
            onClose();
          }}
        >
          ℹ️ LinkedIn
        </MenuListItem>

        <Separator />

        <MenuListItem
          onClick={() => {
            window.open("/resume.pdf", "_blank");
            onClose();
          }}
        >
          📄 Resume
        </MenuListItem>

        <MenuListItem onClick={() => handleOpen("calculator")}>
          🧮 Calculator
        </MenuListItem>
        <MenuListItem onClick={() => handleOpen("paint")}>
          🎨 Paint
        </MenuListItem>

        <Separator />

        {/* Shutdown */}
        <MenuListItem
          onClick={() => {
            onShutdown();
            onClose();
          }}
          style={{ color: "#cc0000", fontWeight: "bold" }}
        >
          ⏻ Shut Down...
        </MenuListItem>
      </MenuList>
    </div>
  );
}

export default StartMenu;
