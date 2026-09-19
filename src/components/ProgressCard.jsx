import React, { useState } from 'react';
import { Icon } from './Icon';

export function ProgressCard({ tasks, completionRate, todayCompletionRate, dailyProgress, dailyGoal, onSetDailyGoal }) {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(dailyGoal);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const remainingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(t => t.priority === 'High' && !t.completed).length;

  const handleSaveGoal = () => {
    if (tempGoal > 0 && tempGoal <= 50) {
      onSetDailyGoal(tempGoal);
      setIsEditingGoal(false);
    }
  };

  const handleCancelGoal = () => {
    setTempGoal(dailyGoal);
    setIsEditingGoal(false);
  };

  return (
    <div className="progress-card">
      <div className="progress-header">
        <span className="progress-icon">
          <Icon name="chart" size={16} />
        </span>
        <h3>Mission Progress</h3>
      </div>

      <div className="progress-stats">
        <div className="stat-item">
          <span className="stat-label">Completion Rate</span>
          <span className="stat-value">{completionRate}%</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Tasks Completed</span>
          <span className="stat-value">{completedTasks}</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Remaining</span>
          <span className="stat-value">{remainingTasks}</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">High Priority</span>
          <span className="stat-value">{highPriorityTasks}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${todayCompletionRate}%` }}
        />
      </div>

      <div className="progress-footer">
        <span>Today's progress</span>
        <strong>{completedTasks} / {totalTasks} tasks completed</strong>
      </div>

      <div className="daily-goal-section">
        <div className="daily-goal-header">
          <span>Daily Goal</span>
          <button 
            className="icon-button"
            onClick={() => setIsEditingGoal(!isEditingGoal)}
            aria-label="Edit daily goal"
          >
            <Icon name="edit" size={14} />
          </button>
        </div>
        
        {isEditingGoal ? (
          <div className="daily-goal-edit">
            <input
              type="number"
              min="1"
              max="50"
              value={tempGoal}
              onChange={(e) => setTempGoal(parseInt(e.target.value) || 1)}
            />
            <button onClick={handleSaveGoal} className="button primary">Save</button>
            <button onClick={handleCancelGoal} className="button secondary">Cancel</button>
          </div>
        ) : (
          <div className="daily-goal-display">
            <span className="goal-progress">{dailyProgress.completed} / {dailyGoal}</span>
            <div className="goal-bar">
              <div 
                className="goal-fill"
                style={{ width: `${Math.min(dailyProgress.percentage, 100)}%` }}
              />
            </div>
            <span className="goal-percentage">{dailyProgress.percentage}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
