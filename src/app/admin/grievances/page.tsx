
import React from 'react';
import { db } from '@/lib/db';
import { AdminGrievanceDesk } from './AdminGrievanceDesk';

export const revalidate = 0;

export default async function AdminGrievancesPage() {
  const [grievances, officers] = await Promise.all([
    db.grievance.findMany({
      include: {
        member: { include: { department: true, district: true } },
        updates: { orderBy: { createdAt: 'desc' } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    db.user.findMany({
      where: {
        roles: { some: { roleId: { in: ['SUPER_ADMIN', 'GRIEVANCE_ADMIN'] } } },
      },
      select: { id: true, email: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Cadre Grievance Dispatch Desk</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Investigate service disputes, assign officers, and record member updates
        </p>
      </div>

      <AdminGrievanceDesk initialGrievances={grievances} officers={officers} />
    </div>
  );
}
