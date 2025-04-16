import React from 'react';

interface CallToActionProps {
  readonly isVisible: boolean;
  readonly onSignUpClick: () => void;
}

export function CallToAction({ isVisible, onSignUpClick }: Readonly<CallToActionProps>) {
  return (
    <section id="cta" className={`py-12 sm:py-20 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Ready to Transform Your Development Workflow?
        </h2>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-400">
          Join thousands of developers using AI to write better code, faster.
        </p>
        <button 
          onClick={onSignUpClick}
          className="bg-cyan-400 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
        >
          Get Started Now
        </button>
      </div>
    </section>
  );
}