import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-400 border-t-4 border-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-800 rounded flex items-center justify-center text-teal-300 font-bold text-xl">
                ⚙️
              </div>
              <div>
                <span className="font-bold text-white text-lg block">MP-GEA</span>
                <span className="text-xs text-slate-300">Madhya Pradesh Government Engineers’ Association</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The apex recognized digital platform and representative body for over 2,000 gazetted and non-gazetted engineers serving in departments of the Government of Madhya Pradesh.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>📍 <strong>Headquarters:</strong> Nirman Bhawan, Arera Hills, Bhopal - 462011 (M.P.)</p>
              <p>✉️ <strong>Official Email:</strong> info@mpgea.org</p>
              <p>📞 <strong>State Secretariat:</strong> +91 (0755) 244-0199</p>
            </div>
          </div>

          {/* Col 2: Institutional */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Governance
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Association</Link></li>
              <li><Link href="/objectives" className="hover:text-teal-400 transition-colors">Vision & Charter</Link></li>
              <li><Link href="/constitution" className="hover:text-teal-400 transition-colors">Constitution & Bylaws</Link></li>
              <li><Link href="/governance" className="hover:text-teal-400 transition-colors">Executive Council</Link></li>
              <li><Link href="/office-bearers" className="hover:text-teal-400 transition-colors">State Office Bearers</Link></li>
              <li><Link href="/organisation" className="hover:text-teal-400 transition-colors">Organisational Structure</Link></li>
            </ul>
          </div>

          {/* Col 3: Services & Members */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/join" className="hover:text-teal-400 transition-colors">Join MP-GEA</Link></li>
              <li><Link href="/login" className="hover:text-teal-400 transition-colors">Member Portal</Link></li>
              <li><Link href="/orders" className="hover:text-teal-400 transition-colors">Government Orders</Link></li>
              <li><Link href="/circulars" className="hover:text-teal-400 transition-colors">Departmental Circulars</Link></li>
              <li><Link href="/representations" className="hover:text-teal-400 transition-colors">Cadre Representations</Link></li>
              <li><Link href="/elections" className="hover:text-teal-400 transition-colors">Offline Election Cell</Link></li>
              <li><Link href="/verify/search" className="hover:text-teal-400 transition-colors">Verify Digital ID</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal & Transparency */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Policies & Compliance
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/financials" className="hover:text-teal-400 transition-colors">Financial Transparency</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-teal-400 transition-colors">Terms of Use</Link></li>
              <li><Link href="/membership-terms" className="hover:text-teal-400 transition-colors">Membership Terms</Link></li>
              <li><Link href="/refund-policy" className="hover:text-teal-400 transition-colors">Refund & Cancellation</Link></li>
              <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Public Grievance Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Madhya Pradesh Government Engineers’ Association (MP-GEA). All Rights Reserved.</p>
          <p className="text-slate-500">
            Official association portal. Strictly physical offline elections. No online voting is conducted on this platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
