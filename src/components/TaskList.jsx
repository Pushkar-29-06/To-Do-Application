import React from 'react';
import { TaskItem } from './TaskItem';
import { Icon } from './Icon';

export function TaskList({ tasks, projects, priorities, onToggle, onEdit, onDelete, onViewHistory, onDragStart, onDragOver, onDrop, draggedTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <Icon name="spark" size={32} />
        <p>No tasks found</p>
        <span>Add a task to get started</span>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => {
        const project = projects.find(p => p.id === task.projectId);
        const priority = priorities.find(p => p.id === task.priority);
        return (
          <TaskItem
            key={task.id}
            task={task}
            project={project}
            priority={priority}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewHistory={onViewHistory}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            isDragging={draggedTask?.id === task.id}
          />
        );
      })}
    </div>
  );
}
