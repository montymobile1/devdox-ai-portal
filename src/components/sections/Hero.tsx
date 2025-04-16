import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  readonly onSignUpClick: () => void;
}

export function Hero({ onSignUpClick }: Readonly<HeroProps>) {
  return (
    <section id="hero" className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center relative">
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
          24/7 Dev Power in Your Pocket
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          Automate code reviews, documentation, and feature development with an AI assistant that understands your codebase and workflow.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
          <button 
            onClick={onSignUpClick}
            className="bg-cyan-400 hover:bg-cyan-500 px-8 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <span>Start Free Trial</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="border border-slate-700 hover:border-cyan-400 px-8 py-3 rounded-lg transition-colors">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}