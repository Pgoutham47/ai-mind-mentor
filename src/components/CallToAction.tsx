
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import AnimatedText from './AnimatedText';

const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  
  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section 
      id="cta" 
      ref={containerRef}
      className="section bg-gradient-to-br from-primary/90 to-blue-500 relative overflow-hidden text-white perspective preserve-3d"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent)]" />
        <div 
          className="absolute inset-0 backdrop-blur-[100px] opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),transparent)]"
          style={{
            backgroundPosition: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`
          }}
        />
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              transform: `translateZ(${Math.random() * 50 - 25}px)`
            }}
          />
        ))}
      </div>
      
      {/* Holographic Grid Lines */}
      <div className="absolute inset-0 -z-5 holographic-overlay opacity-20 pointer-events-none">
        <div className="holographic-lines"></div>
      </div>
      
      <div 
        className="container mx-auto px-4 relative z-10 py-24"
        style={{
          transform: `translateZ(20px) rotateX(${(mousePosition.y - 0.5) * -5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
            Start Your Journey Today
          </span>
          
          <AnimatedText
            text="Your Startup, Supercharged by AI"
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
            animation="glitch"
            glowColor="rgba(255, 255, 255, 0.8)"
          />
          
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Join thousands of founders who are leveraging AI to make better decisions, 
            secure funding, and build successful companies with the Insirra Forge ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 min-w-44 relative overflow-hidden group"
            >
              <span className="relative z-10">Join Insirra Forge</span>
              <ArrowRight className="h-4 w-4 relative z-10" />
              <span className="absolute inset-0 bg-gradient-to-r from-white via-blue-100 to-white bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>
            <a 
              href="#" 
              className="bg-transparent hover:bg-white/10 border border-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 min-w-44 relative overflow-hidden group backdrop-blur-sm"
            >
              <span className="relative z-10">
                <Play className="h-4 w-4 inline mr-1" />
                Watch Demo
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>
          </div>
          
          <p className="mt-8 text-sm text-white/70">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
