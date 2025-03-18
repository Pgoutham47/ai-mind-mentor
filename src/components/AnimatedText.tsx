
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  animation?: 'slide-up' | 'slide-right' | 'fade-in' | 'glitch' | 'wave';
  staggerChildren?: boolean;
  glowColor?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  once = true,
  delay = 0,
  animation = 'slide-up',
  staggerChildren = false,
  glowColor
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            
            setTimeout(() => {
              if (elementRef.current) {
                if (staggerChildren) {
                  // No immediate class addition - will be handled per character
                } else {
                  elementRef.current.classList.add(`animate-${animation}`);
                  elementRef.current.style.opacity = '1';
                }
              }
              hasAnimated.current = true;
            }, delay);
            
            if (once) observer.disconnect();
          } else if (!once) {
            if (elementRef.current) {
              elementRef.current.classList.remove(`animate-${animation}`);
              elementRef.current.style.opacity = '0';
            }
            hasAnimated.current = false;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [once, delay, animation]);

  // Handle staggered character animations
  const renderStaggeredText = () => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className={`inline-block opacity-0`}
        style={{ 
          animation: `${animation} 0.5s ease-out forwards`,
          animationDelay: `${delay + (index * 0.03)}s`,
          display: char === ' ' ? 'inline-block' : undefined,
          width: char === ' ' ? '0.3em' : undefined,
        }}
      >
        {char}
      </span>
    ));
  };

  // Handle wave animation
  const renderWaveText = () => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className={`inline-block`}
        style={{ 
          animation: `float 2s ease-in-out infinite`,
          animationDelay: `${index * 0.05}s`,
          display: char === ' ' ? 'inline-block' : undefined,
          width: char === ' ' ? '0.3em' : undefined,
        }}
      >
        {char}
      </span>
    ));
  };

  // Handle glitch animation
  const renderGlitchText = () => {
    return (
      <div className="glitch-wrapper">
        <div 
          className="glitch" 
          data-text={text}
          style={{
            '--glitch-color': glowColor || 'rgba(77, 171, 245, 0.5)'
          } as React.CSSProperties}
        >
          {text}
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={elementRef} 
      className={cn(
        animation === 'glitch' ? 'opacity-100' : 'opacity-0',
        className
      )} 
      style={{ 
        willChange: 'transform, opacity',
        textShadow: glowColor ? `0 0 8px ${glowColor}` : undefined
      }}
    >
      {staggerChildren ? renderStaggeredText() : 
       animation === 'wave' ? renderWaveText() : 
       animation === 'glitch' ? renderGlitchText() : 
       text}
    </div>
  );
};

export default AnimatedText;
