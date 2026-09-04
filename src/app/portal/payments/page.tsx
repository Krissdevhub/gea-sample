
import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Download } from 'lucide-react';

export default async function MemberPaymentsPage() {
  const session = await getSession();
  if (!session || !session.memberId) redirect('/login');

  const payments = await db.payment.findMany({
    where: { memberId: session.memberId },
    orderBy: { createdAt: 'desc' },
    include: { receipt: true },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Payments & Receipts</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          History of subscription payments and official tax receipts
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Receipt Number</th>
              <th className="p-4">Purpose</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Tax Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-mono font-bold text-amber-900">
                  {p.receipt?.receiptNumber || 'N/A'}
                </td>
                <td className="p-4">{p.purpose.replace(/_/g, ' ')}</td>
                <td className="p-4 font-bold text-navy-900">₹{p.amount}</td>
                <td className="p-4">{p.createdAt.toLocaleDateString()}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    {p.status}
                  </span>
                </td>
                <td className="p-4">
                  {p.receipt && (
                    <span className="text-xs font-semibold text-teal-700 font-mono">
                      Official Receipt Issued ✓
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
