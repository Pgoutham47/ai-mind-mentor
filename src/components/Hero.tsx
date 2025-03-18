
import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';

const Hero: React.FC = () => {
  const chatBubbleRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Simulated typing effect for chat bubble
  useEffect(() => {
    const messages = [
      "How do I validate my startup idea?",
      "Based on market research, your concept shows promise. Focus on validating with potential customers through interviews and a minimum viable product.",
      "What's the best way to pitch to investors?",
      "Craft a compelling story about your problem and solution. Emphasize traction, market size, and your unique advantage. Keep it under 3 minutes with clear asks."
    ];
    
    let currentMessageIndex = 0;
    let currentCharIndex = 0;
    let isResponse = false;
    let typingSpeed = isResponse ? 30 : 50; // Responses type faster than questions
    let bubbleElement = chatBubbleRef.current?.querySelector('.chat-content');
    
    if (!bubbleElement) return;
    
    const typeNextChar = () => {
      if (!bubbleElement) return;
      
      const currentMessage = messages[currentMessageIndex];
      
      if (currentCharIndex < currentMessage.length) {
        bubbleElement.textContent = currentMessage.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(typeNextChar, typingSpeed);
      } else {
        // Finished typing the current message
        setTimeout(() => {
          // Move to next message
          currentMessageIndex = (currentMessageIndex + 1) % messages.length;
          currentCharIndex = 0;
          isResponse = !isResponse;
          typingSpeed = isResponse ? 30 : 50;
          
          // Update bubble style based on whether it's a question or response
          if (chatBubbleRef.current) {
            const bubble = chatBubbleRef.current;
            
            if (isResponse) {
              bubble.classList.remove('bg-gray-100', 'dark:bg-gray-800');
              bubble.classList.add('bg-primary/10', 'border', 'border-primary/20');
            } else {
              bubble.classList.remove('bg-primary/10', 'border', 'border-primary/20');
              bubble.classList.add('bg-gray-100', 'dark:bg-gray-800');
            }
          }
          
          // Start typing the next message
          bubbleElement!.textContent = '';
          setTimeout(typeNextChar, 1000);
        }, 2000);
      }
    };
    
    // Start the typing effect after a delay
    setTimeout(typeNextChar, 1000);
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  // Mouse tracking for orb and particle effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return;
      
      const rect = sceneRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      setMousePosition({ x, y });
      
      // Move orb with damping effect
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${x * 30}px, ${y * 30}px, 0) rotate(${x * 10}deg)`;
        orbRef.current.style.boxShadow = `
          0 0 30px 10px rgba(77, 171, 245, ${0.2 + Math.abs(x) * 0.1}), 
          0 0 100px 20px rgba(114, 9, 183, ${0.1 + Math.abs(y) * 0.05})
        `;
      }
      
      // Animate grid points
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.grid-particle');
        particles.forEach((particle: Element) => {
          const particleRect = particle.getBoundingClientRect();
          const particleX = particleRect.left + particleRect.width / 2;
          const particleY = particleRect.top + particleRect.height / 2;
          
          const distanceX = e.clientX - particleX;
          const distanceY = e.clientY - particleY;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          
          const maxDistance = 150;
          const repulsion = Math.max(0, 1 - distance / maxDistance);
          
          if (repulsion > 0) {
            const angle = Math.atan2(distanceY, distanceX);
            const translateX = -Math.cos(angle) * repulsion * 20;
            const translateY = -Math.sin(angle) * repulsion * 20;
            
            (particle as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
            (particle as HTMLElement).style.opacity = (0.3 + repulsion * 0.7).toString();
          } else {
            (particle as HTMLElement).style.transform = 'translate(0, 0)';
            (particle as HTMLElement).style.opacity = '0.3';
          }
        });
      }
    };
    
    // Scroll handler for parallax and effects
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollTop / windowHeight, 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Create grid particles
  useEffect(() => {
    if (!particlesRef.current) return;
    
    // Clear existing particles
    while (particlesRef.current.firstChild) {
      particlesRef.current.removeChild(particlesRef.current.firstChild);
    }
    
    // Create grid particles
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'grid-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particlesRef.current.appendChild(particle);
    }
  }, []);
  
  // Audio feedback (subtle)
  useEffect(() => {
    const createAudioContext = () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();
        
        // Create quick, subtle hover sound for important elements
        const createHoverSound = (element: HTMLElement) => {
          element.addEventListener('mouseenter', () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(2200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
          });
        };
        
        // Add sound to main interactive elements
        const buttons = document.querySelectorAll('.hero-cta-button');
        buttons.forEach(button => createHoverSound(button as HTMLElement));
        
        if (orbRef.current) {
          createHoverSound(orbRef.current);
        }
      } catch (e) {
        console.log('Audio context not supported or user interaction required');
      }
    };
    
    // Initialize audio context after user interaction
    const initialUserInteraction = () => {
      createAudioContext();
      document.removeEventListener('click', initialUserInteraction);
    };
    
    document.addEventListener('click', initialUserInteraction);
    
    return () => {
      document.removeEventListener('click', initialUserInteraction);
    };
  }, []);
  
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sceneRef}
      className="relative min-h-screen pt-32 pb-16 overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Zero-Gravity Grid Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden perspective preserve-3d">
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        
        {/* Holographic Overlay */}
        <div 
          className="absolute inset-0 holographic-overlay pointer-events-none"
          style={{ opacity: 0.1 + scrollProgress * 0.3 }}
        >
          <div className="holographic-lines"></div>
          <div className="holographic-glow"></div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent" />
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl transform transition-transform"
          style={{ 
            transform: `translate3d(-50%, -50%, 0) scale(${1 + scrollProgress * 0.2})`,
            opacity: 1 - scrollProgress * 0.8
          }} 
        />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-300/10 dark:bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-sky-300/10 dark:bg-sky-400/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary mb-2 text-sm font-medium">
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></span>
            Insirra Forge - Startup Acceleration Hub
          </div>
          
          <div className="overflow-hidden">
            <AnimatedText 
              text="Your AI-Powered Startup Ecosystem"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight lg:leading-tight glitch-text"
              animation="typewriter"
              typewriterSpeed={70}
            />
          </div>
          
          <AnimatedText
            text="Get AI-driven insights, strategic tools, and networking opportunities. Guiding startups through every stage of growth."
            className="text-lg text-muted-foreground max-w-xl lg:mx-0 mx-auto"
            delay={300}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 mx-auto lg:mx-0 max-w-md sm:max-w-none">
            <a 
              href="#cta" 
              className="hero-cta-button bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/20 relative overflow-hidden group"
            >
              <span className="relative z-10">Join Insirra Forge</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>
            <button 
              onClick={scrollToFeatures}
              className="hero-cta-button flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group"
            >
              <span className="relative z-10">Explore Features</span>
              <ChevronDown className="h-4 w-4 relative z-10" />
              <span className="absolute inset-0 bg-gradient-to-r from-secondary via-slate-500 to-secondary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
          </div>
        </div>
        
        {/* 3D Orb Interface & Chat Bubble */}
        <div className="w-full lg:w-1/2 relative perspective preserve-3d">
          {/* Main Floating Orb */}
          <div 
            ref={orbRef}
            className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-blue-500/20 rounded-full backdrop-blur-xl transition-transform duration-500 floating-orb"
            style={{ 
              boxShadow: '0 0 30px 10px rgba(77, 171, 245, 0.2), 0 0 100px 20px rgba(114, 9, 183, 0.1)',
              transition: 'transform 0.1s ease-out, box-shadow 0.3s ease-out'
            }}
          >
            <div className="absolute inset-2 bg-gradient-to-br from-primary/10 to-blue-400/10 rounded-full border border-white/20 pulse-slow"></div>
            <div className="absolute inset-0 orb-particles"></div>
          </div>
          
          {/* Main Image with advanced effects */}
          <div className="relative mx-auto max-w-md perspective preserve-3d" style={{ 
            transform: `translateZ(0) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
            transition: 'transform 0.5s ease-out'
          }}>
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 relative">
              <img 
                src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Founder with AI" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              
              {/* Data visualizations overlay */}
              <div className="absolute inset-0 data-grid opacity-30 pointer-events-none"></div>
              
              {/* Glitch effect on hover */}
              <div className="absolute inset-0 glitch-overlay opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            {/* Chat Bubble with enhanced style */}
            <div 
              ref={chatBubbleRef}
              className="absolute -top-16 -right-8 max-w-xs p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg animate-float backdrop-blur-sm border border-white/20 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shrink-0 shadow-glow">
                  <MessageSquare className="h-4 w-4 text-white" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse-soft"></span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Insirra GPT</p>
                  <p className="text-sm chat-content">How do I validate my startup idea?</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-4 h-4 bg-gray-100 dark:bg-gray-800 border-r border-b border-white/20"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator with enhanced style */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm mb-2 text-muted-foreground">Scroll to explore</span>
        <div className="w-[30px] h-[50px] rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1 relative overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce mt-1"></div>
          <div className="absolute inset-0 scanning-line"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
