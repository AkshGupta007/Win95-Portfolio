import React, { useEffect, useState } from "react";

const BSOD_TEXT = `A problem has been detected and Windows has been shut down to prevent damage to your computer.

PORTFOLIO_EXCEPTION_NOT_HIRED

If this is the first time you've seen this stop error screen, restart your computer. If this screen appears again, follow these steps:

Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.

If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.

Technical Information:

*** STOP: 0x0000007E (0xC0000005, 0xFF8928A0, 0xFF897998)

*** RECRUITER.SYS - Address FF8928A0 base at FF890000, DateStamp 3d6dd67c

Beginning dump of physical memory...
Physical memory dump complete.

Contact your system administrator or technical support group for further assistance.`;

function BSOD({ onDismiss }) {
  const [dots, setDots] = useState(0);
  const [dumping, setDumping] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((d) => (d + 1) % 4);
    }, 500);

    // Animate memory dump progress
    const dumpInterval = setInterval(() => {
      setDumping((d) => {
        if (d >= 100) {
          clearInterval(dumpInterval);
          setDone(true);
          return 100;
        }
        return d + 2;
      });
    }, 60);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(dumpInterval);
    };
  }, []);

  useEffect(() => {
    // Press any key to dismiss
    const handleKey = () => {
      if (done) onDismiss();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [done, onDismiss]);

  return (
    <div
      onClick={() => {
        if (done) onDismiss();
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#0000aa",
        color: "#ffffff",
        fontFamily: '"Courier New", monospace',
        fontSize: "14px",
        padding: "40px 60px",
        zIndex: 99999,
        cursor: done ? "pointer" : "default",
        boxSizing: "border-box",
        lineHeight: "1.6",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#aaaaaa",
          color: "#0000aa",
          padding: "2px 8px",
          display: "inline-block",
          marginBottom: "24px",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        Windows
      </div>

      {/* Main BSOD text */}
      <div style={{ whiteSpace: "pre-wrap", marginBottom: "24px" }}>
        {BSOD_TEXT}
      </div>

      {/* Memory dump progress */}
      <div style={{ marginTop: "12px" }}>
        {!done ? (
          <span>
            Dumping physical memory{".".repeat(dots)} {dumping}%
          </span>
        ) : (
          <div>
            <div style={{ marginBottom: "16px" }}>
              Physical memory dump complete. ({dumping}%)
            </div>
            <div
              style={{
                background: "#aaaaaa",
                color: "#0000aa",
                padding: "8px 16px",
                display: "inline-block",
                fontWeight: "bold",
                animation: "blink 1s infinite",
              }}
            >
              Press any key or click to continue_
            </div>
          </div>
        )}
      </div>

      {/* Blink style */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default BSOD;
