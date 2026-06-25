import React, { useState, useRef, useEffect } from "react";
import BaseWindow from "./BaseWindow";
import projects from "../data/projects";
import skills from "../data/skills";

const COMMANDS = {
  help: () => `
Available commands:
  help          - Show this help message
  whoami        - About me
  ls projects   - List my projects
  ls skills     - List my skills
  contact       - Get my contact info
  github        - Open my GitHub
  linkedin      - Open my LinkedIn
  resume        - Download my resume
  clear         - Clear terminal
  date          - Show current date
  echo [text]   - Print text
  exit          - Close terminal
  `,

  whoami: () => `
  Name    : Your Name
  Role    : Full Stack Developer
  Location: Your City, Country
  Email   : you@email.com
  Status  : Open to opportunities 🟢
  `,

  "ls projects": () =>
    projects
      .map((p, i) => `  ${i + 1}. ${p.icon} ${p.title} — ${p.tech.join(", ")}`)
      .join("\n"),

  "ls skills": () =>
    skills
      .map(
        (cat) =>
          `\n  📁 ${cat.category}\n` +
          cat.items.map((s) => `     • ${s.name} (${s.level}%)`).join("\n"),
      )
      .join(""),

  contact: () => `
  📧 Email   : you@email.com
  🐙 GitHub  : github.com/yourusername
  💼 LinkedIn: linkedin.com/in/yourusername
  🐦 Twitter : @yourhandle
  `,

  date: () => `  ${new Date().toLocaleString()}`,

  github: () => {
    window.open("https://github.com/yourusername", "_blank");
    return "  Opening GitHub...";
  },

  linkedin: () => {
    window.open("https://linkedin.com/in/yourusername", "_blank");
    return "  Opening LinkedIn...";
  },

  resume: () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.target = "_blank";
    link.click();
    return "  Opening resume...";
  },

  bsod: () => {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("trigger-bsod"));
    }, 500);
    return "  Initiating critical system error...";
  },
};

const WELCOME = `
Microsoft(R) Windows 95
(C) Copyright Microsoft Corp 1981-1996

Welcome to Your Name's Portfolio Terminal
Type 'help' to see available commands.

C:\\PORTFOLIO>`;

function CmdWindow({ onClose, onMinimize }) {
  const [lines, setLines] = useState([{ type: "output", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    let output = "";

    if (trimmed === "") return;

    if (trimmed === "clear") {
      setLines([{ type: "output", text: WELCOME }]);
      return;
    }

    if (trimmed === "exit") {
      onClose();
      return;
    }

    if (trimmed.startsWith("echo ")) {
      output = "  " + cmd.slice(5);
    } else if (COMMANDS[trimmed]) {
      output = COMMANDS[trimmed]();
    } else {
      output = `  '${trimmed}' is not recognized as a command.\n  Type 'help' for available commands.`;
    }

    setLines((prev) => [
      ...prev,
      { type: "input", text: `C:\\PORTFOLIO> ${cmd}` },
      { type: "output", text: output },
    ]);

    setHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }

    // Arrow up — previous command
    if (e.key === "ArrowUp") {
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || "");
    }

    // Arrow down — next command
    if (e.key === "ArrowDown") {
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || "");
    }
  };

  return (
    <BaseWindow
      title="C:\PORTFOLIO — cmd.exe"
      onClose={onClose}
      onMinimize={onMinimize}
      width="600px"
      top="80px"
      left="150px"
    >
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          background: "#000000",
          color: "#c0c0c0",
          fontFamily: '"Courier New", monospace',
          fontSize: "13px",
          padding: "8px",
          height: "380px",
          overflowY: "auto",
          cursor: "text",
          lineHeight: "1.5",
        }}
      >
        {/* Output lines */}
        {lines.map((line, i) => (
          <pre
            key={i}
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              color: line.type === "input" ? "#ffffff" : "#c0c0c0",
            }}
          >
            {line.text}
          </pre>
        ))}

        {/* Input line */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>
            C:\PORTFOLIO&gt;&nbsp;
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#ffffff",
              fontFamily: '"Courier New", monospace',
              fontSize: "13px",
              flex: 1,
              caretColor: "#ffffff",
            }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </BaseWindow>
  );
}

export default CmdWindow;
