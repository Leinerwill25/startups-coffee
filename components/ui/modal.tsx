import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footerActions,
  maxWidth = '2xl',
}: ModalProps) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      {/* Modal Dialog Card */}
      <div
        className={twMerge(
          'bg-white rounded-2xl border border-border shadow-xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200',
          widthClasses[maxWidth]
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-border bg-bg-subtle/40 flex justify-between items-center select-none">
          <div>
            {subtitle && (
              <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-[9px] font-body font-semibold uppercase tracking-wider bg-surface text-blue border-blue/20 mb-1.5">
                {subtitle}
              </span>
            )}
            {title && (
              <h3 className="font-display text-xl font-extrabold text-ink leading-tight">
                {title}
              </h3>
            )}
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-bg-subtle transition-all text-muted hover:text-ink cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto flex-grow">{children}</div>

        {/* Footer Actions (Optional) */}
        {footerActions && (
          <div className="p-6 border-t border-border bg-bg-subtle/40 flex flex-wrap gap-3 items-center justify-between">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  );
}
