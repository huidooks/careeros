import React from 'react';
import { Layers, User, Building2, Eye, Award, Briefcase, LogOut } from 'lucide-react';

interface HeaderProps {
  currentPersona: 'candidate' | 'recruiter';
  setPersona: (persona: 'candidate' | 'recruiter') => void;
  candidateCompletedCount: number;
  totalJobsCount: number;
  userName?: string;
  onLogout?: () => void;
  userRole?: 'candidate' | 'recruiter';
}

export default function Header({
  currentPersona,
  setPersona,
  candidateCompletedCount,
  totalJobsCount,
  userName,
  onLogout,
  userRole,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm" id="header-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo and Title */}
        <div className="flex items-center space-x-3" id="brand-logo-container">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-100">
            <Layers className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-sans font-extrabold text-xl tracking-tight text-slate-900">CareerOS</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                Unified Ecosystem
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium font-mono hidden sm:block">LEARNING × HIRING PIPELINE</p>
          </div>
        </div>

        {/* Dynamic Context Panel */}
        <div className="hidden md:flex items-center space-x-6 text-sm text-slate-600 bg-slate-50 py-1.5 px-3 rounded-full border border-slate-100" id="live-telemetry">
          <div className="flex items-center space-x-1.5 font-sans">
            <Award className="w-4 h-4 text-emerald-500" />
            <span className="font-medium text-slate-700">{candidateCompletedCount}</span>
            <span className="text-slate-500 text-xs">Verified Certs</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-1.5 font-sans">
            <Briefcase className="w-4 h-4 text-indigo-500" />
            <span className="font-medium text-slate-700">{totalJobsCount}</span>
            <span className="text-slate-500 text-xs">Market Opportunities</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-1.5 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-600 font-medium">Synced Platform</span>
          </div>
        </div>

        {/* Persona Switch Switcher & Logout */}
        <div className="flex items-center space-x-4" id="header-actions">
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl" id="persona-switcher">
            {userRole !== 'recruiter' && (
              <button
                id="switch-btn-candidate"
                onClick={() => setPersona('candidate')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  currentPersona === 'candidate'
                    ? 'bg-white text-indigo-600 shadow-sm shadow-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Candidate View</span>
                <span className="sm:hidden">Candidate</span>
              </button>
            )}
            
            {userRole !== 'candidate' && (
              <button
                id="switch-btn-recruiter"
                onClick={() => setPersona('recruiter')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  currentPersona === 'recruiter'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">Recruiter View</span>
                <span className="sm:hidden">Recruiter</span>
              </button>
            )}
          </div>

          {userName && (
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200" id="user-profile-badge">
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-none">{userName}</p>
                <p className="text-[10px] text-slate-400 capitalize mt-0.5">{currentPersona}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-100 rounded-xl transition cursor-pointer flex items-center justify-center"
                title="Sign Out"
                id="header-logout-btn"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
