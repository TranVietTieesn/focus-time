/**
 * Tasks Slice Interface
 * 
 * Defines the state and actions for task management.
 * Handles CRUD operations and active task selection.
 * 
 * @see data-model.md for detailed specifications
 */

import type { Task, TaskUpdateInput } from './types';

/**
 * Tasks slice state and actions
 */
export interface TasksSlice {
  // ============================================================================
  // State
  // ============================================================================
  
  /** Array of all tasks (persisted to localStorage) */
  tasks: Task[];
  
  /** Currently active task ID (session-scoped, not persisted) */
  activeTaskId: string | null;
  
  // ============================================================================
  // Actions
  // ============================================================================
  
  /**
   * Create a new task
   * 
   * @param title - Task title (1-200 characters)
   * @param estimatedSessions - Optional session estimate (1-99)
   * @returns Created Task object
   * 
   * Preconditions:
   * - title must be 1-200 characters (after trim)
   * - estimatedSessions (if provided) must be 1-99
   * 
   * Effects:
   * - Generates new UUID for task
   * - Creates Task with isCompleted=false, createdAt=now
   * - Adds to tasks array
   * - Persists to localStorage (FT_TASKS_v1)
   * 
   * Throws:
   * - Error if validation fails
   */
  create: (title: string, estimatedSessions?: number | null) => Task;
  
  /**
   * Update an existing task
   * 
   * @param id - Task ID
   * @param updates - Partial task fields to update
   * 
   * Preconditions:
   * - Task with id must exist
   * - Updates must pass validation
   * 
   * Effects:
   * - Finds task by id
   * - Merges updates with existing fields
   * - Persists to localStorage
   * 
   * Throws:
   * - Error if task not found
   * - Error if validation fails
   */
  update: (id: string, updates: TaskUpdateInput) => void;
  
  /**
   * Mark a task as completed
   * 
   * @param id - Task ID
   * 
   * Preconditions:
   * - Task with id must exist
   * - Task isCompleted must be false
   * 
   * Effects:
   * - Sets isCompleted=true
   * - Sets completedAt=now
   * - Persists to localStorage
   */
  complete: (id: string) => void;
  
  /**
   * Delete a task
   * 
   * @param id - Task ID
   * 
   * Preconditions:
   * - Task with id must exist
   * 
   * Effects:
   * - Removes task from tasks array
   * - If activeTaskId===id, sets activeTaskId=null
   * - Persists to localStorage
   */
  remove: (id: string) => void;
  
  /**
   * Set the active task (for associating with current session)
   * 
   * @param id - Task ID or null to clear
   * 
   * Preconditions:
   * - If id is not null, task must exist
   * 
   * Effects:
   * - Sets activeTaskId
   * - Does NOT persist (session-scoped)
   */
  setActive: (id: string | null) => void;
  
  /**
   * Get all tasks
   * 
   * @returns Copy of tasks array
   */
  getTasks: () => Task[];
  
  /**
   * Get currently active task
   * 
   * @returns Active Task object or null
   */
  getActiveTask: () => Task | null;
}

