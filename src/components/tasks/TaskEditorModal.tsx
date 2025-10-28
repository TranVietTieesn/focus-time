/**
 * Task Editor Modal - Edit existing task details
 */

import { useState, FormEvent } from 'react';
import { useStore } from '@/store';
import type { Task } from '@/types';
import { Modal } from '../ui/Modal';

interface TaskEditorModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskEditorModal({ task, isOpen, onClose }: TaskEditorModalProps) {
  const [title, setTitle] = useState(task.title);
  const [estimatedSessions, setEstimatedSessions] = useState(
    task.estimatedSessions?.toString() || ''
  );
  const [error, setError] = useState('');

  const update = useStore((state) => state.update);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      const sessions = estimatedSessions ? parseInt(estimatedSessions, 10) : null;
      update(task.id, {
        title,
        estimatedSessions: sessions,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-white/80 mb-2">
            Task Title
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="
              w-full px-3 py-2 rounded-lg
              bg-white/10 border border-white/20
              text-white placeholder-white/40
              focus:outline-none focus:ring-2 focus:ring-primary
              transition-all
            "
            maxLength={200}
            autoFocus
          />
        </div>

        {/* Estimated Sessions Input */}
        <div>
          <label htmlFor="task-sessions" className="block text-sm font-medium text-white/80 mb-2">
            Estimated Sessions (optional)
          </label>
          <input
            id="task-sessions"
            type="number"
            value={estimatedSessions}
            onChange={(e) => setEstimatedSessions(e.target.value)}
            placeholder="Number of sessions"
            min="1"
            max="99"
            className="
              w-full px-3 py-2 rounded-lg
              bg-white/10 border border-white/20
              text-white placeholder-white/40
              focus:outline-none focus:ring-2 focus:ring-primary
              transition-all
            "
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-sm" role="alert">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              flex-1 px-4 py-2 rounded-lg
              bg-white/10 hover:bg-white/20
              text-white font-medium
              transition-colors focus-ring
            "
          >
            Cancel
          </button>
          <button
            type="submit"
            className="
              flex-1 px-4 py-2 rounded-lg
              bg-primary hover:bg-primary-dark
              text-white font-medium
              transition-colors focus-ring
            "
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

