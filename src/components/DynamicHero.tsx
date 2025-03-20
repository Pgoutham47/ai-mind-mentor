
import React, { useRef, useEffect, useState } from 'react';
import { BrainCog, Sparkles, Cpu } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { Button } from './ui/button';
import Hero3D from './Hero3D';

interface DynamicHeroProps {
  className?: string;
}

const DynamicHero: React.FC<DynamicHeroProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offsetTop = rect.top + scrollTop;
      const scrollPosition = scrollTop - offsetTop;
      const scrollPercentage = Math.min(Math.max(scrollPosition / (rect.height - window.innerHeight), 0), 1);
      
      setScrollProgress(scrollPercentage);
      
      // Apply transformations based on scroll
      if (textContainerRef.current) {
        const translateY = scrollPercentage * -100;
        const opacity = 1 - scrollPercentage * 1.5;
        
        textContainerRef.current.style.transform = `translateY(${translateY}px)`;
        textContainerRef.current.style.opacity = opacity.toString();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Simulate particle text assembly effect
  const particleTextRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const createParticleEffect = () => {
      if (!particleTextRef.current) return;
      
      particleTextRef.current.classList.add('particle-text-active');
      
      // Create particles for each character
      const text = particleTextRef.current.textContent || '';
      particleTextRef.current.textContent = '';
      
      const fragment = document.createDocumentFragment();
      
      [...text].forEach((char) => {
        if (char === ' ') {
          const spaceSpan = document.createElement('span');
          spaceSpan.textContent = ' ';
          fragment.appendChild(spaceSpan);
          return;
        }
        
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.className = 'particle-char';
        charSpan.style.opacity = '0';
        charSpan.style.transform = `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px)`;
        charSpan.style.transition = `all ${0.5 + Math.random() * 0.5}s cubic-bezier(0.34, 1.56, 0.64, 1)`;
        charSpan.style.transitionDelay = `${Math.random() * 0.5 + 0.1}s`;
        
        fragment.appendChild(charSpan);
      });
      
      particleTextRef.current.appendChild(fragment);
      
      // Trigger animation after a small delay
      setTimeout(() => {
        if (!particleTextRef.current) return;
        
        const charElements = particleTextRef.current.querySelectorAll('.particle-char');
        charElements.forEach((char) => {
          (char as HTMLElement).style.opacity = '1';
          (char as HTMLElement).style.transform = 'translate(0, 0)';
        });
      }, 100);
    };
    
    // Run the particle effect
    createParticleEffect();
  }, []);
  
  // Liquid button effect with sound
  const liquidButtonRef = useRef<HTMLButtonElement>(null);
  
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!liquidButtonRef.current) return;
    
    const rect = liquidButtonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    liquidButtonRef.current.style.setProperty('--mouse-x', x.toString());
    liquidButtonRef.current.style.setProperty('--mouse-y', y.toString());
  };
  
  const handleButtonSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log('Audio context not supported or user interaction required');
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={`min-h-screen relative flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      {/* 3D Scene */}
      <Hero3D className="absolute inset-0 z-0" />
      
      {/* Content */}
      <div 
        ref={textContainerRef}
        className="container mx-auto px-4 md:px-6 relative z-10 pt-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 flex items-center justify-center space-x-2">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10 p-2.5 backdrop-blur-sm">
              <BrainCog className="h-7 w-7 text-primary animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-primary/20"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-primary/0"></div>
            </div>
            <div className="text-sm font-mono text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
              <span className="text-primary">AI</span> Mentor
            </div>
          </div>
          
          <h1 
            ref={particleTextRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 text-balance"
          >
            AI That Thinks Like a Startup Mentor
          </h1>
          
          <div className="relative">
            <AnimatedText
              text="Our advanced AI combines the wisdom of successful founders, investors, and industry experts to provide you with guidance that's both technically sound and strategically insightful."
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              animation="fade-in"
              delay={500}
            />
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              <Button 
                ref={liquidButtonRef}
                size="lg" 
                className="liquid-button relative group overflow-hidden"
                onMouseMove={handleButtonMouseMove}
                onMouseEnter={() => {
                  setIsHovered(true);
                  handleButtonSound();
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 font-medium">Try Instra GPT</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="liquid-fill"></span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group transition-all duration-300 perspective"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="group-hover:translate-y-0.5 transition-transform flex items-center gap-2">
                  Explore Features <Sparkles className="w-4 h-4 text-primary transition-all group-hover:rotate-12" />
                </span>
              </Button>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <div className="scroll-indicator relative">
              <div className="flex items-center text-sm text-muted-foreground font-medium mb-2">
                <Cpu className="w-4 h-4 mr-2 text-primary" />
                Scroll to explore
              </div>
              <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center items-start p-1">
                <div className="w-1.5 h-2.5 bg-primary rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating stats that become visible on scroll */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: Math.min(scrollProgress * 3, 1),
          transform: `translateY(${50 - scrollProgress * 100}px)`
        }}
      >
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-background/60 backdrop-blur-md px-3 py-2 rounded-lg border border-primary/20">
          <div className="text-xs font-mono text-muted-foreground">Growth Rate</div>
          <div className="text-2xl font-bold text-primary">+87%</div>
        </div>
        
        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 bg-background/60 backdrop-blur-md px-3 py-2 rounded-lg border border-primary/20">
          <div className="text-xs font-mono text-muted-foreground">Accuracy</div>
          <div className="text-2xl font-bold text-primary">92.8%</div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 translate-y-1/2 bg-background/60 backdrop-blur-md px-3 py-2 rounded-lg border border-primary/20">
          <div className="text-xs font-mono text-muted-foreground">Founder Insights</div>
          <div className="text-2xl font-bold text-primary">1.2M+</div>
        </div>
      </div>
      
      {/* CSS for special effects */}
      <style jsx>{`
        .particle-char {
          display: inline-block;
          will-change: transform, opacity;
        }
        
        .liquid-button {
          --mouse-x: 0.5;
          --mouse-y: 0.5;
        }
        
        .liquid-fill {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%),
            rgba(77, 171, 245, 0.8) 0%,
            transparent 50%
          );
          transform: scale(0);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%);
          opacity: 0;
        }
        
        .group:hover .liquid-fill {
          transform: scale(2);
          opacity: 0.2;
        }
        
        .scroll-indicator {
          animation: fadeInUp 1.5s 1s forwards;
          opacity: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicHero;
