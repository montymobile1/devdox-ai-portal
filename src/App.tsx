import React, { useState } from 'react';
import { 
  GitBranch, FileCode, RefreshCw, FileText, ChevronRight, Github, 
  Gitlab as GitlabLogo, CheckCircle, Menu, X, Terminal, Coffee, 
  Code2, Database, Bug, Cpu, GitCommit, Settings,
  Laptop, Monitor, Lock, Shield
} from 'lucide-react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

interface FloatingIconProps {
  readonly icon: React.ReactNode;
  readonly className?: string;
  readonly delay?: string;
}

function FloatingIcon({ icon, className = "", delay = "0s" }: Readonly<FloatingIconProps>) {
  return (
    <div className={`hidden sm:block absolute floating opacity-40 ${className}`} style={{ animationDelay: delay }}>
      <div className="bg-slate-800/40 p-3 rounded-lg border border-cyan-400/10 backdrop-blur-sm">
        {icon}
      </div>
    </div>
  );
}

interface NeuralPath {
  readonly id: string;
  readonly path: string;
}

function NeuralNetwork() {
  const paths: NeuralPath[] = [
    { id: 'neural-path-1', path: "M100,100 C200,150 300,50 400,100" },
    { id: 'neural-path-2', path: "M150,200 C250,250 350,150 450,200" },
    { id: 'neural-path-3', path: "M200,300 C300,350 400,250 500,300" },
    { id: 'neural-path-4', path: "M250,400 C350,450 450,350 550,400" },
    { id: 'neural-path-5', path: "M300,500 C400,550 500,450 600,500" },
    { id: 'neural-path-6', path: "M100,100 C150,200 100,300 150,400" },
    { id: 'neural-path-7', path: "M400,100 C450,200 400,300 450,400" },
    { id: 'neural-path-8', path: "M150,200 C200,300 150,400 200,500" },
    { id: 'neural-path-9', path: "M450,200 C500,300 450,400 500,500" },
    { id: 'neural-path-10', path: "M600,100 C700,150 800,50 900,100" },
    { id: 'neural-path-11', path: "M650,200 C750,250 850,150 950,200" },
    { id: 'neural-path-12', path: "M600,300 C700,350 800,250 900,300" }
  ];

  return (
    <svg className="neural-network" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
      {paths.map((pathData, index) => (
        <g key={pathData.id}>
          <path 
            id={pathData.id} 
            d={pathData.path} 
            style={{ animationDelay: `${index * 0.5}s` }} 
          />
          <circle 
            className="moving-dot" 
            r="4" 
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={pathData.path}
              rotate="auto"
              begin={`${index * 0.5}s`}
            />
          </circle>
          <circle 
            className="glowing-dot" 
            r="6" 
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={pathData.path}
              rotate="auto"
              begin={`${index * 0.5}s`}
            />
          </circle>
        </g>
      ))}
      
      {/* Static nodes */}
      <circle cx="100" cy="100" />
      <circle cx="400" cy="100" />
      <circle cx="150" cy="200" />
      <circle cx="450" cy="200" />
      <circle cx="200" cy="300" />
      <circle cx="500" cy="300" />
      <circle cx="250" cy="400" />
      <circle cx="550" cy="400" />
      <circle cx="300" cy="500" />
      <circle cx="600" cy="500" />
      <circle cx="600" cy="100" />
      <circle cx="900" cy="100" />
      <circle cx="650" cy="200" />
      <circle cx="950" cy="200" />
      <circle cx="600" cy="300" />
      <circle cx="900" cy="300" />
    </svg>
  );
}

interface FeatureCardProps {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
}

interface StepCardProps {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

function FeatureCard({ icon, title, description }: Readonly<FeatureCardProps>) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-400 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const visibleSections = useIntersectionObserver();

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <NeuralNetwork />
      
      {/* Background Pattern - Left */}
      <div className="absolute left-0 inset-y-0 w-64 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent z-10" />
        <FloatingIcon icon={<Terminal className="w-6 h-6 text-cyan-400" />} className="top-[10%] left-8" delay="0s" />
        <FloatingIcon icon={<Code2 className="w-6 h-6 text-cyan-400" />} className="top-[25%] left-16" delay="0.6s" />
        <FloatingIcon icon={<Bug className="w-6 h-6 text-cyan-400" />} className="top-[40%] left-12" delay="1.2s" />
        <FloatingIcon icon={<GitCommit className="w-6 h-6 text-cyan-400" />} className="top-[55%] left-20" delay="1.8s" />
        <FloatingIcon icon={<Laptop className="w-6 h-6 text-cyan-400" />} className="top-[70%] left-10" delay="2.4s" />
        <FloatingIcon icon={<Monitor className="w-6 h-6 text-cyan-400" />} className="top-[85%] left-24" delay="3.0s" />
      </div>

