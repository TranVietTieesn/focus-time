/**
 * Task Item - Individual task with actions
 */

import { useState } from 'react';
import { useStore } from '@/store';
import type { Task } from '@/types';
import { TaskEditorModal } from './TaskEditorModal';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const completeTask = useStore((state) => state.completeTask);
  const remove = useStore((state) => state.remove);
  const setActive = useStore((state) => state.setActive);
  const activeTaskId = useStore((state) => state.activeTaskId);

  const isActive = activeTaskId === task.id;

  const handleToggleComplete = () => {
    if (!task.isCompleted) {
      completeTask(task.id);
    }
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      remove(task.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const handleSetActive = () => {
    if (!task.isCompleted) {
      setActive(isActive ? null : task.id);
    }
  };

  return (
    <>
      <div
        className={`
          p-3 rounded-lg border transition-all
          ${isActive
            ? 'bg-primary/20 border-primary'
            : task.isCompleted
            ? 'bg-white/5 border-white/10 opacity-60'
            : 'bg-white/5 border-white/10 hover:bg-white/10'
          }
        `}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={handleToggleComplete}
            disabled={task.isCompleted}
            className={`
              flex-shrink-0 w-5 h-5 rounded border-2 transition-all focus-ring
              ${task.isCompleted
                ? 'bg-green-500 border-green-500'
                : 'border-white/30 hover:border-white/50'
              }
            `}
            aria-label={task.isCompleted ? 'Task completed' : 'Mark task as complete'}
          >
            {task.isCompleted && (
              <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <button
              onClick={handleSetActive}
              disabled={task.isCompleted}
              className={`
                text-left w-full focus-ring rounded
                ${task.isCompleted ? 'line-through text-white/50' : 'text-white'}
                ${!task.isCompleted && 'hover:text-primary cursor-pointer'}
              `}
            >
              <p className="font-medium break-words">{task.title}</p>
              {task.estimatedSessions && (
                <p className="text-xs text-white/50 mt-1">
                  Est. {task.estimatedSessions} session{task.estimatedSessions !== 1 ? 's' : ''}
                </p>
              )}
            </button>
            {isActive && (
              <p className="text-xs text-primary mt-1 font-medium">Active task</p>
            )}
          </div>

          {/* Actions */}
          {!task.isCompleted && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 hover:bg-white/10 rounded transition-colors focus-ring"
                aria-label="Edit task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className={`
                  p-1.5 rounded transition-colors focus-ring
                  ${showDeleteConfirm
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'hover:bg-white/10 text-white'
                  }
                `}
                aria-label={showDeleteConfirm ? 'Click again to confirm delete' : 'Delete task'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <TaskEditorModal
          task={task}
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
}

