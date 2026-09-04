
import React from 'react';
import { Target, Shield, BookOpen, Compass, Award, Users } from 'lucide-react';

export default function ObjectivesPage() {
  const objectives = [
    { title: 'Cadre Dignity & Parity', desc: 'Advocate for fair 4-tier time-scale promotional policies, timely DPCs (Departmental Promotion Committees), and elimination of cadre stagnation.', icon: Shield },
    { title: 'Technical Autonomy', desc: 'Safeguard engineers against arbitrary administrative pressures, ensuring technical decisions on public infrastructure remain guided by engineering standards.', icon: Compass },
    { title: 'Site Safety & Legal Protection', desc: 'Secure legal and operational protection for engineers executing public infrastructure in sensitive, remote, or high-risk field jurisdictions.', icon: Target },
    { title: 'Professional Development', desc: 'Organize state technical conferences, skill upgrading workshops, and research exchange on modern materials, seismic resilience, and digital surveying.', icon: BookOpen },
    { title: 'Transparent Governance', desc: 'Maintain complete financial and operational transparency through digitized balance sheets, auditable membership rolls, and offline elections.', icon: Award },
    { title: 'Welfare & Solidarity', desc: 'Provide mutual support, pension advocacy for retired colleagues, and rapid assistance to families of engineers during medical emergencies or bereavements.', icon: Users },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Aims & Mission</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Vision & Objectives</h1>
        <p className="text-slate-600 text-sm mt-1">Guiding principles of the Madhya Pradesh Government Engineers’ Association</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {objectives.map((obj, i) => {
          const Icon = obj.icon;
          return (
            <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-teal-50 text-teal-700 rounded-lg flex items-center justify-center font-bold">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-navy-900">{obj.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{obj.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
