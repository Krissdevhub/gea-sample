
import React from 'react';
import { db } from '@/lib/db';

export default async function AdminEventsPage() {
  const events = await db.event.findMany({
    orderBy: { eventDate: 'asc' },
    include: { registrations: true },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Conferences & Event Management</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage state conventions, general assemblies, and track member attendance
        </p>
      </div>

      <div className="space-y-4">
        {events.map((ev) => (
          <div key={ev.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <div className="text-xs text-teal-700 font-bold">{ev.eventDate}</div>
              <h3 className="font-bold text-base text-navy-900 mt-1">{ev.title}</h3>
              <div className="text-xs text-slate-500 mt-0.5">Venue: {ev.venue}</div>
            </div>
            <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-full">
              {ev.registrations.length} / {ev.capacity} Registered
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
