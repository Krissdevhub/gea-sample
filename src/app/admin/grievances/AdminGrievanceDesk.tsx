'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminGrievanceDesk({ initialGrievances, officers }: { initialGrievances: any[]; officers: any[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>(initialGrievances[0]?.id || '');
  const [status, setStatus] = useState('UNDER_REVIEW');
  const [assignedTo, setAssignedTo] = useState('');
  const [message, setMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedGrievance = initialGrievances.find((g) => g.id === selectedId);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) {
      alert('Please enter an update message.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/grievances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grievanceId: selectedId,
          status,
          assignedTo: assignedTo || undefined,
          message,
          isInternal,
        }),
      });

      if (res.ok) {
        alert('Grievance ticket updated successfully!');
        setMessage('');
        router.refresh();
      } else {
        alert('Failed to update ticket.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
        <div className="font-bold text-xs uppercase text-slate-500 tracking-wider">
          All Tickets ({initialGrievances.length})
        </div>
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {initialGrievances.map((g) => (
            <div
              key={g.id}
              onClick={() => setSelectedId(g.id)}
              className={`p-3 rounded-xl cursor-pointer border text-xs transition-all ${
                selectedId === g.id
                  ? 'bg-amber-50/70 border-amber-400 font-semibold'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-amber-900">{g.referenceNumber}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                  {g.status}
                </span>
              </div>
              <div className="font-bold text-navy-900 mt-1 truncate">{g.subject}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {g.member.fullName} ({g.member.department.name})
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedGrievance && (
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                {selectedGrievance.referenceNumber}
              </span>
              <h2 className="text-xl font-extrabold text-navy-900 mt-1">{selectedGrievance.subject}</h2>
              <p className="text-xs text-slate-500">
                Filed by: <strong>{selectedGrievance.member.fullName}</strong> ({selectedGrievance.member.designation}, {selectedGrievance.member.department.name})
              </p>
            </div>
            <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-full">
              {selectedGrievance.status}
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-500 block uppercase text-[10px]">Description:</span>
            <p className="text-slate-700 leading-relaxed">{selectedGrievance.description}</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4 pt-4 border-t border-slate-100 text-xs">
            <h3 className="font-bold text-sm text-navy-900">Post Case Update or Modify Status</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Update Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="UNDER_REVIEW">UNDER REVIEW</option>
                  <option value="ASSIGNED">ASSIGNED TO OFFICER</option>
                  <option value="REPRESENTATION_PREPARED">REPRESENTATION PREPARED</option>
                  <option value="SUBMITTED_TO_AUTHORITY">SUBMITTED TO GOVERNMENT</option>
                  <option value="RESPONSE_RECEIVED">GOVT RESPONSE RECEIVED</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assign Investigating Officer</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="">-- Leave Unchanged --</option>
                  {officers.map((o) => (
                    <option key={o.id} value={o.id}>{o.email}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Case Notes / Message *</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="State action taken or official progress summary..."
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="internalCheck"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="internalCheck" className="text-slate-700 font-semibold">
                Internal Note Only (Hidden from member)
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-lg transition-colors shadow disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Post Case Progress'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
