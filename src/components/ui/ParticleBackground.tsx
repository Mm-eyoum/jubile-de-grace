import { useEffect, useRef, useMemo } from 'react';

interface ParticleBackgroundProps {
  count?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  layer: number;
}

const ParticleBackground = ({ count = 150 }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  const isMobile = useMemo(() => window.innerWidth < 768, []);
  const particleCount = isMobile ? Math.floor(count / 2) : count;
  
  const colors = useMemo(() => ({
    primary: '#FFD700',
    secondary: '#DAA520'
  }), []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    contextRef.current = ctx;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Adjust for device pixel ratio
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const layer = Math.random();
      const layerSpeed = layer < 0.4 ? 1 : layer < 0.75 ? 0.6 : 0.3;
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * (isMobile ? 1 : 2)) + (isMobile ? 1 : 2),
        speedX: (Math.random() - 0.5) * layerSpeed,
        speedY: (Math.random() - 0.5) * layerSpeed,
        opacity: Math.random() * 0.5 + 0.2,
        layer: layerSpeed
      };
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [particleCount, isMobile, colors]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;
    
    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime >= interval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesRef.current.forEach(particle => {
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Boundary check
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
          
          // Mouse interaction
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 100;
            
            particle.x -= Math.cos(angle) * force * particle.layer * 2;
            particle.y -= Math.sin(angle) * force * particle.layer * 2;
          }
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${
            particle.layer === 1 ? '255, 215, 0' : '218, 165, 32'
          }, ${particle.opacity})`;
          ctx.fill();
        });
        
        lastTime = currentTime - (deltaTime % interval);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;