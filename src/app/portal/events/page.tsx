
import React from 'react';
import { db } from '@/lib/db';
import { Calendar, MapPin } from 'lucide-react';

export default async function MemberEventsPage() {
  const events = await db.event.findMany({
    orderBy: { eventDate: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Conferences & General Assemblies</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Upcoming association meetings and delegate registration
        </p>
      </div>

      <div className="space-y-4">
        {events.map((ev) => (
          <div key={ev.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2 text-xs text-teal-700 font-bold">
                <Calendar className="w-3.5 h-3.5 mr-1" /> {ev.eventDate} ({ev.startTime} - {ev.endTime})
              </div>
              <h3 className="font-bold text-base text-navy-900 mt-1">{ev.title}</h3>
              <p className="text-xs text-slate-500 flex items-center mt-1">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> {ev.venue}
              </p>
            </div>
            <button
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-lg transition-colors"
            >
              Confirmed RSVP ✓
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
