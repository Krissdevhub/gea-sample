'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, AlertTriangle, XCircle, FileText, Download } from 'lucide-react';

export function VerificationWorkbench({ initialMembers }: { initialMembers: any[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>(initialMembers[0]?.id || '');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedMember = initialMembers.find((m) => m.id === selectedId);

  const handleAction = async (action: 'APPROVE' | 'REQUEST_CORRECTION' | 'REJECT') => {
    if (action === 'REQUEST_CORRECTION' && !reason) {
      alert('Please enter the specific correction instructions for the member.');
      return;
    }

    if (!confirm(`Are you sure you want to ${action} this application?`)) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: selectedId,
          action,
          reason,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Application successfully updated: ${action}`);
        setReason('');
        router.refresh();
      } else {
        alert(data.error || 'Action failed.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setLoading(false);
    }
  };

  if (initialMembers.length === 0) {
    return (
      <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
        <div className="text-4xl">🎉</div>
        <h2 className="text-lg font-bold text-navy-900">All Applications Scrutinized</h2>
        <p className="text-xs text-slate-500">There are currently no pending applications in the verification queue.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left List */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-4 space-y-3">
        <div className="font-bold text-xs uppercase text-slate-500 tracking-wider">
          Pending Applications ({initialMembers.length})
        </div>
        <div className="space-y-2 max-h-[650px] overflow-y-auto">
          {initialMembers.map((m) => (
            <div
              key={m.id}
              onClick={() => { setSelectedId(m.id); setReason(''); }}
              className={`p-3 rounded-xl cursor-pointer border transition-all text-xs ${
                selectedId === m.id
                  ? 'bg-amber-50/70 border-amber-400 font-semibold'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-navy-900">{m.fullName}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                  {m.status}
                </span>
              </div>
              <div className="text-slate-500 mt-1">
                {m.designation} • {m.department.name}
              </div>
              <div className="text-[11px] text-teal-700 mt-0.5">
                District: {m.district.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Detail Pane */}
      {selectedMember && (
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase">Application Scrutiny</span>
              <h2 className="text-xl font-extrabold text-navy-900">{selectedMember.fullName}</h2>
              <p className="text-xs text-slate-500">
                Applied on: {new Date(selectedMember.createdAt).toLocaleString()}
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
              {selectedMember.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Government Employee ID</span>
              <span className="font-bold text-navy-900 font-mono">{selectedMember.employeeId}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Department</span>
              <span className="font-bold text-navy-900">{selectedMember.department.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Designation</span>
              <span className="font-bold text-navy-900">{selectedMember.designation}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Engineering Branch</span>
              <span className="font-bold text-navy-900">{selectedMember.branch.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Posting District</span>
              <span className="font-bold text-navy-900">{selectedMember.district.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Date of Joining</span>
              <span className="font-bold text-navy-900">{selectedMember.dateOfJoining}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-navy-900">Uploaded Departmental Proofs</h3>
            {selectedMember.documents.length === 0 ? (
              <p className="text-xs text-rose-600 font-semibold">No proof document uploaded!</p>
            ) : (
              <div className="space-y-2">
                {selectedMember.documents.map((d: any) => (
                  <div key={d.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-teal-700" />
                      <div>
                        <div className="font-bold text-navy-900">{d.originalFilename}</div>
                        <div className="text-[10px] text-slate-500">
                          {d.documentType} • {(d.fileSize / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>
                    <a
                      href={`/api/documents/stream?id=${d.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-3 py-1.5 bg-teal-700 text-white font-bold rounded text-xs hover:bg-teal-800"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" /> View Proof
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-navy-900">
              Scrutiny Decision Note (Mandatory for Correction / Rejection):
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Please re-upload legible scan of official posting order or provide Treasury PRAN ID..."
              className="w-full p-3 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
            />

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                disabled={loading}
                onClick={() => handleAction('APPROVE')}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow transition-colors disabled:opacity-50"
              >
                ✓ Approve Credentials
              </button>

              <button
                disabled={loading}
                onClick={() => handleAction('REQUEST_CORRECTION')}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow transition-colors disabled:opacity-50"
              >
                ⚠️ Request Member Correction
              </button>

              <button
                disabled={loading}
                onClick={() => handleAction('REJECT')}
                className="px-6 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-lg shadow transition-colors disabled:opacity-50"
              >
                ✕ Reject Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
