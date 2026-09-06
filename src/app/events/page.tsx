
import React from 'react';
import { db } from '@/lib/db';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default async function EventsPage() {
  let events: Awaited<ReturnType<typeof db.event.findMany>> = [];
  try {
    events = await db.event.findMany({
      where: { visibility: 'PUBLIC' },
      orderBy: { eventDate: 'asc' },
    });
  } catch { /* DB not available in demo mode */ }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Conferences & Meetings</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Association Events</h1>
        <p className="text-slate-600 text-sm mt-1">State conventions, technical workshops, and General Body assemblies</p>
      </div>

      <div className="space-y-6">
        {events.map((ev) => (
          <div key={ev.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 font-bold text-xs rounded-full border border-teal-200">
                Official Convention
              </span>
              <span className="text-xs text-slate-500">Capacity: {ev.capacity} delegates</span>
            </div>
            <h3 className="text-xl font-bold text-navy-900">{ev.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{ev.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
              <div className="flex items-center"><Calendar className="w-4 h-4 mr-1.5 text-teal-700" /> {ev.eventDate}</div>
              <div className="flex items-center"><Clock className="w-4 h-4 mr-1.5 text-teal-700" /> {ev.startTime} - {ev.endTime}</div>
              <div className="flex items-center"><MapPin className="w-4 h-4 mr-1.5 text-teal-700" /> {ev.venue}</div>
            </div>
            <div className="pt-2">
              <Link
                href="/login?next=/portal/events"
                className="inline-flex items-center px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-md hover:bg-teal-800"
              >
                Register as Member →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
