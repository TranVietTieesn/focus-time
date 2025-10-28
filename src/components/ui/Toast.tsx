/**
 * Toast Notification Component with auto-dismiss
 */

import { useEffect, useState } from 'react';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = toast.duration || 3000;
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onDismiss(toast.id), 300); // Match animation duration
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  const typeStyles = {
    info: 'bg-blue-500/90',
    success: 'bg-green-500/90',
    warning: 'bg-yellow-500/90',
    error: 'bg-red-500/90',
  };

  const bgColor = typeStyles[toast.type || 'info'];

  return (
    <div
      className={`
        ${bgColor} backdrop-blur-lg rounded-lg p-4 shadow-lg
        transform transition-all duration-300
        ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <p className="text-white font-medium">{toast.message}</p>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => onDismiss(toast.id), 300);
          }}
          className="text-white/80 hover:text-white transition-colors focus-ring rounded"
          aria-label="Dismiss notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface ToasterProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function Toaster({ toasts, onDismiss }: ToasterProps) {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastMessage['type'] = 'info', duration = 3000) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, dismissToast };
}

