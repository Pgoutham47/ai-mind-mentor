
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play, Sparkles, Zap, Star } from 'lucide-react';
import AnimatedText from './AnimatedText';

const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [hoverButton, setHoverButton] = useState('');
  
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
  
  // Sound effects
  const playBtnSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log('Audio context not supported or user interaction required');
    }
  };
  
  return (
    <section 
      id="cta" 
      ref={containerRef}
      className="section bg-gradient-to-br from-[#111111] to-[#222222] relative overflow-hidden text-white perspective preserve-3d"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-40 bg-[radial-gradient(circle_at_top,rgba(0,255,221,0.1),transparent)]" />
        <div 
          className="absolute inset-0 backdrop-blur-[100px] opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.6),transparent)]"
          style={{
            backgroundPosition: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`
          }}
        />
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() > 0.5 ? '0, 255, 221' : '255, 0, 255'}, ${Math.random() * 0.5 + 0.2})`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              transform: `translateZ(${Math.random() * 50 - 25}px)`
            }}
          />
        ))}
      </div>
      
      {/* Holographic Grid Lines */}
      <div className="absolute inset-0 -z-5 holographic-overlay opacity-40 pointer-events-none">
        <div className="holographic-lines"></div>
      </div>
      
      {/* Meme-inspired diagonal elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-[#00FFDD]/5 transform -skew-y-6"></div>
      <div className="absolute bottom-0 right-0 w-full h-24 bg-[#FF00FF]/5 transform skew-y-6"></div>
      
      <div 
        className="container mx-auto px-4 relative z-10 py-24"
        style={{
          transform: `translateZ(20px) rotateX(${(mousePosition.y - 0.5) * -5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#00FFDD]/20 to-[#FF00FF]/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/10 transform -rotate-1">
            <Sparkles className="h-3 w-3 inline mr-1 text-[#00FFDD]" /> 
            Start Your Journey Today
          </span>
          
          <div className="transform rotate-1">
            <AnimatedText
              text="Your Startup, Supercharged by AI"
              className="text-4xl md:text-5xl font-bold mb-6 text-balance bg-clip-text text-transparent bg-gradient-to-r from-[#00FFDD] to-[#FF00FF]"
              animation="glitch"
              glowColor="rgba(0, 255, 221, 0.8)"
            />
          </div>
          
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto transform -rotate-1">
            Join thousands of founders who are leveraging AI to make better decisions, 
            secure funding, and build successful companies with the Insirra Forge ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="bg-gradient-to-r from-[#FF00FF] to-[#00FFDD] text-white hover:bg-white/90 px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg flex items-center justify-center gap-2 min-w-44 relative overflow-hidden group"
              onMouseEnter={() => { setHoverButton('join'); playBtnSound(); }}
              onMouseLeave={() => setHoverButton('')}
            >
              <span className="relative z-10 flex items-center">
                {hoverButton === 'join' ? "Let's Go Viral 🚀" : "Join Insirra Forge"}
                {hoverButton === 'join' ? 
                  <Star className="h-4 w-4 ml-2 animate-spin" /> : 
                  <ArrowRight className="h-4 w-4 ml-2" />
                }
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00FFDD] via-[#FF00FF] to-[#00FFDD] bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
              
              {/* Confetti effect */}
              {hoverButton === 'join' && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({length: 15}).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        animation: `confetti ${1 + Math.random()}s ease-out forwards`,
                        animationDelay: `${Math.random() * 0.3}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </a>
            
            <a 
              href="#" 
              className="bg-transparent hover:bg-white/10 border border-[#00FFDD] hover:border-[#FF00FF] px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center gap-2 min-w-44 relative overflow-hidden group backdrop-blur-sm"
              onMouseEnter={() => { setHoverButton('watch'); playBtnSound(); }}
              onMouseLeave={() => setHoverButton('')}
            >
              <span className="relative z-10 flex items-center">
                {hoverButton === 'watch' ? (
                  <>
                    <Zap className="h-4 w-4 mr-1 text-[#00FFDD]" />
                    Watch Demo
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-1" />
                    Watch Demo
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>
          </div>
          
          <p className="mt-8 text-sm text-white/70 font-mono animate-pulse">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
