import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const DEFAULT_PROJECTS = [
  { id: '1', name: 'College', color: 'mint' },
  { id: '2', name: 'Personal', color: 'purple' },
  { id: '3', name: 'Projects', color: 'orange' },
  { id: '4', name: 'Fitness', color: 'blue' }
];

const DEFAULT_PRIORITIES = [
  { id: 'low', name: 'Low', color: 'blue', value: 1 },
  { id: 'medium', name: 'Medium', color: 'orange', value: 2 },
  { id: 'high', name: 'High', color: 'purple', value: 3 }
];

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    return storage.get('focuslist_tasks', []);
  });

  const [projects, setProjects] = useState(() => {
    return storage.get('focuslist_projects', DEFAULT_PROJECTS);
  });

  const [priorities, setPriorities] = useState(() => {
    return storage.get('focuslist_priorities', DEFAULT_PRIORITIES);
  });

  const [dailyGoal, setDailyGoal] = useState(() => {
    return storage.get('focuslist_daily_goal', 5);
  });

  const [darkMode, setDarkMode] = useState(() => {
    return storage.get('focuslist_dark_mode', false);
  });

  useEffect(() => {
    storage.set('focuslist_tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    storage.set('focuslist_projects', projects);
  }, [projects]);

  useEffect(() => {
    storage.set('focuslist_priorities', priorities);
  }, [priorities]);

  useEffect(() => {
    storage.set('focuslist_daily_goal', dailyGoal);
  }, [dailyGoal]);

  useEffect(() => {
    storage.set('focuslist_dark_mode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const setDailyGoalCount = (goal) => {
    setDailyGoal(goal);
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || '',
      dueDate: taskData.dueDate || null,
      priority: taskData.priority || 'medium',
      projectId: taskData.projectId || null,
      completed: false,
      createdAt: new Date().toISOString(),
      order: Date.now(),
      history: [{
        action: 'created',
        timestamp: new Date().toISOString(),
        details: 'Task created'
      }]
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { 
          ...task, 
          ...updates,
          history: [
            ...(task.history || []),
            {
              action: 'updated',
              timestamp: new Date().toISOString(),
              details: Object.keys(updates).join(', ')
            }
          ]
        };
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const completed = !task.completed;
        return {
          ...task,
          completed,
          history: [
            ...(task.history || []),
            {
              action: completed ? 'completed' : 'uncompleted',
              timestamp: new Date().toISOString(),
              details: completed ? 'Task marked as complete' : 'Task marked as incomplete'
            }
          ]
        };
      }
      return task;
    }));
  };

  const reorderTasks = (taskId, newOrder) => {
    setTasks(prev => {
      const taskIndex = prev.findIndex(t => t.id === taskId);
      if (taskIndex === -1) return prev;
      
      const newTasks = [...prev];
      const [movedTask] = newTasks.splice(taskIndex, 1);
      newTasks.splice(newOrder, 0, movedTask);
      
      return newTasks.map((task, index) => ({
        ...task,
        order: index
      }));
    });
  };

  const addProject = (name, color = 'mint') => {
    const newProject = {
      id: Date.now().toString(),
      name,
      color
    };
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setTasks(prev => prev.map(task => 
      task.projectId === projectId ? { ...task, projectId: null } : task
    ));
  };

  const addPriority = (name, color, value) => {
    const newPriority = {
      id: Date.now().toString(),
      name,
      color,
      value
    };
    setPriorities(prev => [...prev, newPriority]);
  };

  const deletePriority = (priorityId) => {
    setPriorities(prev => prev.filter(p => p.id !== priorityId));
  };

  const getTodayTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      return task.dueDate === today;
    });
  };

  const getCompletedTasks = () => {
    return tasks.filter(task => task.completed);
  };

  const getActiveTasks = () => {
    return tasks.filter(task => !task.completed);
  };

  const getHighPriorityTasks = () => {
    return tasks.filter(task => {
      const priority = priorities.find(p => p.id === task.priority);
      return priority && priority.value >= 3 && !task.completed;
    });
  };

  const getTasksByProject = (projectId) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getProjectById = (projectId) => {
    return projects.find(p => p.id === projectId);
  };

  const getPriorityById = (priorityId) => {
    return priorities.find(p => p.id === priorityId);
  };

  const getCompletionRate = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const getTodayCompletionRate = () => {
    const todayTasks = getTodayTasks();
    if (todayTasks.length === 0) return 0;
    const completed = todayTasks.filter(t => t.completed).length;
    return Math.round((completed / todayTasks.length) * 100);
  };

  const getDailyGoalProgress = () => {
    const todayCompleted = getTodayTasks().filter(t => t.completed).length;
    return {
      completed: todayCompleted,
      goal: dailyGoal,
      percentage: Math.round((todayCompleted / dailyGoal) * 100)
    };
  };

  const searchTasks = (query) => {
    const lowerQuery = query.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(lowerQuery) ||
      (task.description && task.description.toLowerCase().includes(lowerQuery))
    );
  };

  const filterTasks = (filter) => {
    switch (filter) {
      case 'active':
        return getActiveTasks();
      case 'completed':
        return getCompletedTasks();
      case 'high':
        return getHighPriorityTasks();
      default:
        return tasks;
    }
  };

  return {
    tasks,
    projects,
    priorities,
    dailyGoal,
    darkMode,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    addProject,
    deleteProject,
    addPriority,
    deletePriority,
    toggleDarkMode,
    setDailyGoalCount,
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
  };
}
