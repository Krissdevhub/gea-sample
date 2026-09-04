
import React from 'react';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Notification Center</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          In-app alerts and official correspondence
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
          <Bell className="w-4 h-4 text-teal-700 mt-0.5" />
          <div>
            <div className="font-bold text-navy-900">Membership System Active</div>
            <div className="text-slate-600 mt-0.5">Your MP-GEA digital portal account is initialized.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
