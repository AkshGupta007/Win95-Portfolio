import { useState } from "react";

import Desktop from "../Desktop/desktop";
import Taskbar from "../taskbar/taskbar";

import AboutWindow from "../windows/AboutWindow";
import ProjectsWindow from "../windows/ProjectsWindow";
import SkillsWindow from "../windows/SkillsWindow";
import ContactWindow from "../windows/ContactWindow";
import ChessWindow from "../windows/ChessWindow";
import ChromeWindow from "../windows/ChromeWindow";
import WallpaperWindow from "../windows/WallpaperWindow";
import CmdWindow from "../windows/cmdWindow";
import PaintWindow from "../windows/PaintWindow";
import CalculatorWindow from "../windows/CalculatorWindow";
import wallpapers from "../data/wallpapers";

function WindowManager({ onShutdown }) {
  const [windows, setWindows] = useState({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    chess: false,
    chrome: false,
    wallpaper: false,
    cmd: false,
    paint: false,
    calculator: false,
  });
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [currentWallpaper, setCurrentWallpaper] = useState("teal");

  const openWindow = (name) => {
    setWindows((currentWindows) => ({ ...currentWindows, [name]: true }));
    setMinimizedWindows((currentWindows) => ({
      ...currentWindows,
      [name]: false,
    }));
  };

  const closeWindow = (name) => {
    setWindows((currentWindows) => ({ ...currentWindows, [name]: false }));
    setMinimizedWindows((currentWindows) => ({
      ...currentWindows,
      [name]: false,
    }));
  };

  const minimizeWindow = (name) => {
    setMinimizedWindows((currentWindows) => ({
      ...currentWindows,
      [name]: true,
    }));
  };

  const wallpaperStyle =
    wallpapers.find((wallpaper) => wallpaper.id === currentWallpaper)?.style ||
    {};

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Desktop openWindow={openWindow} wallpaperStyle={wallpaperStyle} />

      {windows.about && !minimizedWindows.about && (
        <AboutWindow
          onClose={() => closeWindow("about")}
          onMinimize={() => minimizeWindow("about")}
        />
      )}
      {windows.projects && !minimizedWindows.projects && (
        <ProjectsWindow
          onClose={() => closeWindow("projects")}
          onMinimize={() => minimizeWindow("projects")}
        />
      )}
      {windows.skills && !minimizedWindows.skills && (
        <SkillsWindow
          onClose={() => closeWindow("skills")}
          onMinimize={() => minimizeWindow("skills")}
        />
      )}
      {windows.contact && !minimizedWindows.contact && (
        <ContactWindow
          onClose={() => closeWindow("contact")}
          onMinimize={() => minimizeWindow("contact")}
        />
      )}
      {windows.chess && !minimizedWindows.chess && (
        <ChessWindow
          onClose={() => closeWindow("chess")}
          onMinimize={() => minimizeWindow("chess")}
        />
      )}
      {windows.chrome && !minimizedWindows.chrome && (
        <ChromeWindow
          onClose={() => closeWindow("chrome")}
          onMinimize={() => minimizeWindow("chrome")}
        />
      )}
      {windows.cmd && !minimizedWindows.cmd && (
        <CmdWindow
          onClose={() => closeWindow("cmd")}
          onMinimize={() => minimizeWindow("cmd")}
        />
      )}
      {windows.calculator && !minimizedWindows.calculator && (
        <CalculatorWindow
          onClose={() => closeWindow("calculator")}
          onMinimize={() => minimizeWindow("calculator")}
        />
      )}
      {windows.paint && !minimizedWindows.paint && (
        <PaintWindow
          onClose={() => closeWindow("paint")}
          onMinimize={() => minimizeWindow("paint")}
        />
      )}
      {windows.wallpaper && !minimizedWindows.wallpaper && (
        <WallpaperWindow
          onClose={() => closeWindow("wallpaper")}
          onMinimize={() => minimizeWindow("wallpaper")}
          currentWallpaper={currentWallpaper}
          onSelect={(id) => setCurrentWallpaper(id)}
        />
      )}

      <Taskbar
        openWindow={openWindow}
        windows={windows}
        minimizedWindows={minimizedWindows}
        closeWindow={closeWindow}
        onShutdown={onShutdown}
      />
    </div>
  );
}

export default WindowManager;
