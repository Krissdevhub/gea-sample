'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CorrectionForm({ memberId }: { memberId: string }) {
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/applications/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, notes }),
      });

      if (res.ok) {
        alert('Correction submitted! Your application is back under review.');
        router.refresh();
      } else {
        alert('Failed to submit correction.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-xl border border-amber-300">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          Submit Correction Details / Explanatory Note *
        </label>
        <textarea
          required
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Clarify requested information or confirm document re-submission..."
          className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-md text-xs transition-colors disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Resubmit for Scrutiny'}
      </button>
    </form>
  );
}
