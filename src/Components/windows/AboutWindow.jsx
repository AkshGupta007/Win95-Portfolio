import React, { useState } from "react";
import { Separator, Tabs, Tab, TabBody } from "react95";
import BaseWindow from "./BaseWindow";

const SKILLS = {
  Frontend: [
    { name: "React.js", pct: 85 },
    { name: "HTML / CSS", pct: 90 },
    { name: "JavaScript (ES6+)", pct: 80 },
  ],
  "Backend & DB": [
    { name: "Node.js / Express.js", pct: 78 },
    { name: "MongoDB", pct: 75 },
    { name: "MySQL", pct: 72 },
  ],
  "Tools & Other": [
    { name: "Git / GitHub", pct: 82 },
    { name: "DSA (C++ / Java)", pct: 75 },
    { name: "REST API Design", pct: 80 },
  ],
};

const PROJECTS = [
  {
    icon: "📚",
    title: "StudyNotion — Ed-Tech Platform",
    desc: "Full-stack e-learning platform where instructors create & sell courses and students can enroll, track progress, and access video content. Features JWT auth, Razorpay payments, and a responsive UI.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Razorpay", "JWT"],
  },
  {
    icon: "🔐",
    title: "Password Manager — Secure Vault",
    desc: "Browser-based password manager with encrypted storage, master password protection, and a clean UI for managing credentials — built with security best practices.",
    tech: ["React.js", "LocalStorage", "Encryption", "Tailwind"],
  },
  {
    icon: "🛒",
    title: "E-Commerce Website",
    desc: "Complete shopping platform with product listings, cart management, user auth, and order management. MySQL for robust data handling, Express for the REST API layer.",
    tech: ["React.js", "Node.js", "MySQL", "Express", "REST API"],
  },
];

const STATS = [
  { num: "200+", label: "DSA Problems" },
  { num: "3+", label: "Projects" },
  { num: "7.70", label: "CGPA" },
  { num: "2026", label: "Graduating" },
];

// ── Reusable inset box ──────────────────────────────────────────────────────
function InsetBox({ children, style }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "2px solid",
        borderColor: "#808080 #fff #fff #808080",
        padding: "8px",
        marginBottom: "8px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontSize: "10px",
        fontWeight: "bold",
        color: "#000080",
        marginBottom: "8px",
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}
    >
      ► {children}
    </p>
  );
}

// ── Skill bar ───────────────────────────────────────────────────────────────
function SkillBar({ name, pct }) {
  return (
    <div style={{ marginBottom: "6px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2px",
          fontSize: "11px",
        }}
      >
        <span>{name}</span>
        <span style={{ fontWeight: "bold", color: "#000080" }}>{pct}%</span>
      </div>
      <div
        style={{
          height: "12px",
          background: "#fff",
          border: "1px solid",
          borderColor: "#808080 #fff #fff #808080",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background:
              "repeating-linear-gradient(to right, #000080 0px, #000080 8px, #1084d0 8px, #1084d0 10px)",
          }}
        />
      </div>
    </div>
  );
}

