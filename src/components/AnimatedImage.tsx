
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  delay?: number;
  once?: boolean;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className,
  imageClassName,
  delay = 0,
  once = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.classList.add('animate-fade-in');
                containerRef.current.style.opacity = '1';
              }
              hasAnimated.current = true;
            }, delay);
            
            if (once) observer.disconnect();
          } else if (!once) {
            if (containerRef.current) {
              containerRef.current.classList.remove('animate-fade-in');
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
  }, [once, delay]);

  // Add blur-up loading effect
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden', className)}
      style={{ opacity: 0 }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={cn(
          'transition-all duration-700',
          isLoaded ? 'blur-0 scale-100' : 'blur-sm scale-105',
          imageClassName
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default AnimatedImage;
