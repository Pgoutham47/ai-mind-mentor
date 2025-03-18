
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  delay = 0,
  once = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            
            setTimeout(() => {
              if (cardRef.current) {
                cardRef.current.classList.add('animate-zoom-in');
                cardRef.current.style.opacity = '1';
              }
              hasAnimated.current = true;
            }, delay);
            
            if (once) observer.disconnect();
          } else if (!once) {
            if (cardRef.current) {
              cardRef.current.classList.remove('animate-zoom-in');
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
  }, [once, delay]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'transition-all duration-500 ease-out',
        className
      )}
      style={{ opacity: 0, willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
