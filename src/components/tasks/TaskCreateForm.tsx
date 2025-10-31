/**
 * Task Create Form - Inline form for creating new tasks
 */

import { useState, FormEvent } from 'react';
import { useStore } from '@/store';

export function TaskCreateForm() {
  const [title, setTitle] = useState('');
  const [estimatedSessions, setEstimatedSessions] = useState('');
  const [error, setError] = useState('');

  const create = useStore((state) => state.create);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      const sessions = estimatedSessions ? parseInt(estimatedSessions, 10) : null;
      create(title, sessions);
      
      // Reset form
      setTitle('');
      setEstimatedSessions('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Title Input */}
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="
            w-full px-3 py-2 rounded-lg
            bg-white/10 border border-white/20
            text-white placeholder-white/40
            focus:outline-none focus:ring-2 focus:ring-primary
            transition-all
          "
          maxLength={200}
        />
      </div>

      {/* Optional Sessions Input */}
      <div className="flex gap-2">
        <input
          type="number"
          value={estimatedSessions}
          onChange={(e) => setEstimatedSessions(e.target.value)}
          placeholder="Sessions"
          min="1"
          max="99"
          className="
            w-24 px-3 py-2 rounded-lg
            bg-white/10 border border-white/20
            text-white placeholder-white/40
            focus:outline-none focus:ring-2 focus:ring-primary
            transition-all
          "
        />
        <button
          type="submit"
          className="
            flex-1 px-4 py-2 rounded-lg
            bg-primary hover:bg-primary-dark
            text-white font-medium
            transition-colors focus-ring
          "
        >
          Add Task
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-sm" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

