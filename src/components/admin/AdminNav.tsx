'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UserCheck,
  Users,
  CreditCard,
  FileText,
  AlertTriangle,
  Vote,
  Calendar,
  DollarSign,
  ShieldCheck,
  Sliders,
  History,
  LogOut,
} from 'lucide-react';

interface AdminNavProps {
  roles: string[];
}

export function AdminNav({ roles }: AdminNavProps) {
  const pathname = usePathname();

  const isSuper = roles.includes('SUPER_ADMIN');

  const links = [
    { href: '/admin', label: 'Overview Dashboard', icon: LayoutDashboard, visible: true },
    { href: '/admin/verification', label: 'Verification Queue', icon: UserCheck, visible: isSuper || roles.includes('MEMBERSHIP_ADMIN') || roles.includes('DISTRICT_ADMIN') },
    { href: '/admin/members', label: 'Member Master List', icon: Users, visible: isSuper || roles.includes('MEMBERSHIP_ADMIN') || roles.includes('DISTRICT_ADMIN') },
    { href: '/admin/payments', label: 'Payments & Ledger', icon: CreditCard, visible: isSuper || roles.includes('FINANCE_ADMIN') },
    { href: '/admin/grievances', label: 'Grievance Desk', icon: AlertTriangle, visible: isSuper || roles.includes('GRIEVANCE_ADMIN') || roles.includes('DISTRICT_ADMIN') },
    { href: '/admin/documents', label: 'Gov Orders & Circulars', icon: FileText, visible: isSuper || roles.includes('CONTENT_ADMIN') },
    { href: '/admin/elections', label: 'Offline Election Cell', icon: Vote, visible: isSuper || roles.includes('ELECTION_ADMIN') },
    { href: '/admin/events', label: 'Conferences & Events', icon: Calendar, visible: isSuper || roles.includes('CONTENT_ADMIN') },
    { href: '/admin/finance', label: 'Finance & Transparency', icon: DollarSign, visible: isSuper || roles.includes('FINANCE_ADMIN') },
    { href: '/admin/roles', label: 'Admin Roles & RBAC', icon: ShieldCheck, visible: isSuper },
    { href: '/admin/settings', label: 'Master Configuration', icon: Sliders, visible: isSuper },
    { href: '/admin/audit-logs', label: 'Audit Activity Log', icon: History, visible: isSuper },
  ];

  return (
    <aside className="w-full md:w-64 bg-navy-900 text-slate-300 min-h-screen p-4 flex flex-col justify-between shrink-0 border-r border-slate-800">
      <div>
        <div className="p-3 bg-navy-800 rounded-lg mb-6 border border-teal-800">
          <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Administration Suite</div>
          <div className="font-bold text-white text-base mt-0.5">MP-GEA Executive</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Roles: {roles.join(', ')}
          </div>
        </div>

        <nav className="space-y-1">
          {links
            .filter((l) => l.visible)
            .map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white font-semibold shadow'
                      : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3 opacity-80" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
        </nav>
      </div>

      <div className="pt-4 border-t border-navy-800 space-y-2">
        <Link
          href="/portal/dashboard"
          className="w-full flex items-center px-3 py-2 text-xs text-teal-400 hover:bg-navy-800 rounded-md transition-colors"
        >
          <span>Switch to Member View</span>
        </Link>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center px-3 py-2 text-xs text-rose-300 hover:bg-rose-900/20 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
