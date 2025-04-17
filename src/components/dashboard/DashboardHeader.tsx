import React from 'react';
import { useClerk } from '@clerk/clerk-react';
import { LogOut, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  readonly onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: Readonly<DashboardHeaderProps>) {
  const { signOut } = useClerk();

  return (
    <header className="bg-slate-900 border-b border-slate-700 relative">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-gray-400 hover:text-white p-1"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="DevDox.ai" className="w-8 h-8" />
              <span className="text-xl font-bold text-cyan-400">DevDox.ai</span>
            </Link>
          </div>
          <button
            onClick={() => signOut()}
            className="text-gray-400 hover:text-white flex items-center space-x-2 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <div className="h-full w-1/2 bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0 animate-slide" />
      </div>
    </header>
  );
}