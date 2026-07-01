import { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Window, WindowHeader, WindowContent, Button } from "react95";
import { useClickSound } from "../../hooks/UseSound";

const MOBILE_BREAKPOINT = 768;

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
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth <= MOBILE_BREAKPOINT
      : false,
  );
  const playClickSound = useClickSound();

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Mobile windows now start smaller (not forced fullscreen) so dragging
  // is actually meaningful. Maximize still goes fullscreen on any device.
  const getFrameStyle = () => {
    if (maximized) {
      return {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
        width: "100vw",
        height: "calc(100vh - 40px)",
      };
    }

    if (isMobile) {
      return {
        position: "absolute",
        top: "8vw",
        left: "3vw",
        zIndex: 10,
        width: "90vw",
        maxHeight: "calc(100vh - 40px - 16vw)",
      };
    }

    return {
      position: "absolute",
      top,
      left,
      zIndex: 10,
      width,
    };
  };

  const frameStyle = getFrameStyle();
  const buttonSize = isMobile ? "32px" : "22px";

  const buttonStyle = {
    width: buttonSize,
    height: buttonSize,
    padding: 0,
    touchAction: "manipulation",
    fontSize: isMobile ? "16px" : "inherit",
  };

  return (
    <Draggable
      handle=".window-header"
      cancel=".window-header button"
      nodeRef={nodeRef}
      disabled={maximized}
      bounds="body"
    >
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
              minHeight: isMobile ? "36px" : "auto",
              // Critical for real touch devices: without this, the browser
              // treats the drag gesture as a page scroll/pan instead of
              // handing it to react-draggable, so nothing visibly moves.
              touchAction: "none",
            }}
          >
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: isMobile ? "14px" : "inherit",
              }}
            >
              {title}
            </span>

            <div
              style={{
                display: "flex",
                gap: isMobile ? "4px" : "2px",
                marginLeft: "auto",
              }}
            >
              <Button
                onClick={handleMinimize}
                style={buttonStyle}
                title="Minimize"
              >
                _
              </Button>
              <Button
                onClick={handleMaximize}
                style={buttonStyle}
                title={maximized ? "Restore" : "Maximize"}
              >
                {maximized ? "R" : "[]"}
              </Button>
              <Button
                onClick={handleClose}
                style={{ ...buttonStyle, fontWeight: "bold" }}
                title="Close"
              >
                x
              </Button>
            </div>
          </WindowHeader>

          <WindowContent
            style={{
              height: maximized ? "calc(100% - 34px)" : "auto",
              maxHeight:
                isMobile && !maximized
                  ? "calc(100vh - 40px - 16vw - 40px)"
                  : undefined,
              overflow: maximized || isMobile ? "auto" : "visible",
              WebkitOverflowScrolling: "touch",
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
