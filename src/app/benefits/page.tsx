
import React from 'react';
import { Shield, FileCheck, Scale, Award, HeartHandshake, BookOpen } from 'lucide-react';

export default function BenefitsPage() {
  const benefits = [
    { title: 'Digital Membership Identity', desc: 'Secure, high-resolution Digital ID card with tamper-proof QR code verification for official presentation.', icon: FileCheck },
    { title: 'Protected Gazette Library', desc: 'Full access to confidential government circulars, promotion drafts, seniority lists, and pay revision notifications.', icon: BookOpen },
    { title: 'Cadre Grievance Advocacy', desc: 'Direct escalation of individual and collective service disparities to government ministries through association representations.', icon: Scale },
    { title: 'Site Protection & Legal Aid', desc: 'Association support against arbitrary suspensions, field harassment, and unreasonable liability enforcement.', icon: Shield },
    { title: 'Conferences & Conclaves', desc: 'Subsidized registration for State Engineering Conventions and technical symposia accredited for professional growth.', icon: Award },
    { title: 'Welfare & Solidarity Network', desc: 'Access to the association solidarity network across all 55 districts of Madhya Pradesh.', icon: HeartHandshake },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Member Value</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Membership Benefits</h1>
        <p className="text-slate-600 text-sm mt-1">Why over 2,000 Madhya Pradesh engineers belong to MP-GEA</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-teal-50 text-teal-700 rounded-lg flex items-center justify-center font-bold">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-navy-900">{b.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
