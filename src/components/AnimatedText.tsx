
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  once = true,
  delay = 0
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
                elementRef.current.classList.add('animate-slide-up');
                elementRef.current.style.opacity = '1';
              }
              hasAnimated.current = true;
            }, delay);
            
            if (once) observer.disconnect();
          } else if (!once) {
            if (elementRef.current) {
              elementRef.current.classList.remove('animate-slide-up');
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
  }, [once, delay]);

  return (
    <div 
      ref={elementRef} 
      className={cn(className)} 
      style={{ opacity: 0, willChange: 'transform, opacity' }}
    >
      {text}
    </div>
  );
};

export default AnimatedText;
