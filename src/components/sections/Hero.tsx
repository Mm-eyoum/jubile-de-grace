import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import ParticleBackground from '../ui/ParticleBackground';

const backgroundImages = [
  'https://i.ibb.co/wFRWxYFz/2.png',
  'https://i.ibb.co/SXjKw309/3.png',
  'https://i.ibb.co/mVXfHwM3/MG-1336.jpg'
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const slideDirection = useRef<'left' | 'right'>('right');
  
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
    .fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.8'
    )
    .fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    );
  }, []);
  
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      slideDirection.current = 'right';
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused]);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
  };

  const handlePrevSlide = () => {
    slideDirection.current = 'left';
    setCurrentImageIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const handleNextSlide = () => {
    slideDirection.current = 'right';
    setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
  };
  
  return (
    <header 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-all duration-700 transform ${
            currentImageIndex === index 
              ? 'opacity-100 scale-100' 
              : `opacity-0 scale-105 ${
                  slideDirection.current === 'right' ? 'translate-x-4' : '-translate-x-4'
                }`
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
      ))}
      
      <ParticleBackground count={150} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-dark/70 to-dark/40 z-10"></div>
      
      <div className="container relative z-20 text-center py-16 mt-16">
        <h1 
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight text-white mb-6"
        >
          <span className="block">Jubilé de Grâce</span>
          <span className="text-gradient">50 ans de grâce</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gold-100 mb-10 max-w-3xl mx-auto"
        >
          Célébration et reconnaissance le 2 janvier 2026<br />
          Lieu à découvrir prochainement ✨
        </p>
        
        <div ref={ctaRef} className="mt-8 md:mt-12">
          <a 
            href="#registration" 
            className="btn btn-primary text-lg md:text-xl relative overflow-hidden group"
          >
            <span className="relative z-10">Je réserve ma place</span>
            <span className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
          </a>
        </div>
      </div>

      <div className="absolute z-20 inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
        <button
          onClick={handlePrevSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white opacity-60 hover:opacity-100 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-gold-500"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNextSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white opacity-60 hover:opacity-100 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-gold-500"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImageIndex === index ? 'bg-gold-500 w-8' : 'bg-white/50 hover:bg-white'
            }`}
            onClick={() => {
              slideDirection.current = index > currentImageIndex ? 'right' : 'left';
              setCurrentImageIndex(index);
            }}
            aria-label={`Image ${index + 1}`}
          />
        ))}
      </div>
    </header>
  );
};

export default Hero;