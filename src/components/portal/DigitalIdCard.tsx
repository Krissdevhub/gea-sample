'use client';

import React, { useRef } from 'react';
import QRCode from 'qrcode';

interface DigitalIdCardProps {
  member: {
    fullName: string;
    membershipNumber: string;
    designation: string;
    departmentName: string;
    branchName: string;
    postingDistrictName: string;
    status: string;
    cardIssuedAt?: string | null;
    photoUrl?: string | null;
    qrCodeHash?: string | null;
  };
}

export function DigitalIdCard({ member }: DigitalIdCardProps) {
  const [qrSrc, setQrSrc] = React.useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const verifyUrl = `${window.location.origin}/verify/${member.membershipNumber.replace(/\//g, '-')}`;
    QRCode.toDataURL(verifyUrl, { width: 140, margin: 1 })
      .then((url) => setQrSrc(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [member.membershipNumber]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Visual Identity Card */}
      <div
        ref={cardRef}
        className="max-w-md mx-auto bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 text-white rounded-2xl shadow-2xl overflow-hidden border-2 border-teal-500/60 p-6 relative font-sans print:shadow-none print:border-slate-800"
      >
        {/* Subtle Background Blueprint Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-teal-500/30 pb-4 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-800 rounded-xl flex items-center justify-center text-teal-300 font-bold text-2xl shadow-inner border border-teal-400">
              ⚙️
            </div>
            <div>
              <div className="text-[11px] font-semibold text-teal-400 uppercase tracking-widest">
                Madhya Pradesh
              </div>
              <div className="text-base font-extrabold tracking-tight text-white leading-tight">
                Government Engineers’ Association
              </div>
              <div className="text-[10px] text-slate-300">
                म.प्र. शासकीय अभियंता संघ (MP-GEA)
              </div>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-3 gap-4 mt-6 items-center relative z-10">
          {/* Photo */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="w-24 h-28 bg-slate-800 rounded-lg border-2 border-teal-400/80 overflow-hidden flex items-center justify-center shadow-md">
              {member.photoUrl ? (
                <img src={member.photoUrl} alt={member.fullName} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-slate-400">
                  <div className="text-3xl">👤</div>
                  <div className="text-[9px] uppercase font-bold mt-1 text-teal-400">Engineer</div>
                </div>
              )}
            </div>
            <div className="mt-2">
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                {member.status}
              </span>
            </div>
          </div>

          {/* Member Details */}
          <div className="col-span-2 space-y-1.5 text-left">
            <div>
              <div className="text-[10px] uppercase font-bold text-teal-400">Member Name</div>
              <div className="text-sm font-bold text-white tracking-tight">{member.fullName}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-teal-400">Membership Number</div>
              <div className="text-xs font-mono font-bold text-amber-300 bg-amber-950/40 px-1.5 py-0.5 rounded inline-block border border-amber-500/30">
                {member.membershipNumber}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-teal-400">Designation & Branch</div>
              <div className="text-xs text-slate-200 font-medium">
                {member.designation} ({member.branchName})
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-teal-400">Department & District</div>
              <div className="text-xs text-slate-200">
                {member.departmentName} • {member.postingDistrictName}
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer with QR */}
        <div className="mt-6 pt-4 border-t border-teal-500/30 flex items-center justify-between relative z-10">
          <div className="text-[9px] text-slate-400 space-y-0.5 max-w-[240px]">
            <p className="font-semibold text-slate-300">Official Association Identity Card</p>
            <p>Scan QR to verify official active membership on mpgea.org</p>
            <p className="text-teal-400">Issued: {member.cardIssuedAt ? new Date(member.cardIssuedAt).toLocaleDateString() : 'Active'}</p>
          </div>
          <div className="p-1 bg-white rounded-lg shadow-sm">
            {qrSrc ? (
              <img src={qrSrc} alt="Verification QR Code" className="w-16 h-16" />
            ) : (
              <div className="w-16 h-16 bg-slate-200 animate-pulse rounded" />
            )}
          </div>
        </div>
      </div>

      {/* Print / Download Button */}
      <div className="text-center print:hidden">
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-6 py-2.5 rounded-lg bg-teal-700 text-white font-semibold text-sm hover:bg-teal-800 shadow-md transition-all"
        >
          🖨️ Print / Save Digital ID Card
        </button>
      </div>
    </div>
  );
}
