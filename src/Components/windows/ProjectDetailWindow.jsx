import React from "react";
import { Separator, Button } from "react95";
import BaseWindow from "./BaseWindow";

function ProjectDetailWindow({ project, onClose }) {
  return (
    <BaseWindow
      title={`${project.icon} ${project.title}`}
      onClose={onClose}
      width="420px"
      top="160px"
      left="320px"
    >
      {/* Description */}
      <p style={{ fontSize: "13px", lineHeight: "1.6", marginBottom: "12px" }}>
        {project.description}
      </p>

      <Separator />

      {/* Tech stack */}
      <div style={{ margin: "12px 0" }}>
        <p style={{ fontSize: "12px", color: "#444", marginBottom: "8px" }}>
          🛠️ Tech Stack
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                background: "#000080",
                color: "white",
                padding: "2px 8px",
                fontSize: "12px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <Separator />

      {/* Links */}
      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        {project.github && (
          <Button onClick={() => window.open(project.github, "_blank")}>
            🐙 GitHub
          </Button>
        )}
        {project.live && (
          <Button onClick={() => window.open(project.live, "_blank")}>
            🌐 Live Demo
          </Button>
        )}
      </div>
    </BaseWindow>
  );
}

export default ProjectDetailWindow;
