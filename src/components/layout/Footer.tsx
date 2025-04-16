import React from 'react';

export function Footer() {
  return (
    <footer className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="DevDox.ai" className="w-6 h-6" />
          <span className="font-bold text-cyan-400">DevDox.ai</span>
        </div>
        <div className="text-center md:text-left">
          <div className="text-sm text-gray-400 mb-1">
            Built by MontyMobile
          </div>
          <div className="text-sm text-gray-400">
            © 2025 DevDox.ai. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}