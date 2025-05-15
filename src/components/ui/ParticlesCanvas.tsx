import { useEffect, useRef } from 'react';

interface ParticlesCanvasProps {
  maxParticles?: number;
}

const ParticlesCanvas = ({ maxParticles = 50 }: ParticlesCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    opacity: number;
    phase: number;
  }>>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    contextRef.current = ctx;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize particles
    particlesRef.current = Array.from({ length: maxParticles }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (8 - 3) + 3,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * (0.8 - 0.4) + 0.4,
      phase: Math.random() * Math.PI * 2
    }));

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Update phase for oscillation
        particle.phase += 0.02;
        const oscillation = Math.sin(particle.phase) * 0.2;
        const currentOpacity = particle.opacity + oscillation;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [maxParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="particles-bg fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default ParticlesCanvas;