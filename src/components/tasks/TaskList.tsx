/**
 * Task List - Displays all tasks with empty state
 */

import { useStore } from '@/store';
import { TaskItem } from './TaskItem';

export function TaskList() {
  const tasks = useStore((state) => state.tasks);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <svg
          className="w-16 h-16 mx-auto text-white/30 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-white/60 text-sm">No tasks yet</p>
        <p className="text-white/40 text-xs mt-1">Create your first task below</p>
      </div>
    );
  }

  // Separate active and completed tasks
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="space-y-4">
      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-wide text-white/50 mb-2 font-semibold">
            Active ({activeTasks.length})
          </h3>
          <div className="space-y-2">
            {activeTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-wide text-white/50 mb-2 font-semibold">
            Completed ({completedTasks.length})
          </h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

