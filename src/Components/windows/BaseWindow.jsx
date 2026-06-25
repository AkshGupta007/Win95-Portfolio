import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { Window, WindowHeader, WindowContent, Button } from "react95";
import { useClickSound } from "../../hooks/UseSound";

function BaseWindow({
  title,
  onClose,
  onMinimize,
  children,
  width = "400px",
  top = "100px",
  left = "150px",
}) {
  const nodeRef = useRef(null);
  const [maximized, setMaximized] = useState(false);
  const playClickSound = useClickSound();

  const handleClose = () => {
    playClickSound();
    onClose();
  };

  const handleMinimize = () => {
    playClickSound();
    onMinimize?.();
  };

  const handleMaximize = () => {
    playClickSound();
    setMaximized((current) => !current);
  };

  const frameStyle = maximized
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
        width: "100vw",
        height: "calc(100vh - 40px)",
      }
    : {
        position: "absolute",
        top,
        left,
        zIndex: 10,
        width,
      };

  return (
    <Draggable handle=".window-header" nodeRef={nodeRef} disabled={maximized}>
      <div ref={nodeRef} style={frameStyle}>
        <Window style={{ width: "100%", height: maximized ? "100%" : "auto" }}>
          <WindowHeader
            className="window-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: maximized ? "default" : "grab",
              gap: "8px",
            }}
          >
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </span>

            <div style={{ display: "flex", gap: "2px", marginLeft: "auto" }}>
              <Button
                onClick={handleMinimize}
                style={{ width: "22px", height: "22px", padding: 0 }}
                title="Minimize"
              >
                _
              </Button>
              <Button
                onClick={handleMaximize}
                style={{ width: "22px", height: "22px", padding: 0 }}
                title={maximized ? "Restore" : "Maximize"}
              >
                {maximized ? "R" : "[]"}
              </Button>
              <Button
                onClick={handleClose}
                style={{
                  width: "22px",
                  height: "22px",
                  padding: 0,
                  fontWeight: "bold",
                }}
                title="Close"
              >
                x
              </Button>
            </div>
          </WindowHeader>

          <WindowContent
            style={{
              height: maximized ? "calc(100% - 34px)" : "auto",
              overflow: maximized ? "auto" : "visible",
            }}
          >
            {children}
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}

export default BaseWindow;
