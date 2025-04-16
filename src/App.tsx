import React, { useState, useEffect } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { NeuralNetwork } from './components/background/NeuralNetwork';
import { FloatingIconsLeft, FloatingIconsRight } from './components/background/FloatingIcons';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { HowItWorks } from './components/sections/HowItWorks';
import { CallToAction } from './components/sections/CallToAction';
import { Footer } from './components/layout/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showDashboardHint, setShowDashboardHint] = useState(false);
  const visibleSections = useIntersectionObserver();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDashboardHint(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <NeuralNetwork />
      <FloatingIconsLeft />
      <FloatingIconsRight />

      <div className="relative">
        <Navigation 
          isMenuOpen={isMenuOpen}
          showDashboardHint={showDashboardHint}
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          onSignInClick={() => setShowSignIn(true)}
        />

        {showSignIn && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-4">
              <SignIn />
              <button 
                onClick={() => setShowSignIn(false)}
                className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showSignUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-4">
              <SignUp />
              <button 
                onClick={() => setShowSignUp(false)}
                className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <main className="mx-auto max-w-7xl">
          <Hero onSignUpClick={handleSignUpClick} />
          <Features isVisible={visibleSections.has('features')} />
          <HowItWorks isVisible={visibleSections.has('how-it-works')} />
          <CallToAction isVisible={visibleSections.has('cta')} onSignUpClick={handleSignUpClick} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;