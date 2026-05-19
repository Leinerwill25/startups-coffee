import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  pill = false,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-body font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants = {
    primary: 'bg-blue text-white hover:bg-blue-dark shadow-sm border border-transparent',
    secondary: 'border border-blue text-blue hover:bg-surface/50 bg-transparent',
    ghost: 'text-muted hover:text-ink hover:bg-bg-subtle bg-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm border border-transparent',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-7 py-3.5 text-base rounded-2xl',
  };

  const pills = {
    sm: 'px-5 py-1.5 text-xs rounded-full',
    md: 'px-7 py-2.5 text-sm rounded-full',
    lg: 'px-9 py-3.5 text-base rounded-full',
  };

  const radiusClass = pill ? pills[size] : sizes[size];

  return (
    <button
      className={twMerge(baseStyles, variants[variant], radiusClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
