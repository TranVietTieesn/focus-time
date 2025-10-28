/**
 * FocusTitle - Inline editable session title component
 * VTea UI Makeover: Editable title above timer, auto-fills from active task
 */

import { useState, useEffect, useRef } from 'react';
import { useStore } from '@/store';

export function FocusTitle() {
  const activeTask = useStore((state) => {
    const tasks = state.tasks;
    const activeTaskId = state.activeTaskId;
    return tasks.find(t => t.id === activeTaskId) || null;
  });

  const [title, setTitle] = useState('Untitled Session');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-fill from active task
  useEffect(() => {
    if (activeTask) {
      setTitle(activeTask.title);
    } else {
      setTitle('Untitled Session');
    }
  }, [activeTask]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (!title.trim()) {
      setTitle('Untitled Session');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setTitle(activeTask?.title || 'Untitled Session');
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div className="text-center mb-4">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-b border-white/30 text-2xl md:text-3xl font-semibold text-white/90 text-center focus:outline-none focus:border-white/60 transition-colors px-2 py-1 w-full max-w-md mx-auto"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          aria-label="Edit session title"
          maxLength={100}
        />
      ) : (
        <h2
          onClick={handleClick}
          className="text-2xl md:text-3xl font-semibold cursor-text hover:text-white/100 transition-colors px-2 py-1"
          style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 600,
            color: title === 'Untitled Session' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.9)'
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          {title}
        </h2>
      )}
    </div>
  );
}

