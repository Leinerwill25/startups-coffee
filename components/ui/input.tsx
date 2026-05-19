import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, ...props }, ref) => {
    return (
      <div className="w-full font-body">
        {label && (
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2 select-none">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={twMerge(
            'w-full px-4 py-2.5 bg-white border rounded-xl text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all',
            error ? 'border-red-500 ring-1 ring-red-500' : 'border-border',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs font-semibold text-red-600 animate-in fade-in duration-150">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  charCount?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, charCount, ...props }, ref) => {
    return (
      <div className="w-full font-body">
        <div className="flex justify-between items-center mb-2">
          {label && (
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider select-none">
              {label}
            </label>
          )}
          {charCount && (
            <span className="text-xs text-muted font-mono select-none">
              {charCount}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          className={twMerge(
            'w-full px-4 py-2.5 bg-white border rounded-xl text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all resize-none',
            error ? 'border-red-500 ring-1 ring-red-500' : 'border-border',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs font-semibold text-red-600 animate-in fade-in duration-150">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
