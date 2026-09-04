'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CreditCard,
  User,
  FileText,
  Users,
  AlertCircle,
  Calendar,
  Bell,
  LogOut,
  Receipt,
  Settings,
} from 'lucide-react';

interface PortalNavProps {
  member: {
    fullName: string;
    membershipNumber: string | null;
    status: string;
  };
}

export function PortalNav({ member }: PortalNavProps) {
  const pathname = usePathname();

  const links = [
    { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/portal/id-card', label: 'Digital ID Card', icon: CreditCard },
    { href: '/portal/profile', label: 'My Profile', icon: User },
    { href: '/portal/documents', label: 'Orders & Circulars', icon: FileText },
    { href: '/portal/directory', label: 'Member Directory', icon: Users },
    { href: '/portal/grievance', label: 'My Grievances', icon: AlertCircle },
    { href: '/portal/payments', label: 'Payments & Receipts', icon: Receipt },
    { href: '/portal/events', label: 'Events & Meetings', icon: Calendar },
    { href: '/portal/notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex flex-col justify-between shrink-0">
      <div>
        {/* User Card */}
        <div className="p-3 bg-slate-800/80 rounded-lg mb-6 border border-slate-700">
          <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider">Member Portal</div>
          <div className="font-bold text-white text-sm mt-1 truncate">{member.fullName}</div>
          <div className="text-xs text-slate-400 mt-0.5">
            {member.membershipNumber || 'Number: Pending'}
          </div>
          <div className="mt-2">
            <span className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
              member.status === 'ACTIVE'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {member.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'bg-teal-700 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 mr-3 opacity-80" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-slate-800">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center px-3 py-2 text-sm text-rose-300 hover:bg-rose-900/20 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
