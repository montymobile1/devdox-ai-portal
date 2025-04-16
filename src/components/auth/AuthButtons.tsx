import React from 'react';
import { SignedIn, SignedOut, useClerk } from '@clerk/clerk-react';
import { LogOut, ArrowRight } from 'lucide-react';

interface AuthButtonsProps {
  readonly onSignInClick: () => void;
  readonly showDashboardHint: boolean;
  readonly isMobile?: boolean;
}

export function AuthButtons({ onSignInClick, showDashboardHint, isMobile = false }: Readonly<AuthButtonsProps>) {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  const containerClasses = isMobile ? "space-y-4" : "flex items-center space-x-4";
  const buttonClasses = isMobile ? "w-full" : "";

  return (
    <>
      <SignedOut>
        <button 
          onClick={onSignInClick}
          className={`${buttonClasses} px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors`}
        >
          Sign In
        </button>
      </SignedOut>
      <SignedIn>
        <div className={containerClasses}>
          <button
            className={`${buttonClasses} flex items-center justify-center space-x-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-all ${
              showDashboardHint ? 'animate-pulse' : ''
            }`}
          >
            <span>Dashboard</span>
            <ArrowRight className={`w-4 h-4 transition-transform ${
              showDashboardHint ? 'translate-x-1' : ''
            }`} />
          </button>
          <button
            onClick={handleSignOut}
            className={`${buttonClasses} flex items-center justify-center space-x-2 px-6 py-2 border border-slate-700 hover:border-cyan-400 rounded-lg transition-colors`}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </SignedIn>
    </>
  );
}