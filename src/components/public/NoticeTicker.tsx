import React from 'react';
import Link from 'next/link';
import { Bell, ArrowRight } from 'lucide-react';

export function NoticeTicker({ notices }: { notices: { id: string; title: string; link?: string }[] }) {
  if (!notices || notices.length === 0) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 py-2.5 px-4 text-xs font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2 shrink-0 font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
          <Bell className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Notice</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap text-ellipsis flex-1">
          <span className="inline-block">
            {notices[0].title}
          </span>
        </div>
        {notices[0].link && (
          <Link
            href={notices[0].link}
            className="shrink-0 inline-flex items-center text-amber-900 font-semibold hover:underline"
          >
            Details <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
