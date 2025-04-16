import React from 'react';
import { GitBranch, FileCode, RefreshCw, FileText, CheckCircle, Github, Gitlab as GitlabLogo } from 'lucide-react';

interface FeatureCardProps {
  readonly icon: React.ReactNode;
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

interface FeaturesProps {
  readonly isVisible: boolean;
}

export function Features({ isVisible }: Readonly<FeaturesProps>) {
  return (
    <section id="features" className={`py-12 sm:py-20 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center space-x-12 mb-12">
          <Github className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400" />
          <GitlabLogo className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16 px-4">
          Seamlessly Integrates with Your Development Workflow
        </h2>
        
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
  );
}