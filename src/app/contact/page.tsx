
'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', mobile: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Secretariat</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Contact MP-GEA</h1>
        <p className="text-slate-600 text-sm mt-1">State Headquarters and Public Enquiry Desk</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6 text-sm text-slate-700">
          <div>
            <h3 className="text-base font-bold text-navy-900">Headquarters Office</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Madhya Pradesh Government Engineers’ Association<br />
              Nirman Bhawan, Arera Hills, Bhopal - 462011 (M.P.)
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-navy-900">Office Working Hours</h3>
            <p className="text-xs text-slate-600 mt-1">
              Monday to Friday: 10:30 AM to 05:30 PM<br />
              Closed on State Public Holidays and Second/Third Saturdays
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-navy-900">Official Contact Emails</h3>
            <div className="text-xs text-slate-600 mt-1 space-y-1">
              <p>General Enquiries: <span className="text-teal-700 font-semibold">info@mpgea.org</span></p>
              <p>President’s Cell: <span className="text-teal-700 font-semibold">president@mpgea.org</span></p>
              <p>General Secretary: <span className="text-teal-700 font-semibold">secretary@mpgea.org</span></p>
              <p>Cadre Grievance Cell: <span className="text-teal-700 font-semibold">grievance@mpgea.org</span></p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-navy-900 mb-4">Send an Enquiry</h3>
          {status === 'success' && (
            <div className="p-3 mb-4 bg-emerald-50 text-emerald-800 rounded text-xs font-semibold">
              Thank you! Your message has been sent to the MP-GEA Secretariat.
            </div>
          )}
          {status === 'error' && (
            <div className="p-3 mb-4 bg-rose-50 text-rose-800 rounded text-xs font-semibold">
              Failed to send message. Please try again or email directly.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Message *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <button
              disabled={status === 'submitting'}
              type="submit"
              className="w-full py-2.5 bg-teal-700 text-white font-bold rounded-md hover:bg-teal-800 transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
