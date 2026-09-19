import React from 'react';
import { Icon } from './Icon';

export function ProjectCard({ project, taskCount, onClick, onDelete }) {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-header">
        <i className={`project-dot ${project.color}`} />
        <span className="project-name">{project.name}</span>
        <span className="project-count">{taskCount}</span>
      </div>
      <button 
        className="project-delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(project.id);
        }}
        aria-label="Delete project"
      >
        <Icon name="trash" size={12} />
      </button>
    </div>
  );
}
