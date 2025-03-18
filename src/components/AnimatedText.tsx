
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  animation?: 'slide-up' | 'slide-right' | 'fade-in' | 'glitch' | 'wave' | 'typewriter';
  staggerChildren?: boolean;
  glowColor?: string;
  typewriterCursor?: boolean;
  typewriterSpeed?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  once = true,
  delay = 0,
  animation = 'slide-up',
  staggerChildren = false,
  glowColor,
  typewriterCursor = true,
  typewriterSpeed = 50
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const typewriterRef = useRef<string>('');
  const typewriterIndexRef = useRef<number>(0);
  const typewriterTimerRef = useRef<number | null>(null);

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
                } else if (animation === 'typewriter') {
                  // Typewriter animation is handled separately
                  startTypewriterAnimation();
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
            
            // Reset typewriter animation if applicable
            if (animation === 'typewriter') {
              resetTypewriterAnimation();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (typewriterTimerRef.current !== null) {
        window.clearTimeout(typewriterTimerRef.current);
      }
    };
  }, [once, delay, animation, text]);

  // Typewriter animation functions
  const startTypewriterAnimation = () => {
    if (animation !== 'typewriter' || !elementRef.current) return;
    
    elementRef.current.style.opacity = '1';
    typewriterIndexRef.current = 0;
    typewriterRef.current = '';
    
    const typeNextChar = () => {
      if (typewriterIndexRef.current < text.length) {
        typewriterRef.current += text[typewriterIndexRef.current];
        typewriterIndexRef.current++;
        
        if (elementRef.current) {
          const textContent = elementRef.current.querySelector('.typewriter-text');
          if (textContent) {
            textContent.textContent = typewriterRef.current;
          }
        }
        
        typewriterTimerRef.current = window.setTimeout(typeNextChar, typewriterSpeed);
      }
    };
    
    typeNextChar();
  };
  
  const resetTypewriterAnimation = () => {
    typewriterIndexRef.current = 0;
    typewriterRef.current = '';
    
    if (typewriterTimerRef.current !== null) {
      window.clearTimeout(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }
    
    if (elementRef.current) {
      const textContent = elementRef.current.querySelector('.typewriter-text');
      if (textContent) {
        textContent.textContent = '';
      }
    }
  };

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
  
  // Handle typewriter animation
  const renderTypewriterText = () => {
    return (
      <div className="typewriter-container">
        <span className="typewriter-text"></span>
        {typewriterCursor && (
          <span className="typewriter-cursor">|</span>
        )}
      </div>
    );
  };

  return (
    <div 
      ref={elementRef} 
      className={cn(
        animation === 'glitch' ? 'opacity-100' : 'opacity-0',
        animation === 'typewriter' ? 'typewriter' : '',
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
       animation === 'typewriter' ? renderTypewriterText() : 
       text}
    </div>
  );
};

export default AnimatedText;
