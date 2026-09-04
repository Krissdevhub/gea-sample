'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function GrievanceForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    category: 'PAY_ALLOWANCE',
    subject: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/grievances/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Grievance submitted successfully! Reference Number: ${data.referenceNumber}`);
        setForm({ category: 'PAY_ALLOWANCE', subject: '', description: '' });
        router.refresh();
      } else {
        alert(data.error || 'Submission failed.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div>
        <label className="block font-semibold text-slate-700 mb-1">Grievance Category *</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
        >
          <option value="PROMOTION">Promotion / DPC Disparity</option>
          <option value="TRANSFER">Transfer Policy Violation</option>
          <option value="SENIORITY">Cadre Seniority List Dispute</option>
          <option value="PAY_ALLOWANCE">Pay Scale / Site Allowance Fixation</option>
          <option value="WORKING_CONDITIONS">Working Conditions & Field Resources</option>
          <option value="PENSION">Pension / Superannuation Matters</option>
          <option value="WORKPLACE_SAFETY">Workplace Safety & Protection</option>
          <option value="OTHER">Other Professional Matter</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold text-slate-700 mb-1">Subject / Summary *</label>
        <input
          required
          type="text"
          placeholder="e.g. Fixation of Grade Pay under 7th CPC"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block font-semibold text-slate-700 mb-1">Detailed Description *</label>
        <textarea
          required
          rows={5}
          placeholder="State service background, department order references, and desired redressal..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-xs transition-colors shadow disabled:opacity-50"
      >
        {loading ? 'Submitting Grievance...' : 'Submit Grievance Ticket'}
      </button>
    </form>
  );
}