// ── Timeline item ───────────────────────────────────────────────────────────
function TimelineItem({ icon, title, sub, badge }) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
      <div
        style={{
          width: "30px",
          height: "30px",
          flexShrink: 0,
          background: "#000080",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "15px",
          border: "1px solid",
          borderColor: "#808080 #fff #fff #808080",
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "2px" }}
        >
          {title}
        </p>
        <p style={{ fontSize: "10px", color: "#444", lineHeight: "1.5" }}>
          {sub}
        </p>
        {badge && (
          <span
            style={{
              display: "inline-block",
              background: "#000080",
              color: "#fff",
              padding: "0 6px",
              fontSize: "9px",
              marginTop: "3px",
            }}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Project card ────────────────────────────────────────────────────────────
function ProjectCard({ icon, title, desc, tech }) {
  return (
    <div
      style={{
        border: "2px solid",
        borderColor: "#808080 #fff #fff #808080",
        background: "#fff",
        padding: "8px",
        marginBottom: "8px",
      }}
    >
      <p
        style={{
          fontWeight: "bold",
          fontSize: "12px",
          color: "#000080",
          marginBottom: "4px",
        }}
      >
        {icon} {title}
      </p>
      <p
        style={{
          fontSize: "10px",
          color: "#333",
          lineHeight: "1.6",
          marginBottom: "6px",
        }}
      >
        {desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
        {tech.map((t) => (
          <span
            key={t}
            style={{
              background: "#c0c0c0",
              border: "1px solid",
              borderColor: "#fff #808080 #808080 #fff",
              padding: "1px 6px",
              fontSize: "9px",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Contact row ─────────────────────────────────────────────────────────────
function ContactRow({ icon, label, value, valueColor }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "5px 0",
        borderBottom: "1px dotted #aaa",
        fontSize: "11px",
      }}
    >
      <span style={{ fontSize: "14px", width: "20px", textAlign: "center" }}>
        {icon}
      </span>
      <span style={{ color: "#666", width: "65px", fontSize: "10px" }}>
        {label}
      </span>
      <span style={{ fontWeight: "bold", color: valueColor || "#000080" }}>
        {value}
      </span>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
function AboutWindow({ onClose, onMinimize }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <BaseWindow
      title="📄 About Me — Aksh Gupta"
      onClose={onClose}
      onMinimize={onMinimize}
      width="480px"
      top="80px"
      left="180px"
    >
      {/* ── Profile header ── */}
      <div
        style={{
          background: "#000080",
          padding: "10px",
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          marginBottom: "8px",
          border: "2px inset #808080",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            flexShrink: 0,
            background: "#008080",
            border: "2px solid",
            borderColor: "#808080 #fff #fff #808080",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
          }}
        >
          👨‍💻
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: "17px", color: "#fff" }}>
            Aksh Gupta
          </h2>
          <p style={{ margin: "3px 0", fontSize: "11px", color: "#00ffff" }}>
            Full Stack Developer · B.Tech IT · BPIT Delhi
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              marginTop: "4px",
            }}
          >
            {["React.js", "Node.js", "MongoDB", "MySQL", "DSA"].map((tag) => (
              <span
                key={tag}
                style={{
                  background: "transparent",
                  border: "1px solid #00ffff",
                  color: "#fff",
                  padding: "1px 6px",
                  fontSize: "9px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "6px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                background: "#00ff00",
                border: "1px solid #008000",
                display: "inline-block",
                animation: "blink 1.5s infinite",
              }}
            />
            <span style={{ fontSize: "10px", color: "#00ff00" }}>
              Available for opportunities
            </span>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
        {STATS.map(({ num, label }) => (
          <div
            key={label}
            style={{
              flex: 1,
              background: "#000080",
              color: "#fff",
              padding: "6px 4px",
              textAlign: "center",
              border: "1px solid",
              borderColor: "#1084d0 #000040 #000040 #1084d0",
            }}
          >
            <div
              style={{ fontSize: "15px", fontWeight: "bold", color: "#00ffff" }}
            >
              {num}
            </div>
            <div style={{ fontSize: "9px", color: "#aad", marginTop: "2px" }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <Tabs value={activeTab} onChange={(val) => setActiveTab(val)}>
        <Tab value={0}>📋 Bio</Tab>
        <Tab value={1}>💻 Skills</Tab>
        <Tab value={2}>🚀 Projects</Tab>
        <Tab value={3}>📧 Contact</Tab>
      </Tabs>

      <TabBody style={{ padding: "8px" }}>
        {/* BIO */}
        {activeTab === 0 && (
          <>
            <InsetBox>
              <SectionLabel>Experience</SectionLabel>
              <TimelineItem
                icon="💼"
                title="Web Developer Intern · TV-100"
                sub="Developed React components, integrated REST APIs, optimized SQL queries, and shipped production-level features in a real-world team environment."
                badge="React · REST API · SQL"
              />
              <TimelineItem
                icon="🎓"
                title="B.Tech in Information Technology · 2022–2026"
                sub="Bhagwan Parshuram Institute of Technology, Delhi — CGPA: 7.70"
                badge="Core CS · Web Dev · DBMS"
              />
            </InsetBox>
            <InsetBox>
              <SectionLabel>Achievements</SectionLabel>
              <TimelineItem
                icon="🏆"
                title="Full-Stack Development Bootcamp — Udemy"
                sub="Completed an intensive end-to-end certification covering MERN stack, REST APIs, and deployment workflows."
              />
              <TimelineItem
                icon="🧠"
                title="200+ DSA Problems Solved"
                sub="Consistently solving algorithmic challenges on LeetCode & GFG — arrays, trees, graphs, dynamic programming."
              />
            </InsetBox>
          </>
        )}

        {/* SKILLS */}
        {activeTab === 1 && (
          <>
            {Object.entries(SKILLS).map(([group, skills]) => (
              <InsetBox key={group}>
                <SectionLabel>{group}</SectionLabel>
                {skills.map((s) => (
                  <SkillBar key={s.name} name={s.name} pct={s.pct} />
                ))}
              </InsetBox>
            ))}
          </>
        )}

        {/* PROJECTS */}
        {activeTab === 2 && (
          <>
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </>
        )}

        {/* CONTACT */}
        {activeTab === 3 && (
          <>
            <InsetBox>
              <SectionLabel>Get in Touch</SectionLabel>
              <ContactRow
                icon="📧"
                label="Email"
                value="akshgupta593@gmail.com"
              />
              <ContactRow icon="📍" label="Location" value="Delhi, India" />
              <ContactRow icon="🌐" label="Languages" value="English · Hindi" />
              <ContactRow
                icon="💼"
                label="Status"
                value="Open to Roles & Internships"
                valueColor="#008000"
              />
            </InsetBox>
            <InsetBox>
              <SectionLabel>Profiles</SectionLabel>
              <ContactRow
                icon="🐙"
                label="GitHub"
                value="github.com/AkshGupta007"
              />
              <ContactRow
                icon="🔗"
                label="LinkedIn"
                value="linkedin.com/in/akshgupta593"
              />
              <ContactRow
                icon="🧩"
                label="LeetCode"
                value="200+ problems solved"
              />
            </InsetBox>
          </>
        )}
      </TabBody>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </BaseWindow>
  );
}

export default AboutWindow;
