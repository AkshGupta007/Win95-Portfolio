import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";
import clickSfx from "../assets/ding.mp3";
import startupSfx from "../assets/windows-xp-startup.mp3";
import shutdownSfx from "../assets/windows-shutdown_lWRhnkD.mp3";

const CLICK_MUTE_KEY = "portfolio-click-sound-muted";
const CLICK_MUTE_EVENT = "portfolio-click-sound-muted-change";

function getSavedClickMute() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CLICK_MUTE_KEY) === "true";
}

export function setClickSoundMuted(muted) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CLICK_MUTE_KEY, String(muted));
  window.dispatchEvent(
    new CustomEvent(CLICK_MUTE_EVENT, { detail: { muted } }),
  );
}

export function useClickSoundMuted() {
  const [muted, setMuted] = useState(getSavedClickMute);

  useEffect(() => {
    const handleMuteChange = (event) => {
      setMuted(event.detail?.muted ?? getSavedClickMute());
    };

    window.addEventListener(CLICK_MUTE_EVENT, handleMuteChange);
    return () => window.removeEventListener(CLICK_MUTE_EVENT, handleMuteChange);
  }, []);

  const updateMuted = useCallback((nextMuted) => {
    setClickSoundMuted(nextMuted);
  }, []);

  return [muted, updateMuted];
}

export function useClickSound(options = {}) {
  const [muted] = useClickSoundMuted();
  const [play] = useSound(clickSfx, { volume: 0.5 });

  return useCallback(() => {
    if (muted || options.muted) return;
    play();
  }, [muted, options.muted, play]);
}

export function useStartupSound() {
  const [play] = useSound(startupSfx, { volume: 0.5 });
  return play;
}

export function useShutdownSound() {
  const [play] = useSound(shutdownSfx, { volume: 1 });
  return play;
}
