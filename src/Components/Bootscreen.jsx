import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
const BOOT_STEPS = [
  "Starting Windows 95...",
  "Loading system files...",
  "Initializing hardware...",
  "Loading your portfolio...",
  "Almost ready...",
];

function BootScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(true);  

  useEffect(() => {
    // Show logo for 1.5s then start loading
    const logoTimer = setTimeout(() => setShowLogo(false), 1500);
    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (showLogo) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 2;

        // Update step text based on progress
        const step = Math.floor((next / 100) * BOOT_STEPS.length);
        setStepIndex(Math.min(step, BOOT_STEPS.length - 1));

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 600);
        }

        return Math.min(next, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [showLogo, onFinish]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "ms_sans_serif, sans-serif",
      }}
    >
      {showLogo ? (
        /* Windows 95 Logo screen */
        <div style={{ textAlign: "center", animation: "fadein 0.5s ease" }}>
          <div
            style={{
              fontSize: "64px",
              marginBottom: "16px",
            }}
          >
            <img
              src={logo}
              alt="Windows 95 Logo"
              style={{ width: "64px", height: "64px", margin: "0 auto" }}
            />
          </div>
          <div
            style={{
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            Windows
            <span style={{ color: "#00adef", marginLeft: "10px" }}>95</span>
          </div>
          <div
            style={{
              color: "#888",
              fontSize: "13px",
              marginTop: "8px",
              letterSpacing: "4px",
            }}
          >
            PORTFOLIO EDITION
          </div>
        </div>
      ) : (
        /* Loading screen */
        <div style={{ width: "340px", textAlign: "center" }}>
          {/* Logo small */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ fontSize: "36px" }}>
              <img
                src={logo}
                alt="Windows 95 Logo"
                style={{ width: "64px", height: "64px", margin: "0 auto" }}
              />
            </div>
            <div
              style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
            >
              Windows <span style={{ color: "#00adef" }}>95</span>
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: "100%",
              height: "20px",
              border: "2px solid #444",
              background: "#111",
              marginBottom: "12px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Segmented blocks like real Win95 */}
            <div
              style={{
                display: "flex",
                height: "100%",
                gap: "2px",
                padding: "2px",
              }}
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background:
                      i < Math.floor(progress / 5) ? "#00adef" : "transparent",
                    transition: "background 0.1s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Step text */}
          <div
            style={{
              color: "#888",
              fontSize: "12px",
              letterSpacing: "1px",
              minHeight: "20px",
            }}
          >
            {BOOT_STEPS[stepIndex]}
          </div>

          {/* Progress % */}
          <div
            style={{
              color: "#555",
              fontSize: "11px",
              marginTop: "6px",
            }}
          >
            {progress}%
          </div>
        </div>
      )}

      {/* Copyright */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          color: "#333",
          fontSize: "11px",
          textAlign: "center",
        }}
      >
        © 1995 AKSH GUPTA. All rights reserved.
        <br />
        Built with React95 + ❤️
      </div>
    </div>
  );
}

export default BootScreen;
