import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { TaskList } from '../components/TaskList';
import { AddTaskModal } from '../components/AddTaskModal';
import { FilterBar } from '../components/FilterBar';
import { ProgressCard } from '../components/ProgressCard';
import { ProjectCard } from '../components/ProjectCard';

export function Dashboard({ useTasksHook, searchQuery, showAddModal, setShowAddModal }) {
  const {
    tasks,
    projects,
    priorities,
    dailyGoal,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    addProject,
    deleteProject,
    addPriority,
    deletePriority,
    getTodayTasks,
    getCompletedTasks,
    getActiveTasks,
    getHighPriorityTasks,
    getTasksByProject,
    getProjectById,
    getPriorityById,
    getCompletionRate,
    getTodayCompletionRate,
    getDailyGoalProgress,
    searchTasks,
    filterTasks
  } = useTasksHook;

  const [editingTask, setEditingTask] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [showTaskHistory, setShowTaskHistory] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    if (searchQuery) {
      filteredTasks = searchTasks(searchQuery);
    }

    if (selectedProject) {
      filteredTasks = getTasksByProject(selectedProject);
    } else {
      filteredTasks = filterTasks(currentFilter);
    }

    return filteredTasks;
  };

  const handleAddTask = (taskData) => {
    addTask(taskData);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowAddModal(true);
  };

  const handleUpdateTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
      setShowAddModal(false);
    }
  };

  const handleDeleteTask = (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const handleViewHistory = (task) => {
    setShowTaskHistory(task);
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetTask) => {
    e.preventDefault();
    if (draggedTask && draggedTask.id !== targetTask.id) {
      const targetIndex = displayTasks.findIndex(t => t.id === targetTask.id);
      reorderTasks(draggedTask.id, targetIndex);
    }
    setDraggedTask(null);
  };

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      addProject(newProjectName.trim());
      setNewProjectName('');
      setShowAddProject(false);
    }
  };

  const handleDeleteProject = (projectId) => {
    if (confirm('Are you sure you want to delete this project? Tasks will be unassigned.')) {
      deleteProject(projectId);
      if (selectedProject === projectId) {
        setSelectedProject(null);
      }
    }
  };

  const todayTasks = getTodayTasks();
  const displayTasks = getFilteredTasks();
  const dailyProgress = getDailyGoalProgress();

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <div className="dashboard-header">
            <div className="mission-header">
              <h2>Today's Mission</h2>
              <p>Stay focused. Complete what matters.</p>
            </div>
            <button 
              className="add-task-button"
              onClick={() => {
                setEditingTask(null);
                setIsAddModalOpen(true);
              }}
            >
              <Icon name="plus" size={16} />
              Add Task
            </button>
          </div>

          <ProgressCard 
            tasks={todayTasks}
            completionRate={getCompletionRate()}
            todayCompletionRate={getTodayCompletionRate()}
            dailyProgress={dailyProgress}
            dailyGoal={dailyGoal}
            onSetDailyGoal={useTasksHook.setDailyGoalCount}
          />

          <div className="tasks-section">
            <div className="tasks-header">
              <h3>Tasks</h3>
              <FilterBar 
                currentFilter={currentFilter}
                onFilterChange={setCurrentFilter}
              />
            </div>

            <TaskList 
              tasks={displayTasks}
              projects={projects}
              priorities={priorities}
              onToggle={toggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onViewHistory={handleViewHistory}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              draggedTask={draggedTask}
            />
          </div>
        </div>

        <div className="dashboard-sidebar">
          <div className="projects-section">
            <div className="section-header">
              <h3>Projects</h3>
              <button 
                className="icon-button"
                onClick={() => setShowAddProject(!showAddProject)}
                aria-label="Add project"
              >
                <Icon name="plus" size={14} />
              </button>
            </div>

            {showAddProject && (
              <div className="add-project-form">
                <input
                  type="text"
                  placeholder="Project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddProject()}
                />
                <button onClick={handleAddProject}>Add</button>
              </div>
            )}

            <div className="projects-list">
              <button
                className={`project-item ${!selectedProject ? 'active' : ''}`}
                onClick={() => setSelectedProject(null)}
              >
                <span>All Tasks</span>
                <span className="count">{tasks.length}</span>
              </button>

              {projects.map(project => {
                const projectTasks = getTasksByProject(project.id);
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    taskCount={projectTasks.length}
                    onClick={() => setSelectedProject(project.id)}
                    onDelete={handleDeleteProject}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingTask(null);
        }}
        onAdd={editingTask ? handleUpdateTask : handleAddTask}
        projects={projects}
        priorities={priorities}
      />

      {showTaskHistory && (
        <div className="modal-overlay" onClick={() => setShowTaskHistory(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Task History</h2>
              <button className="close-button" onClick={() => setShowTaskHistory(null)}>
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className="modal-form">
              <div className="task-history-list">
                {showTaskHistory.history && showTaskHistory.history.length > 0 ? (
                  showTaskHistory.history.slice().reverse().map((entry, index) => (
                    <div key={index} className="history-item">
                      <span className="history-action">{entry.action}</span>
                      <span className="history-time">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                      <span className="history-details">{entry.details}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-history">No history available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
