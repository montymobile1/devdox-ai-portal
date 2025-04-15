import { useState, useEffect } from 'react';

export function useIntersectionObserver() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updateSection = (entry: IntersectionObserverEntry) => {
      setVisibleSections(prev => {
        const newSet = new Set(prev);
        if (entry.isIntersecting) {
          newSet.add(entry.target.id);
        }
        return newSet;
      });
    };

    const observer = new IntersectionObserver(
      entries => entries.forEach(updateSection),
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return visibleSections;
}