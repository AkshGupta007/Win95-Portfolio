import { useState } from "react";
import { Button, Toolbar, AppBar } from "react95";
import Clock from "./Clock";
import StartMenu from "./Startmenu";
import { useClickSound, useClickSoundMuted } from "../../hooks/UseSound";
import logo from "../../assets/logo.png";

const WINDOW_LABELS = {
  about: "About Me",
  projects: "Projects",
  skills: "Skills",
  contact: "Contact",
  chess: "Chess",
  chrome: "Browser",
  wallpaper: "Wallpaper",
  cmd: "cmd.exe",
  paint: "Paint",
  calculator: "Calculator",
};

function Taskbar({
  openWindow,
  windows,
  minimizedWindows = {},
  closeWindow,
  onShutdown,
}) {
  const [startOpen, setStartOpen] = useState(false);
  const [clickMuted, setClickMuted] = useClickSoundMuted();
  const playClick = useClickSound();
  const openWindows = Object.entries(windows).filter(([, isOpen]) => isOpen);

  const handleStart = () => {
    playClick();
    setStartOpen((s) => !s);
  };

  return (
    <>
      {startOpen && (
        <StartMenu
          openWindow={openWindow}
          onClose={() => setStartOpen(false)}
          onShutdown={onShutdown}
        />
      )}

      <AppBar style={{ bottom: 0, top: "auto", position: "fixed" }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 4px",
            gap: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
              minWidth: 0,
              overflowX: "auto",
              overflowY: "hidden",
              flex: 1,
            }}
          >
            <Button
              onClick={handleStart}
              active={startOpen}
              style={{ fontWeight: "bold", flex: "0 0 auto" }}
            >
              <img
                src={logo}
                alt="Start"
                width={23}
                height={23}
                style={{ marginRight: "4px" }}
              />
              Start
            </Button>

            {openWindows.map(([name]) => {
              const label = WINDOW_LABELS[name] ?? name;

              return (
                <div key={name} style={{ display: "flex", flex: "0 0 auto" }}>
                  <Button
                    active={!minimizedWindows[name]}
                    onClick={() => {
                      playClick();
                      openWindow(name);
                    }}
                    style={{
                      borderRight: "none",
                      maxWidth: "170px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={label}
                  >
                    {label}
                  </Button>
                  <Button
                    onClick={() => {
                      playClick();
                      closeWindow(name);
                    }}
                    style={{ padding: "0 6px", fontWeight: "bold" }}
                    title={`Close ${label}`}
                  >
                    x
                  </Button>
                </div>
              );
            })}
          </div>

          <Button
            active={clickMuted}
            onClick={() => setClickMuted(!clickMuted)}
            style={{
              flex: "0 0 auto",
              minWidth: "72px",
              fontWeight: clickMuted ? "bold" : "normal",
            }}
            title={clickMuted ? "Unmute click sound" : "Mute click sound"}
          >
            {clickMuted ? "Muted" : "Sound"}
          </Button>

          <Clock />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Taskbar;
