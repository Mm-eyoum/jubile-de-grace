import { useEffect, useRef } from 'react';

interface AnimationProviderProps {
  selector: string;
  threshold?: number;
  rootMargin?: string;
  children: React.ReactNode;
}

const AnimationProvider = ({ 
  selector, 
  threshold = 0.2, 
  rootMargin = "100px",
  children 
}: AnimationProviderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [selector, threshold, rootMargin]);

  return <div ref={containerRef}>{children}</div>;
};

export default AnimationProvider;