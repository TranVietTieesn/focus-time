/**
 * Task Drawer - Slide-in panel for task management
 */

import { useState } from 'react';
import { useStore } from '@/store';
import { TaskList } from './TaskList';
import { TaskCreateForm } from './TaskCreateForm';

interface TaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDrawer({ isOpen, onClose }: TaskDrawerProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-50 w-80 glass-panel
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:w-72
          flex flex-col overflow-hidden
        `}
        role="complementary"
        aria-label="Task management"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold font-display">Tasks</h2>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors focus-ring"
            aria-label="Close task drawer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-4">
          <TaskList />
        </div>

        {/* Create Form */}
        <div className="p-4 border-t border-white/10">
          <TaskCreateForm />
        </div>
      </aside>
    </>
  );
}

