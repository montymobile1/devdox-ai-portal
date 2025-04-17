import React from 'react';
import { SignedIn, SignedOut, useClerk } from '@clerk/clerk-react';
import { LogOut, ArrowRight } from 'lucide-react';

interface AuthButtonsProps {
  readonly onSignInClick: () => void;
  readonly onDashboardClick: () => void;
  readonly showDashboardHint: boolean;
  readonly isMobile?: boolean;
}

export function AuthButtons({ 
  onSignInClick, 
  onDashboardClick,
  showDashboardHint, 
  isMobile = false 
}: Readonly<AuthButtonsProps>) {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  const containerClasses = isMobile ? "flex flex-col space-y-4" : "flex items-center space-x-3";
  const dashboardButtonClasses = `flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg transition-all text-base font-medium w-full md:w-auto bg-cyan-500 hover:bg-cyan-600 text-white ${
    showDashboardHint ? 'animate-pulse' : ''
  }`;
  const signOutButtonClasses = isMobile 
    ? "flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg transition-all text-base font-medium w-full bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white border border-slate-700 hover:border-slate-600"
    : "flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-800";

  return (
    <>
      <SignedOut>
        <button 
          onClick={onSignInClick}
          className="flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg transition-all text-base font-medium w-full md:w-auto bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          Sign In
        </button>
      </SignedOut>
      <SignedIn>
        <div className={containerClasses}>
          <button 
            onClick={onDashboardClick}
            className={dashboardButtonClasses}
          >
            <span>Dashboard</span>
            <ArrowRight className={`w-4 h-4 transition-transform ${
              showDashboardHint ? 'translate-x-1' : ''
            }`} />
          </button>
          <button
            onClick={handleSignOut}
            className={signOutButtonClasses}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </SignedIn>
    </>
  );
}