      {/* Background Pattern - Right */}
      <div className="absolute right-0 inset-y-0 w-64 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-slate-900/50 to-transparent z-10" />
        <FloatingIcon icon={<Coffee className="w-6 h-6 text-cyan-400" />} className="top-[15%] right-12" delay="0.3s" />
        <FloatingIcon icon={<Database className="w-6 h-6 text-cyan-400" />} className="top-[30%] right-20" delay="0.9s" />
        <FloatingIcon icon={<Cpu className="w-6 h-6 text-cyan-400" />} className="top-[45%] right-8" delay="1.5s" />
        <FloatingIcon icon={<Settings className="w-6 h-6 text-cyan-400" />} className="top-[60%] right-24" delay="2.1s" />
        <FloatingIcon icon={<Lock className="w-6 h-6 text-cyan-400" />} className="top-[75%] right-16" delay="2.7s" />
        <FloatingIcon icon={<Shield className="w-6 h-6 text-cyan-400" />} className="top-[90%] right-10" delay="3.3s" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How it Works</a>
              <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Login
              </button>
              <button className="bg-cyan-400 hover:bg-cyan-500 px-6 py-2 rounded-lg transition-colors">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800 border-t border-slate-700 p-4 space-y-4 shadow-lg z-50">
              <a href="#features" className="block py-2 hover:text-cyan-400 transition-colors">Features</a>
              <a href="#how-it-works" className="block py-2 hover:text-cyan-400 transition-colors">How it Works</a>
              <button className="block w-full py-2 text-cyan-400 hover:text-cyan-300 transition-colors text-left">
                Login
              </button>
              <button className="block w-full bg-cyan-400 hover:bg-cyan-500 px-6 py-2 rounded-lg transition-colors text-center">
                Sign Up
              </button>
            </div>
          )}
        </nav>

        <main className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <section id="hero" className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center relative">
            <div className="relative z-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
                24/7 Dev Power in Your Pocket
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                Automate code reviews, documentation, and feature development with an AI assistant that understands your codebase and workflow.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
                <button className="bg-cyan-400 hover:bg-cyan-500 px-8 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                  <span>Start Free Trial</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="border border-slate-700 hover:border-cyan-400 px-8 py-3 rounded-lg transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
          </section>

          {/* Integration Section */}
          <section id="features" className={`py-12 sm:py-20 relative transition-opacity duration-1000 ${visibleSections.has('features') ? 'opacity-100' : 'opacity-0'}`}>
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-center space-x-12 mb-12">
                <Github className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400" />
                <GitlabLogo className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16 px-4">
                Seamlessly Integrates with Your Development Workflow
              </h2>
              
              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <FeatureCard
                  icon={<GitBranch className="w-6 h-6 text-cyan-400" />}
                  title="Smart Code Reviews"
                  description="Automated code analysis and suggestions based on best practices and your team's patterns."
                />
                <FeatureCard
                  icon={<FileCode className="w-6 h-6 text-cyan-400" />}
                  title="Feature Development"
                  description="AI-assisted feature implementation with context-aware code generation."
                />
                <FeatureCard
                  icon={<RefreshCw className="w-6 h-6 text-cyan-400" />}
                  title="Code Refactoring"
                  description="Intelligent code restructuring while maintaining functionality and improving quality."
                />
                <FeatureCard
                  icon={<FileText className="w-6 h-6 text-cyan-400" />}
                  title="Documentation Generation"
                  description="Automatic creation and maintenance of comprehensive documentation."
                />
                <FeatureCard
                  icon={<img src="/logo.png" alt="AI" className="w-6 h-6" />}
                  title="AI Code Analysis"
                  description="Deep understanding of your codebase for contextual suggestions."
                />
                <FeatureCard
                  icon={<CheckCircle className="w-6 h-6 text-cyan-400" />}
                  title="Quality Assurance"
                  description="Continuous code quality monitoring and improvement recommendations."
                />
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className={`py-12 sm:py-20 relative transition-opacity duration-1000 ${visibleSections.has('how-it-works') ? 'opacity-100' : 'opacity-0'}`}>
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

          {/* CTA Section */}
          <section id="cta" className={`py-12 sm:py-20 relative transition-opacity duration-1000 ${visibleSections.has('cta') ? 'opacity-100' : 'opacity-0'}`}>
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Ready to Transform Your Development Workflow?
              </h2>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-400">
                Join thousands of developers using AI to write better code, faster.
              </p>
              <button className="bg-cyan-400 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto">
                Get Started Now
              </button>
            </div>
          </section>
        </main>

        {/* Footer */}
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
      </div>
    </div>
  );
}

export default App;