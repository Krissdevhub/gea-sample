
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function VerifySearchPage() {
  const router = useRouter();
  const [num, setNum] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!num) return;
    const sanitized = num.trim().replace(/\//g, '-');
    router.push(`/verify/${sanitized}`);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6 text-center">
        <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center text-2xl mx-auto">
          🔍
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Verify Digital Membership</h1>
          <p className="text-xs text-slate-500 mt-1">Enter the official MP-GEA Membership Number</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4 text-xs">
          <input
            required
            type="text"
            placeholder="e.g. MPGEA/2026/000001"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm text-center font-mono font-bold uppercase focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-sm transition-colors shadow-md"
          >
            Verify Credentials
          </button>
        </form>
      </div>
    </div>
  );
}
