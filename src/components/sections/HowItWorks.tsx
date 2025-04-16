import React from 'react';

interface StepCardProps {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

function StepCard({ number, title, description }: Readonly<StepCardProps>) {
  return (
    <div className="text-center p-6 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-400 transition-all">
      <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-4">{number}</div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

interface HowItWorksProps {
  readonly isVisible: boolean;
}

export function HowItWorks({ isVisible }: Readonly<HowItWorksProps>) {
  return (
    <section id="how-it-works" className={`py-12 sm:py-20 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16">How It Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <StepCard
            number="01"
            title="Connect Your Repository"
            description="Link your GitHub or GitLab repository to get started in minutes."
          />
          <StepCard
            number="02"
            title="AI Analyzes Your Codebase"
            description="Our AI learns your code patterns and development practices."
          />
          <StepCard
            number="03"
            title="Receive Smart Assistance"
            description="Get intelligent suggestions, documentation, and code improvements."
          />
        </div>
      </div>
    </section>
  );
}