import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const SHUTDOWN_STEPS = [
  "Saving your settings...",
  "Closing programs...",
  "Writing unsaved data to disk...",
  "Shutting down Windows 95...",
];

function ShutdownScreen({ onCancel }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers = SHUTDOWN_STEPS.map((_, i) =>
      setTimeout(() => setStep(i), i * 1200),
    );

    const doneTimer = setTimeout(() => {
      setDone(true);
    }, SHUTDOWN_STEPS.length * 1200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#000080",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: "ms_sans_serif, sans-serif",
      }}
    >
      {!done ? (
        /* Shutting down screen */
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "24px" }}>
            <img src={logo} alt="Windows 95 Logo" style={{ width: "64px", height: "64px", margin: "0 auto" }} />
          </div>

          <div
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "32px",
            }}
          >
            Windows 95
          </div>

          {/* Step messages */}
          <div
            style={{
              background: "#000066",
              border: "2px solid #4444ff",
              padding: "20px 40px",
              marginBottom: "24px",
              minWidth: "320px",
            }}
          >
            {SHUTDOWN_STEPS.map((s, i) => (
              <div
                key={i}
                style={{
                  color: i <= step ? "#ffffff" : "#555599",
                  fontSize: "13px",
                  padding: "4px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "color 0.3s",
                }}
              >
                <span>{i <= step ? "✓" : "○"}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>

          {/* Loading dots */}
          <div style={{ color: "#8888ff", fontSize: "12px" }}>
            Please wait{".".repeat((step % 3) + 1)}
          </div>
        </div>
      ) : (
        /* Final shutdown screen */
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            It's now safe to turn off your computer.
          </div>

          <div style={{ fontSize: "48px", marginBottom: "24px" }}>
            <img src={logo} alt="Windows 95 Logo" style={{ width: "64px", height: "64px", margin: "0 auto" }} />
          </div>

          <div
            style={{
              color: "#8888ff",
              fontSize: "13px",
              marginBottom: "32px",
            }}
          >
            Thank you for visiting my portfolio!
          </div>

          {/* Restart button */}
          <button
            onClick={onCancel}
            style={{
              background: "#c0c0c0",
              border: "2px solid",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              padding: "8px 24px",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "ms_sans_serif, sans-serif",
            }}
          >
            🔄 Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default ShutdownScreen;
