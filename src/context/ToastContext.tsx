'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
}

interface ToastContextType {
  toast: {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
  };
  showToast: (message: string, type?: ToastType, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'success', title?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, message, title, type };
      setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4 toasts

      // Auto dismiss after 3.5 seconds
      setTimeout(() => {
        removeToast(id);
      }, 3500);
    },
    [removeToast]
  );

  const toast = {
    success: (msg: string, title?: string) => showToast(msg, 'success', title || 'Success'),
    error: (msg: string, title?: string) => showToast(msg, 'error', title || 'Notice'),
    info: (msg: string, title?: string) => showToast(msg, 'info', title || 'Info'),
    warning: (msg: string, title?: string) => showToast(msg, 'warning', title || 'Warning'),
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}

      {/* Floating Toast Notification Stack (Fixed Top Right / Mobile Friendly) */}
      <div className="fixed top-16 sm:top-20 right-3 sm:right-4 left-3 sm:left-auto z-[9999] flex flex-col gap-2.5 max-w-sm sm:w-full pointer-events-none">
        {toasts.map((t) => {
          const typeStyles = {
            success:
              'bg-surface/95 border-emerald-500/40 text-emerald-400 shadow-[0_8px_30px_rgb(0,0,0,0.4)]',
            error: 'bg-surface/95 border-danger/40 text-danger shadow-[0_8px_30px_rgb(0,0,0,0.4)]',
            info: 'bg-surface/95 border-accent/40 text-accent shadow-[0_8px_30px_rgb(0,0,0,0.4)]',
            warning:
              'bg-surface/95 border-amber-500/40 text-amber-400 shadow-[0_8px_30px_rgb(0,0,0,0.4)]',
          }[t.type];

          const iconName = {
            success: 'CheckCircleIcon',
            error: 'AlertCircleIcon',
            info: 'InfoIcon',
            warning: 'AlertTriangleIcon',
          }[t.type] as 'CheckCircleIcon';

          return (
            <div
              key={t.id}
              className={`pointer-events-auto border rounded-2xl p-4 backdrop-blur-xl flex items-start gap-3 transition-all duration-300 animate-slide-left ${typeStyles}`}
            >
              <div className="p-1 rounded-xl bg-elevated shrink-0 mt-0.5">
                <Icon name={iconName} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                {t.title && (
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-0.5 text-foreground">
                    {t.title}
                  </h4>
                )}
                <p className="text-xs font-medium text-foreground leading-snug">{t.message}</p>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="p-1 rounded-lg hover:bg-elevated text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <Icon name="XIcon" size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
