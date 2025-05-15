import { ReactNode, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: ReactNode;
}

const SectionWrapper = ({ id, className = '', children }: SectionWrapperProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (inView && sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.children,
        { 
          y: 20, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.7, 
          ease: "power2.out" 
        }
      );
    }
  }, [inView]);
  
  return (
    <section 
      id={id} 
      ref={(node) => {
        // @ts-ignore - Combining refs
        sectionRef.current = node;
        ref(node);
      }}
      className={`py-16 md:py-24 ${className}`}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;