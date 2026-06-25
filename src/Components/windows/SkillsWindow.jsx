import React, { useState } from "react";
import { ProgressBar, Separator } from "react95";
import BaseWindow from "./BaseWindow";
import skills from "../data/skills";

function SkillsWindow({ onClose, onMinimize }) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <BaseWindow
      title="⚙️ Skills"
      onClose={onClose}
      onMinimize={onMinimize}
      width="480px"
      top="100px"
      left="220px"
    >
      {/* Category tabs */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        {skills.map((skill, index) => (
          <button
            key={skill.category}
            onClick={() => setActiveCategory(index)}
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              cursor: "pointer",
              background: activeCategory === index ? "#000080" : "#c0c0c0",
              color: activeCategory === index ? "white" : "black",
              border: "2px solid",
              borderColor:
                activeCategory === index
                  ? "#000080"
                  : "#ffffff #808080 #808080 #ffffff",
              fontFamily: "ms_sans_serif, sans-serif",
            }}
          >
            {skill.icon} {skill.category}
          </button>
        ))}
      </div>

      <Separator />

      {/* Skills list */}
      <div style={{ marginTop: "12px" }}>
        {skills[activeCategory].items.map((item) => (
          <div key={item.name} style={{ marginBottom: "14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                marginBottom: "4px",
              }}
            >
              <span>{item.name}</span>
              <span style={{ color: "#444" }}>{item.level}%</span>
            </div>
            <ProgressBar value={item.level} />
          </div>
        ))}
      </div>
    </BaseWindow>
  );
}

export default SkillsWindow;
