import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'cream' | 'success' | 'warning' | 'muted';
}

export default function Badge({
  className,
  variant = 'blue',
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-body font-semibold border select-none transition-colors';

  const variants = {
    blue: 'bg-surface border-blue/20 text-blue',
    cream: 'bg-surface/60 border-border text-muted uppercase',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    muted: 'bg-bg-subtle border-border text-muted',
  };

  return (
    <span
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
