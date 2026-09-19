import React from 'react';
import { Icon } from './Icon';

export function TaskItem({ task, project, priority, onToggle, onEdit, onDelete, onViewHistory, onDragStart, onDragOver, onDrop, isDragging }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const priorityColor = priority?.color || 'orange';
  const priorityName = priority?.name || task.priority;

  return (
    <div 
      className={`task-item ${task.completed ? 'completed' : ''} ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, task)}
    >
      <button 
        className="task-checkbox"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && <Icon name="check" size={10} />}
      </button>
      
      <div className="task-content">
        <div className="task-main">
          <span className="task-title">{task.title}</span>
          {task.description && <span className="task-description">{task.description}</span>}
        </div>
        
        <div className="task-meta">
          {project && (
            <span className="task-project">
              <i className={`tag-dot ${project.color}`} />
              {project.name}
            </span>
          )}
          
          {task.dueDate && (
            <time className="task-due">
              {formatDate(task.dueDate)}
              {formatTime(task.dueDate) && ` • ${formatTime(task.dueDate)}`}
            </time>
          )}
          
          <span className={`task-priority ${priorityColor}`}>
            {priorityName}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button 
          className="action-button"
          onClick={() => onViewHistory(task)}
          aria-label="View history"
          title="View history"
        >
          <Icon name="clock" size={14} />
        </button>
        <button 
          className="action-button"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
        >
          <Icon name="edit" size={14} />
        </button>
        <button 
          className="action-button delete"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <Icon name="trash" size={14} />
        </button>
      </div>
    </div>
  );
}
