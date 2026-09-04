
import React from 'react';
import { db } from '@/lib/db';
import { Download } from 'lucide-react';

export default async function AdminPaymentsPage() {
  const payments = await db.payment.findMany({
    include: {
      member: { include: { department: true } },
      receipt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Financial Ledger & Collections</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Razorpay gateway transactions and official membership fee receipts
          </p>
        </div>
        <a
          href="/api/admin/export?type=payments"
          className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" /> Export Ledger (CSV)
        </a>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Receipt Number</th>
                <th className="p-4">Member Name</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Gateway Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="p-4 font-mono font-bold text-amber-900">{p.receipt?.receiptNumber || 'N/A'}</td>
                  <td className="p-4 font-bold text-navy-900">{p.member.fullName}</td>
                  <td className="p-4 font-bold text-emerald-700">₹{p.amount}</td>
                  <td className="p-4 font-mono text-slate-500 text-[11px]">{p.razorpayOrderId}</td>
                  <td className="p-4">{p.createdAt.toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
