import React from 'react';
import Skeleton from '@/components/ui/skeleton';
import Badge from '@/components/ui/badge';
import { Mic } from 'lucide-react';

export default function EpisodeSkeleton() {
  const cards = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
      {cards.map((_, idx) => (
        <div
          key={idx}
          className="bg-white border border-border rounded-2xl p-4 shadow-xs flex flex-col justify-between h-[21rem] hover:border-blue/30 transition-all duration-300 group"
        >
          <div>
            {/* Aspect 16:9 Gray Thumbnail Shimmer */}
            <div className="relative aspect-video w-full rounded-xl bg-bg-subtle border border-border/40 overflow-hidden mb-4 shrink-0 flex items-center justify-center text-muted/30">
              {/* Shimmer overlay sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
              <Mic className="h-8 w-8 text-border/60 animate-pulse" />
            </div>

            {/* Shimmer Title lines */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-10 bg-surface text-blue border-blue/20" />
                <div className="h-2.5 bg-border rounded w-16 animate-pulse" />
              </div>
              <Skeleton className="h-4.5 bg-border rounded w-11/12 animate-pulse" />
              <Skeleton className="h-4.5 bg-border rounded w-3/4 animate-pulse" />
            </div>
          </div>

          {/* Bottom Badge details */}
          <div className="border-t border-border/50 pt-4 flex justify-between items-center">
            <Badge variant="blue" className="bg-blue/10 border-blue/15 text-blue gap-1 py-1">
              🎙 Próximamente
            </Badge>
            <div className="h-3 bg-border rounded w-12 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
