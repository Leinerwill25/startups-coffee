import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={twMerge(
        'animate-pulse rounded bg-border/60',
        className
      )}
      {...props}
    />
  );
}
