import React from 'react';
import { TaskItem } from './TaskItem';
import { Icon } from './Icon';

export function TaskList({ tasks, projects, priorities, onToggle, onEdit, onDelete, onViewHistory, onDragStart, onDragOver, onDrop, draggedTask, filterType, searchQuery }) {
  if (tasks.length === 0) {
    let emptyMessage = "No tasks found";
    let emptySubtext = "Add a task to get started";
    let iconName = "spark";

    if (filterType === 'completed') {
      emptyMessage = "No completed tasks";
      emptySubtext = "Complete some tasks to see them here";
      iconName = "check";
    } else if (filterType === 'active') {
      emptyMessage = "No active tasks";
      emptySubtext = "All tasks are completed or none exist";
      iconName = "calendar";
    } else if (filterType === 'high') {
      emptyMessage = "No high-priority tasks";
      emptySubtext = "Add high-priority tasks to see them here";
      iconName = "bolt";
    } else if (searchQuery) {
      emptyMessage = "No missions found";
      emptySubtext = "Try changing your search or filter";
      iconName = "search";
    }

    return (
      <div className="empty-state">
        <div className="empty-icon">
          <Icon name={iconName} size={40} />
        </div>
        <p>{emptyMessage}</p>
        <span>{emptySubtext}</span>
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
