import React from 'react';
import { Menu, X } from 'lucide-react';
import { AuthButtons } from '../auth/AuthButtons';

interface NavigationProps {
  readonly isMenuOpen: boolean;
  readonly showDashboardHint: boolean;
  readonly onMenuToggle: () => void;
  readonly onSignInClick: () => void;
  readonly onDashboardClick: () => void;
}

export function Navigation({ 
  isMenuOpen, 
  showDashboardHint, 
  onMenuToggle, 
  onSignInClick,
  onDashboardClick
}: Readonly<NavigationProps>) {
  return (
    <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="DevDox.ai" className="w-8 sm:w-10 h-8 sm:h-10" />
              <span className="text-lg sm:text-xl font-bold text-cyan-400">DevDox.ai</span>
            </div>
            <span className="text-xs text-gray-400 ml-11 sm:ml-[52px] -mt-1">24/7 Dev Power in Your Pocket</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How it Works</a>
          <AuthButtons 
            onSignInClick={onSignInClick} 
            onDashboardClick={onDashboardClick}
            showDashboardHint={showDashboardHint} 
          />
        </div>

        <button 
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={onMenuToggle}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 bottom-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 p-6 space-y-6 z-50 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <a href="#features" className="text-lg font-medium hover:text-cyan-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-lg font-medium hover:text-cyan-400 transition-colors">How it Works</a>
          </div>
          <div className="pt-4 border-t border-slate-700">
            <AuthButtons 
              onSignInClick={() => {
                onSignInClick();
                onMenuToggle();
              }}
              onDashboardClick={() => {
                onDashboardClick();
                onMenuToggle();
              }}
              showDashboardHint={showDashboardHint} 
              isMobile 
            />
          </div>
        </div>
      )}
    </nav>
  );
}