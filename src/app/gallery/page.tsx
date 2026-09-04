
import React from 'react';

export default function GalleryPage() {
  const albums = [
    { title: 'State Engineering Convention 2025 (Ravindra Bhavan, Bhopal)', count: '24 Photographs', date: 'Nov 2025' },
    { title: 'Delegation to Hon’ble Chief Minister & Mantralaya Discussions', count: '12 Photographs', date: 'Oct 2025' },
    { title: 'District Office Bearers Conclave - Central Zone', count: '18 Photographs', date: 'Sep 2025' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Photo Archive</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Photo Gallery</h1>
        <p className="text-slate-600 text-sm mt-1">Conventions, assemblies, and official delegations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {albums.map((al, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-44 bg-slate-800 flex items-center justify-center text-4xl text-slate-600">
              📷
            </div>
            <div className="p-4 space-y-1">
              <div className="text-[10px] font-bold uppercase text-teal-700">{al.date} • {al.count}</div>
              <h3 className="font-bold text-sm text-navy-900">{al.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
