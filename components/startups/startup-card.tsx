import React from 'react';
import { Startup } from '@/lib/supabase/types';
import Badge from '@/components/ui/badge';
import { MapPin, Globe, Instagram } from 'lucide-react';

interface StartupCardProps {
  startup: Startup;
}

export default function StartupCard({ startup }: StartupCardProps) {
  // Extract initials
  const initials = startup.name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  // Parse link
  const link = startup.website_or_ig || '';
  const isIg = link.startsWith('@');
  const href = isIg
    ? `https://instagram.com/${link.substring(1)}`
    : link.startsWith('http')
    ? link
    : `https://${link}`;

  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-blue transition-all duration-200 flex flex-col justify-between h-[16.5rem] group select-none">
      <div>
        {/* Header Avatar & Branding */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="h-10 w-10 rounded-xl bg-blue flex items-center justify-center text-white text-xs font-bold shrink-0 tracking-wider">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-extrabold text-base text-ink leading-tight truncate group-hover:text-blue transition-colors">
              {startup.name}
            </h3>
            <span className="text-[10px] font-body text-muted leading-tight block truncate mt-0.5">
              por <span className="font-semibold text-ink/75">{startup.founders}</span>
            </span>
          </div>
        </div>

        {/* Short clamped description */}
        <p className="font-body text-muted text-xs leading-relaxed line-clamp-3 mb-4 select-text">
          {startup.description}
        </p>
      </div>

      {/* Badges and Footer */}
      <div>
        {/* Industry and Stage tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge variant="muted">{startup.industry}</Badge>
          <Badge variant="blue" className="uppercase">
            {startup.stage}
          </Badge>
        </div>

        {/* Footer actions */}
        <div className="flex justify-between items-center text-[10px] font-body font-semibold text-ink border-t border-border/60 pt-3">
          <div className="flex items-center gap-1 text-muted">
            <MapPin className="h-3.5 w-3.5 text-blue" />
            <span className="uppercase tracking-wider">{startup.city}</span>
          </div>

          {startup.website_or_ig ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue hover:text-blue-dark transition-colors"
            >
              {isIg ? (
                <>
                  <Instagram className="h-3.5 w-3.5" />
                  <span>Instagram ↗</span>
                </>
              ) : (
                <>
                  <Globe className="h-3.5 w-3.5" />
                  <span>Web ↗</span>
                </>
              )}
            </a>
          ) : (
            <span className="text-muted/65 italic font-medium">Sin contacto</span>
          )}
        </div>
      </div>
    </div>
  );
}
