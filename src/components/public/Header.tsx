'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Shield, User, FileText, ChevronDown } from 'lucide-react';

interface HeaderProps {
  user?: {
    name?: string | null;
    email: string;
    roles: string[];
  } | null;
}

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span>Official Portal of Madhya Pradesh Government Engineers’ Association</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline">Registration & Cadre Governance</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="mailto:info@mpgea.org" className="hover:text-teal-400 transition-colors">
              info@mpgea.org
            </a>
            <span className="text-slate-600">|</span>
            <Link href="/verify/search" className="hover:text-teal-400 transition-colors">
              Verify Member ID
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Emblem */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center text-teal-400 font-bold text-xl border-2 border-teal-500 shadow-md group-hover:bg-navy-800 transition-colors">
              ⚙️
            </div>
            <div>
              <div className="font-bold text-navy-900 text-lg leading-tight tracking-tight">
                MP-GEA
              </div>
              <div className="text-xs font-medium text-slate-600 tracking-tight">
                M.P. Government Engineers’ Association
              </div>
              <div className="text-[10px] text-teal-700 font-semibold uppercase tracking-wider">
                म.प्र. शासकीय अभियंता संघ
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium text-slate-700">
            <Link href="/" className="px-3 py-2 rounded-md hover:text-teal-700 hover:bg-slate-50">
              Home
            </Link>

            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('about')}
                className="flex items-center px-3 py-2 rounded-md hover:text-teal-700 hover:bg-slate-50"
              >
                <span>About</span>
                <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
              </button>
              {dropdownOpen === 'about' && (
                <div className="absolute left-0 mt-2 w-52 bg-white rounded-md shadow-lg border border-slate-200 py-2 z-50">
                  <Link href="/about" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">About MP-GEA</Link>
                  <Link href="/objectives" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Vision & Objectives</Link>
                  <Link href="/constitution" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Constitution & Bylaws</Link>
                  <Link href="/governance" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Governance</Link>
                  <Link href="/office-bearers" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Office Bearers</Link>
                  <Link href="/organisation" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Organisation Structure</Link>
                </div>
              )}
            </div>

            {/* Membership Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('membership')}
                className="flex items-center px-3 py-2 rounded-md hover:text-teal-700 hover:bg-slate-50"
              >
                <span>Membership</span>
                <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
              </button>
              {dropdownOpen === 'membership' && (
                <div className="absolute left-0 mt-2 w-52 bg-white rounded-md shadow-lg border border-slate-200 py-2 z-50">
                  <Link href="/membership" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Membership Overview</Link>
                  <Link href="/eligibility" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Eligibility Criteria</Link>
                  <Link href="/benefits" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Benefits & Advocacy</Link>
                  <Link href="/join" className="block px-4 py-2 hover:bg-slate-50 text-teal-700 font-semibold">Join MP-GEA</Link>
                </div>
              )}
            </div>

            {/* Documents */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('docs')}
                className="flex items-center px-3 py-2 rounded-md hover:text-teal-700 hover:bg-slate-50"
              >
                <span>Documents</span>
                <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
              </button>
              {dropdownOpen === 'docs' && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-slate-200 py-2 z-50">
                  <Link href="/orders" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Government Orders</Link>
                  <Link href="/circulars" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Association Circulars</Link>
                  <Link href="/notices" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Urgent Notices</Link>
                  <Link href="/representations" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Cadre Representations</Link>
                </div>
              )}
            </div>

            <Link href="/news" className="px-3 py-2 rounded-md hover:text-teal-700 hover:bg-slate-50">
              News
            </Link>
            <Link href="/events" className="px-3 py-2 rounded-md hover:text-teal-700 hover:bg-slate-50">
              Events
            </Link>
            <Link href="/elections" className="px-3 py-2 rounded-md hover:text-teal-700 hover:bg-slate-50">
              Elections
            </Link>
            <Link href="/financials" className="px-3 py-2 rounded-md hover:text-teal-700 hover:bg-slate-50">
              Financials
            </Link>
            <Link href="/contact" className="px-3 py-2 rounded-md hover:text-teal-700 hover:bg-slate-50">
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-2">
                {user.roles.includes('SUPER_ADMIN') || user.roles.some((r) => r.includes('ADMIN')) ? (
                  <Link
                    href="/admin"
                    className="inline-flex items-center px-3.5 py-2 rounded-md text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100"
                  >
                    <Shield className="w-3.5 h-3.5 mr-1" />
                    Admin Portal
                  </Link>
                ) : null}
                <Link
                  href="/portal/dashboard"
                  className="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold bg-navy-900 text-white hover:bg-navy-800 shadow-sm"
                >
                  <User className="w-4 h-4 mr-1.5" />
                  Member Portal
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-navy-900 border border-navy-900/30 rounded-md hover:bg-navy-50"
                >
                  Member Login
                </Link>
                <Link
                  href="/join"
                  className="px-4 py-2 text-sm font-semibold text-white bg-teal-700 rounded-md hover:bg-teal-800 shadow-sm transition-all"
                >
                  Join MP-GEA
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-navy-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Home</Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">About MP-GEA</Link>
          <Link href="/governance" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Governance</Link>
          <Link href="/office-bearers" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Office Bearers</Link>
          <Link href="/membership" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Membership</Link>
          <Link href="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Government Orders</Link>
          <Link href="/circulars" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Circulars</Link>
          <Link href="/representations" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Cadre Issues</Link>
          <Link href="/elections" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Elections (Offline)</Link>
          <Link href="/financials" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Financial Transparency</Link>
          <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Contact Us</Link>

          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2">
            {user ? (
              <Link href="/portal/dashboard" className="w-full text-center py-2.5 px-4 rounded-md font-semibold bg-navy-900 text-white">
                Member Portal
              </Link>
            ) : (
              <>
                <Link href="/login" className="w-full text-center py-2.5 px-4 rounded-md font-semibold border border-slate-300 text-navy-900">
                  Member Login
                </Link>
                <Link href="/join" className="w-full text-center py-2.5 px-4 rounded-md font-semibold bg-teal-700 text-white">
                  Join MP-GEA
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
