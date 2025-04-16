import React from 'react';
import { 
  Terminal, Code2, Bug, GitCommit, Laptop, Monitor,
  Coffee, Database, Cpu, Settings, Lock, Shield
} from 'lucide-react';

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

export function FloatingIconsLeft() {
  return (
    <div className="absolute left-0 inset-y-0 w-64 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent z-10" />
      <FloatingIcon icon={<Terminal className="w-6 h-6 text-cyan-400" />} className="top-[10%] left-8" delay="0s" />
      <FloatingIcon icon={<Code2 className="w-6 h-6 text-cyan-400" />} className="top-[25%] left-16" delay="0.6s" />
      <FloatingIcon icon={<Bug className="w-6 h-6 text-cyan-400" />} className="top-[40%] left-12" delay="1.2s" />
      <FloatingIcon icon={<GitCommit className="w-6 h-6 text-cyan-400" />} className="top-[55%] left-20" delay="1.8s" />
      <FloatingIcon icon={<Laptop className="w-6 h-6 text-cyan-400" />} className="top-[70%] left-10" delay="2.4s" />
      <FloatingIcon icon={<Monitor className="w-6 h-6 text-cyan-400" />} className="top-[85%] left-24" delay="3.0s" />
    </div>
  );
}

export function FloatingIconsRight() {
  return (
    <div className="absolute right-0 inset-y-0 w-64 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-l from-slate-900/50 to-transparent z-10" />
      <FloatingIcon icon={<Coffee className="w-6 h-6 text-cyan-400" />} className="top-[15%] right-12" delay="0.3s" />
      <FloatingIcon icon={<Database className="w-6 h-6 text-cyan-400" />} className="top-[30%] right-20" delay="0.9s" />
      <FloatingIcon icon={<Cpu className="w-6 h-6 text-cyan-400" />} className="top-[45%] right-8" delay="1.5s" />
      <FloatingIcon icon={<Settings className="w-6 h-6 text-cyan-400" />} className="top-[60%] right-24" delay="2.1s" />
      <FloatingIcon icon={<Lock className="w-6 h-6 text-cyan-400" />} className="top-[75%] right-16" delay="2.7s" />
      <FloatingIcon icon={<Shield className="w-6 h-6 text-cyan-400" />} className="top-[90%] right-10" delay="3.3s" />
    </div>
  );
}