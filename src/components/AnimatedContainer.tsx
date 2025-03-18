
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  animation?: 'fade-in' | 'slide-up' | 'slide-right' | 'scale-in' | 'fold-out';
  perspective?: boolean;
  particleBackground?: boolean;
  particleColor?: string;
  particleCount?: number;
  glassmorphism?: boolean;
  neonBorder?: boolean;
  neonColor?: string;
  cyberpunk?: boolean;
  interactive?: boolean;
  liquidEffect?: boolean;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className,
  delay = 0,
  once = true,
  animation = 'fade-in',
  perspective = false,
  particleBackground = false,
  particleColor = 'rgba(77, 171, 245, 0.5)',
  particleCount = 50,
  glassmorphism = false,
  neonBorder = false,
  neonColor = 'rgba(77, 171, 245, 0.8)',
  cyberpunk = false,
  interactive = false,
  liquidEffect = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particles = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.classList.add(`animate-${animation}`);
                containerRef.current.style.opacity = '1';
              }
              hasAnimated.current = true;
            }, delay);
            
            if (once) observer.disconnect();
          } else if (!once) {
            if (containerRef.current) {
              containerRef.current.classList.remove(`animate-${animation}`);
              containerRef.current.style.opacity = '0';
            }
            hasAnimated.current = false;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [once, delay, animation]);

  // Generate particles for background
  useEffect(() => {
    if (!particleBackground || !particlesRef.current) return;
    
    // Clear existing particles
    while (particlesRef.current.firstChild) {
      particlesRef.current.removeChild(particlesRef.current.firstChild);
    }
    
    particles.current = [];
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 1;
      
      particle.className = 'absolute rounded-full';
      particle.style.backgroundColor = particleColor;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
      particle.style.transform = `translateZ(${Math.random() * 50 - 25}px)`;
      particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesRef.current.appendChild(particle);
      particles.current.push(particle);
    }
    
    return () => {
      if (particlesRef.current) {
        while (particlesRef.current.firstChild) {
          particlesRef.current.removeChild(particlesRef.current.firstChild);
        }
      }
    };
  }, [particleBackground, particleColor, particleCount]);

  // Handle mouse interaction for interactive effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update mouse position for liquid effect or other interactions
    setMousePosition({ x, y });
    
    // Move particles based on mouse position if we have interactive particles
    if (particleBackground && particles.current.length > 0) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const moveX = (x - centerX) / centerX;
      const moveY = (y - centerY) / centerY;
      
      particles.current.forEach(particle => {
        const speedFactor = parseFloat(particle.style.width) / 5; // Smaller particles move more
        const translateX = moveX * 20 * speedFactor * (Math.random() - 0.5);
        const translateY = moveY * 20 * speedFactor * (Math.random() - 0.5);
        
        particle.style.transform = `translate(${translateX}px, ${translateY}px) translateZ(${Math.random() * 50 - 25}px)`;
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative transition-all overflow-hidden',
        perspective && 'perspective preserve-3d',
        glassmorphism && 'backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10',
        neonBorder && 'border border-transparent',
        cyberpunk && 'cyber-glitch',
        liquidEffect && 'liquid-edge',
        interactive && 'cursor-pointer',
        className
      )}
      style={{ 
        opacity: 0,
        willChange: 'transform, opacity',
        boxShadow: neonBorder 
          ? `0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 20px ${neonColor}`
          : undefined,
        transition: interactive 
          ? 'transform 0.3s ease-out, opacity 0.5s ease-out, box-shadow 0.3s ease-out' 
          : 'opacity 0.5s ease-out, transform 0.5s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        
        // Reset particle positions
        if (particleBackground && particles.current.length > 0 && particlesRef.current) {
          particles.current.forEach(particle => {
            particle.style.transform = `translateZ(${Math.random() * 50 - 25}px)`;
          });
        }
      }}
    >
      {particleBackground && (
        <div 
          ref={particlesRef} 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ 
            zIndex: 0,
            perspective: '1000px',
            perspectiveOrigin: `${mousePosition.x}px ${mousePosition.y}px`
          }}
        />
      )}
      
      {cyberpunk && (
        <div className="absolute inset-0 cyber-overlay pointer-events-none" style={{ 
          backgroundImage: 'linear-gradient(transparent 0%, rgba(32, 128, 255, 0.2) 2%, rgba(32, 128, 255, 0.0) 3%, rgba(32, 128, 255, 0.1) 3%, transparent 100%)',
          backgroundSize: '100% 4px',
          zIndex: 2,
          opacity: isHovered ? 0.8 : 0.2,
          animation: 'scan 6s linear infinite'
        }} />
      )}
      
      {liquidEffect && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
            zIndex: 1
          }}
        />
      )}
      
      <div className="relative z-1">{children}</div>
    </div>
  );
};

export default AnimatedContainer;
