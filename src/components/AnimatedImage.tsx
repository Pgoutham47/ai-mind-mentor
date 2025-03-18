
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  delay?: number;
  once?: boolean;
  animation?: 'fade-in' | 'zoom-in' | 'slide-up' | 'slide-right' | 'parallax';
  parallaxStrength?: number;
  meshEffect?: boolean;
  interactOnHover?: boolean;
  distortion?: boolean;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className,
  imageClassName,
  delay = 0,
  once = true,
  animation = 'fade-in',
  parallaxStrength = 20,
  meshEffect = false,
  interactOnHover = false,
  distortion = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const hasAnimated = useRef(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  // Parallax effect on scroll
  useEffect(() => {
    if (animation !== 'parallax' || !imageRef.current) return;

    const handleScroll = () => {
      if (!imageRef.current) return;
      
      const scrollTop = window.pageYOffset;
      const elementTop = imageRef.current.getBoundingClientRect().top + scrollTop;
      const relativeScroll = scrollTop - elementTop;
      const translateY = (relativeScroll * 0.1) * (parallaxStrength / 20); // Adjust parallax intensity
      
      imageRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animation, parallaxStrength]);

  // Handle mouse interaction for distortion/hover effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactOnHover) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'overflow-hidden relative',
        interactOnHover && 'cursor-pointer',
        className
      )}
      style={{ 
        opacity: 0,
        perspective: animation === 'parallax' ? '1000px' : undefined
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={cn(
          'transition-all duration-700',
          isLoaded ? 'blur-0 scale-100' : 'blur-sm scale-105',
          meshEffect && 'mesh-effect',
          distortion && 'distortion-effect',
          imageClassName
        )}
        style={{ 
          willChange: 'transform, filter',
          filter: distortion && isHovered 
            ? `hue-rotate(${mousePosition.x * 0.1}deg) contrast(${100 + mousePosition.y * 0.2}%)`
            : undefined,
          transform: interactOnHover && isHovered && !distortion
            ? `scale(1.05) translate(${(mousePosition.x - 50) * -0.05}%, ${(mousePosition.y - 50) * -0.05}%)`
            : undefined
        }}
        onLoad={() => setIsLoaded(true)}
      />
      
      {meshEffect && isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none mesh-overlay z-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
            transform: `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.05}deg) rotateY(${(mousePosition.x - 50) * -0.05}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      )}
    </div>
  );
};

export default AnimatedImage;
