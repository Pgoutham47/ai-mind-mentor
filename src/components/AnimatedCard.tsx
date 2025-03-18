
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  animation?: 'zoom-in' | 'slide-up' | 'fade-in' | 'flip' | 'tilt';
  interactive?: boolean;
  glassmorphism?: boolean;
  neonBorder?: boolean;
  neonColor?: string;
  depth?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  delay = 0,
  once = true,
  animation = 'zoom-in',
  interactive = false,
  glassmorphism = false,
  neonBorder = false,
  neonColor = 'rgba(77, 171, 245, 0.8)',
  depth = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            
            setTimeout(() => {
              if (cardRef.current) {
                cardRef.current.classList.add(`animate-${animation}`);
                cardRef.current.style.opacity = '1';
              }
              hasAnimated.current = true;
            }, delay);
            
            if (once) observer.disconnect();
          } else if (!once) {
            if (cardRef.current) {
              cardRef.current.classList.remove(`animate-${animation}`);
              cardRef.current.style.opacity = '0';
            }
            hasAnimated.current = false;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [once, delay, animation]);

  // Handle mouse interaction for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || animation !== 'tilt') return;
    
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10; // Max 10deg rotation
    const rotateX = ((centerY - y) / centerY) * 10; // Max 10deg rotation
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  const resetTilt = () => {
    if (!interactive) return;
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'transition-all duration-500 ease-out',
        interactive && 'cursor-pointer',
        glassmorphism && 'backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10',
        neonBorder && 'border border-transparent',
        animation === 'flip' && 'perspective preserve-3d',
        className
      )}
      style={{ 
        opacity: 0,
        willChange: 'transform, opacity',
        transform: interactive && animation === 'tilt' && isHovered
          ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale3d(1.05, 1.05, 1.05)`
          : undefined,
        boxShadow: neonBorder 
          ? `0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 15px ${neonColor}`
          : depth > 0 
          ? `0 ${depth * 4}px ${depth * 8}px rgba(0, 0, 0, 0.15)`
          : undefined,
        transition: interactive 
          ? 'transform 0.2s ease-out, opacity 0.5s ease-out, box-shadow 0.3s ease-out' 
          : 'opacity 0.5s ease-out, transform 0.5s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetTilt();
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
