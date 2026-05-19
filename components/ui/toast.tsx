import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error' | 'warning';
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = 'success',
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: AlertCircle,
  };

  const IconComponent = icons[type];

  const containerStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    error: 'bg-rose-50 border-rose-200 text-rose-950',
    warning: 'bg-amber-50 border-amber-200 text-amber-950',
    info: 'bg-indigo-50 border-indigo-200 text-indigo-950',
  };

  const iconStyles = {
    success: 'text-emerald-600',
    error: 'text-rose-600',
    warning: 'text-amber-600',
    info: 'text-indigo-600',
  };

  return (
    <div
      className={twMerge(
        'fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300 select-none max-w-sm',
        containerStyles[type]
      )}
      role="alert"
    >
      <IconComponent className={twMerge('h-5 w-5 shrink-0', iconStyles[type])} />
      <span className="font-body text-xs font-semibold leading-relaxed flex-grow">{message}</span>
      <button
        onClick={onClose}
        className="text-muted hover:text-ink transition-colors cursor-pointer shrink-0"
        aria-label="Cerrar"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
