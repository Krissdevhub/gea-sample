import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { hasPermission } from '@/lib/rbac';
import { AdminNav } from '@/components/admin/AdminNav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session || !hasPermission(session, 'ACCESS_ADMIN_PORTAL')) {
    redirect('/login?next=/admin');
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-slate-100">
      <AdminNav roles={session.roles} />
      <div className="flex-1 p-4 sm:p-8 max-w-7xl overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
