import { useState } from "react";
import { Button, TextInput } from "react95";
import BaseWindow from "./BaseWindow";

const FAVORITES = [
  { label: "🔍 Google", url: "https://www.google.com" },
  { label: "▶ YouTube", url: "https://youtube.com" },
  { label: "🐙 GitHub", url: "https://github.com" },
  { label: "💼 LinkedIn", url: "https://linkedin.com" },
];

function ChromeWindow({ onClose, onMinimize }) {
  const [inputVal, setInputVal] = useState("");

  const navigate = (target) => {
    const finalUrl = target.startsWith("http")
      ? target
      : `https://www.google.com/search?q=${target}`;
    window.open(finalUrl, "_blank");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") navigate(inputVal);
  };

  return (
    <BaseWindow
      title="🌐 Internet Explorer"
      onClose={onClose}
      onMinimize={onMinimize}
      width="600px"
      top="50px"
      left="100px"
    >
      {/* URL bar */}
      <div
        style={{
          background: "#c0c0c0",
          padding: "6px",
          borderBottom: "2px solid #808080",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "6px",
            alignItems: "center",
          }}
        >
          <TextInput
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search or enter URL..."
            style={{ flex: 1, fontSize: "12px" }}
          />
          <Button onClick={() => navigate(inputVal)}>Go</Button>
        </div>

        {/* Favorites */}
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {FAVORITES.map(({ label, url }) => (
            <Button
              key={label}
              onClick={() => navigate(url)}
              style={{ fontSize: "11px", padding: "1px 8px" }}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Homepage */}
      <div
        style={{
          height: "320px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          color: "#444",
        }}
      >
        <div style={{ fontSize: "48px" }}>🌐</div>
        <div style={{ fontSize: "18px", fontWeight: "bold", color: "#000080" }}>
          Internet Explorer 95
        </div>
        <div style={{ fontSize: "12px", color: "#666", textAlign: "center" }}>
          Type a URL or search query above and press Go
          <br />
          Links open in a new tab
        </div>

        {/* Quick links grid */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {FAVORITES.map(({ label, url }) => (
            <div
              key={label}
              onClick={() => navigate(url)}
              style={{
                padding: "8px 16px",
                background: "#c0c0c0",
                border: "2px solid",
                borderColor: "#ffffff #808080 #808080 #ffffff",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div
        style={{
          background: "#c0c0c0",
          borderTop: "1px solid #808080",
          padding: "2px 8px",
          fontSize: "11px",
          color: "#444",
        }}
      >
        Ready
      </div>
    </BaseWindow>
  );
}

export default ChromeWindow;
