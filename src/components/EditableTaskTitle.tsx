/**
 * EditableTaskTitle - Inline editable task name
 * Displays title with pencil icon on hover
 * Saves to state (not localStorage) on blur/Enter
 */

import { useState, useRef, useEffect } from 'react';
import { useTimer } from '@/core/timer';

export function EditableTaskTitle() {
  const type = useTimer((state) => state.type);
  const taskName = useTimer((state) => state.taskName);
  const setTaskName = useTimer((state) => state.setTaskName);
  const status = useTimer((state) => state.status);

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(taskName);
  const [isHovering, setIsHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Default task names based on session type
  const DEFAULT_NAMES = {
    work: 'Focus Session',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  // Update display when type changes
  useEffect(() => {
    if (!isEditing) {
      setEditValue(taskName || DEFAULT_NAMES[type]);
    }
  }, [type, taskName, isEditing]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmedValue = editValue.trim();
    // Save non-empty or revert to default
    if (trimmedValue) {
      setTaskName(trimmedValue);
    } else {
      setEditValue(taskName || DEFAULT_NAMES[type]);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(taskName || DEFAULT_NAMES[type]);
    setIsEditing(false);
  };

  const displayName = isEditing ? editValue : taskName || DEFAULT_NAMES[type];

  if (isEditing) {
    return (
      <div
        className="flex items-center justify-center gap-2"
        style={{
          animation: 'slideUp 0.5s ease-in-out 0.1s backwards',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          className="text-2xl font-semibold text-white text-center bg-transparent outline-none"
          style={{
            textShadow: 'var(--glow-text-sm)',
            letterSpacing: '0.025em',
            maxWidth: '400px',
            borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
            paddingBottom: '4px',
            transition: 'border-color 0.2s ease-out',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(75, 107, 251, 0.6)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
          placeholder={DEFAULT_NAMES[type]}
        />
      </div>
    );
  }

  return (
    <h1
      className="text-2xl font-semibold text-white cursor-pointer select-none flex items-center gap-2"
      style={{
        animation: 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s backwards',
        textShadow: 'var(--glow-text-sm)',
        marginBottom: 'var(--space-16)',
        letterSpacing: '0.03em',
        opacity: isHovering ? 0.9 : 0.7,
        transition: 'opacity 0.3s ease-out',
      }}
      onMouseEnter={() => {
        if (status !== 'running') {
          setIsHovering(true);
        }
      }}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        if (status !== 'running') {
          setIsEditing(true);
        }
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && status !== 'running') {
          e.preventDefault();
          setIsEditing(true);
        }
      }}
      aria-label={`Task name: ${displayName}. ${status !== 'running' ? 'Click to edit' : 'Running'}`}
    >
      <span>{displayName}</span>
      {/* Pencil icon - appears on hover when not running */}
      {isHovering && status !== 'running' && (
        <span
          style={{
            opacity: 0.7,
            transition: 'opacity 0.2s ease-out',
            fontSize: '0.85em',
            display: 'inline-flex',
            alignItems: 'center',
          }}
          aria-hidden="true"
        >
          ✏️
        </span>
      )}
    </h1>
  );
}
