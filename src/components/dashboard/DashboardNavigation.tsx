import React from 'react';
import { FolderGit2, Key, GitBranch, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItem {
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly path: string;
}

interface DashboardNavigationProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const navigationItems: NavigationItem[] = [
  {
    icon: <GitBranch className="w-5 h-5" />,
    label: 'Git Token',
    path: '/dashboard/git-token',
  },
  {
    icon: <FolderGit2 className="w-5 h-5" />,
    label: 'Repositories',
    path: '/dashboard',
  },
  {
    icon: <Key className="w-5 h-5" />,
    label: 'API Key',
    path: '/dashboard/api-key',
  },
];

export function DashboardNavigation({ isOpen, onClose }: Readonly<DashboardNavigationProps>) {
  const location = useLocation();

  const mobileNavClasses = isOpen
    ? 'translate-x-0 opacity-100'
    : '-translate-x-full opacity-0';

  return (
    <>
      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <nav
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-slate-900 p-4 transform transition-all duration-300 ease-in-out z-50 ${mobileNavClasses}`}
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all relative ${
                  isActive
                    ? 'text-white bg-cyan-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-full" />
                )}
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block w-64 bg-slate-900 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all relative ${
                  isActive
                    ? 'text-white bg-cyan-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-full" />
                )}
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}