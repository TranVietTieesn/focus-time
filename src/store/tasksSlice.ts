/**
 * Tasks Slice - Task management with CRUD operations
 */

import type { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Task, TaskUpdateInput } from '@/types';
import { STORAGE_KEYS } from '@/types';
import { safeGet, safeSet } from '@/lib/storage';
import { validateTaskTitle, validateEstimatedSessions } from '@/lib/validation';

export interface TasksSlice {
  // State
  tasks: Task[];
  activeTaskId: string | null;

  // Actions
  create: (title: string, estimatedSessions?: number | null) => Task;
  update: (id: string, updates: TaskUpdateInput) => void;
  complete: (id: string) => void;
  remove: (id: string) => void;
  setActive: (id: string | null) => void;
  getTasks: () => Task[];
  getActiveTask: () => Task | null;
}

export const createTasksSlice: StateCreator<TasksSlice> = (set, get) => {
  // Load initial tasks from localStorage
  const stored = safeGet<Task[]>(STORAGE_KEYS.TASKS, []);

  // Helper to persist tasks
  const persistTasks = () => {
    safeSet(STORAGE_KEYS.TASKS, get().tasks);
  };

  return {
    // Initial state
    tasks: stored,
    activeTaskId: null,

    // Actions
    create: (title, estimatedSessions = null) => {
      const validatedTitle = validateTaskTitle(title);
      const validatedSessions = validateEstimatedSessions(estimatedSessions);

      const newTask: Task = {
        id: uuidv4(),
        title: validatedTitle,
        estimatedSessions: validatedSessions,
        isCompleted: false,
        createdAt: Date.now(),
        completedAt: null,
      };

      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
      persistTasks();
      return newTask;
    },

    update: (id, updates) => {
      set((state) => ({
        tasks: state.tasks.map((task) => {
          if (task.id !== id) return task;

          // Validate updates
          const validatedUpdates: Partial<Task> = {};
          if (updates.title !== undefined) {
            validatedUpdates.title = validateTaskTitle(updates.title);
          }
          if (updates.estimatedSessions !== undefined) {
            validatedUpdates.estimatedSessions = validateEstimatedSessions(updates.estimatedSessions);
          }
          if (updates.isCompleted !== undefined) {
            validatedUpdates.isCompleted = updates.isCompleted;
          }
          if (updates.completedAt !== undefined) {
            validatedUpdates.completedAt = updates.completedAt;
          }

          return { ...task, ...validatedUpdates };
        }),
      }));
      persistTasks();
    },

    complete: (id) => {
      const task = get().tasks.find((t) => t.id === id);
      if (!task) {
        throw new Error(`Task not found: ${id}`);
      }
      if (task.isCompleted) {
        throw new Error(`Task already completed: ${id}`);
      }

      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id
            ? { ...t, isCompleted: true, completedAt: Date.now() }
            : t
        ),
      }));
      persistTasks();
    },

    remove: (id) => {
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        // Clear active task if it's being removed
        activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
      }));
      persistTasks();
    },

    setActive: (id) => {
      if (id !== null) {
        const task = get().tasks.find((t) => t.id === id);
        if (!task) {
          throw new Error(`Task not found: ${id}`);
        }
      }
      set({ activeTaskId: id });
      // Note: activeTaskId is NOT persisted (session-scoped)
    },

    getTasks: () => {
      return get().tasks;
    },

    getActiveTask: () => {
      const { tasks, activeTaskId } = get();
      if (!activeTaskId) return null;
      return tasks.find((t) => t.id === activeTaskId) || null;
    },
  };
};

