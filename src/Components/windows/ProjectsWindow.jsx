import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from "react95";
import BaseWindow from "./BaseWindow";
import projects from "../data/projects";
import ProjectDetailWindow from "./ProjectDetailWindow";

function ProjectsWindow({ onClose, onMinimize }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <BaseWindow
        title="📁 Projects"
        onClose={onClose}
        onMinimize={onMinimize}
        width="550px"
        top="80px"
        left="200px"
      >
        <p style={{ fontSize: "13px", marginBottom: "12px", color: "#444" }}>
          Double-click a project to view details.
        </p>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Icon</TableHeadCell>
              <TableHeadCell>Project</TableHeadCell>
              <TableHeadCell>Tech Stack</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                onDoubleClick={() => setSelectedProject(project)}
                style={{ cursor: "pointer" }}
              >
                <TableDataCell
                  style={{ fontSize: "20px", textAlign: "center" }}
                >
                  {project.icon}
                </TableDataCell>
                <TableDataCell style={{ fontSize: "13px", fontWeight: "bold" }}>
                  {project.title}
                </TableDataCell>
                <TableDataCell style={{ fontSize: "12px", color: "#555" }}>
                  {project.tech.join(", ")}
                </TableDataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </BaseWindow>

      {/* Opens detail window when a project is double clicked */}
      {selectedProject && (
        <ProjectDetailWindow
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

export default ProjectsWindow;
