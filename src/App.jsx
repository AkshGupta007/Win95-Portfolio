import { useCallback, useEffect, useRef, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

// import Desktop from "./Components/Desktop/desktop";
import WindowManager from "./Components/shared/WindowManager";
import BootScreen from "./Components/Bootscreen";
import ShutdownScreen from "./Components/ShutdownScreen";
import BSOD from "./Components/BSOD";
import { useShutdownSound, useStartupSound } from "./hooks/UseSound";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal;
  }
  body {
    font-family: 'ms_sans_serif';
    margin: 0;
    padding: 0;
    background: #008080;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  #root {
    height: 100vh;
    width: 100vw;
  }
`;

function App() {
  const [booted, setBooted] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [bsod, setBsod] = useState(false);
  const hasPlayedLoginSound = useRef(false);
  const playStartupSound = useStartupSound();
  const playShutdownSound = useShutdownSound();

  const playLoginSound = useCallback(() => {
    if (hasPlayedLoginSound.current) return;
    hasPlayedLoginSound.current = true;
    playStartupSound();
  }, [playStartupSound]);

  useEffect(() => {
    const handleBsod = () => setBsod(true);
    window.addEventListener("trigger-bsod", handleBsod);
    return () => window.removeEventListener("trigger-bsod", handleBsod);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => playLoginSound();

    window.addEventListener("pointerdown", handleFirstInteraction, {
      once: true,
    });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [playLoginSound]);

  const handleShutdown = () => {
    playShutdownSound();
    setShutdown(true);
  };

  const handleRestart = () => {
    setShutdown(false);
    setBooted(false); // replays boot screen
    hasPlayedLoginSound.current = false;
    playLoginSound();
  };

  const handleBsodDismiss = () => {
    setBsod(false);
    setBooted(false); // replays boot screen after BSOD
    hasPlayedLoginSound.current = false;
    playLoginSound();
  };

  return (
    <div>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        {/* BSOD overlays everything */}
        {bsod && <BSOD onDismiss={handleBsodDismiss} />}

        {!bsod && shutdown ? (
          <ShutdownScreen onCancel={handleRestart} />
        ) : !bsod && !booted ? (
          <BootScreen onFinish={() => setBooted(true)} />
        ) : (
          !bsod && <WindowManager onShutdown={handleShutdown} />
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
