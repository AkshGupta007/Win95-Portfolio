// BaseWindow.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import Draggable from "react-draggable";
import { Window, WindowHeader, WindowContent, Button } from "react95";
import { useClickSound } from "../../hooks/UseSound";

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const touch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(Boolean(touch));
  }, []);
  return isTouch;
}

export default function BaseWindow({
  title,
  onClose,
  onMinimize,
  children,
  width = "420px",
  top = "100px",
  left = "150px",
  modal = false,
}) {
  const nodeRef = useRef(null);
  const [maximized, setMaximized] = useState(false);
  const [open, setOpen] = useState(true);
  const [allowTouchDrag, setAllowTouchDrag] = useState(false);
  const [isSmall, setIsSmall] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 640 : false,
  );
  const isTouch = useIsTouchDevice();
  const playClick = useClickSound();
  const longPressTimer = useRef(null);

  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth <= 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (open && modal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, modal]);

  const safePlay = useCallback(() => {
    if (typeof playClick === "function") playClick();
  }, [playClick]);

  const handleClose = useCallback(() => {
    safePlay();
    setOpen(false);
    onClose?.();
  }, [safePlay, onClose]);

  const handleMinimize = useCallback(() => {
    safePlay();
    onMinimize?.();
  }, [safePlay, onMinimize]);

  const handleMaximize = useCallback(() => {
    safePlay();
    setMaximized((s) => !s);
  }, [safePlay]);

  // overlay click closes when modal or small screen
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && (modal || isSmall)) handleClose();
  };

  // keyboard escape closes
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  // Long press to enable drag on touch devices
  const onTouchStartHeader = () => {
    if (!isTouch) return;
    longPressTimer.current = setTimeout(() => {
      setAllowTouchDrag(true);
    }, 300);
  };

  const onTouchEndHeader = () => {
    if (!isTouch) return;
    clearTimeout(longPressTimer.current);
    // keep allowTouchDrag true for a short time so user can drag
    setTimeout(() => setAllowTouchDrag(false), 1200);
  };

  const frameStyle =
    maximized || isSmall
      ? {
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isSmall ? "8px" : 0,
        }
      : {
          position: "absolute",
          top,
          left,
          zIndex: 1000,
          width,
        };

  if (!open) return null;

  return (
    <div
      onClick={handleOverlayClick}
      onTouchStart={handleOverlayClick}
      style={{
        position: maximized || isSmall ? "fixed" : "absolute",
        inset: maximized || isSmall ? 0 : "auto",
        zIndex: 999,
        background: maximized || isSmall ? "rgba(0,0,0,0.25)" : "transparent",
        display: "block",
      }}
    >
      <Draggable
        handle=".window-header"
        nodeRef={nodeRef}
        disabled={maximized || (isTouch && !allowTouchDrag)}
        bounds="parent"
        cancel=".no-drag"
      >
        <div
          ref={nodeRef}
          style={{
            ...frameStyle,
            pointerEvents: "auto",
            touchAction: "manipulation",
          }}
          role="dialog"
          aria-label={title}
        >
          <Window
            style={{ width: "100%", height: maximized ? "100%" : "auto" }}
          >
            <WindowHeader
              className="window-header no-drag"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                cursor: maximized ? "default" : "grab",
                userSelect: "none",
                paddingRight: "6px",
              }}
              onTouchStart={onTouchStartHeader}
              onTouchEnd={onTouchEndHeader}
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

              <div style={{ display: "flex", gap: "6px", marginLeft: "auto" }}>
                <Button
                  onClick={handleMinimize}
                  style={{ width: "22px", height: "22px", padding: 0 }}
                  title="Minimize"
                  aria-label="Minimize"
                >
                  _
                </Button>

                <Button
                  onClick={handleMaximize}
                  style={{ width: "22px", height: "22px", padding: 0 }}
                  title={maximized ? "Restore" : "Maximize"}
                  aria-label={maximized ? "Restore" : "Maximize"}
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
                  aria-label="Close"
                >
                  x
                </Button>
              </div>
            </WindowHeader>

            <WindowContent
              style={{
                height: maximized ? "calc(100% - 34px)" : "auto",
                overflow: maximized ? "auto" : "visible",
                touchAction: "manipulation",
              }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {children}
            </WindowContent>
          </Window>
        </div>
      </Draggable>
    </div>
  );
}
