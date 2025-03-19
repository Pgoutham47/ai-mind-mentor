
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play, Sparkles, Zap, Star, Bot, Cpu, Flame, Trophy } from 'lucide-react';
import AnimatedText from './AnimatedText';

const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [hoverButton, setHoverButton] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  
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

  // Glitch effect handler
  const handleGlitchEffect = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 1500);
  };
  
  // Handle OnlySturtups Easter Egg
  const handleSpecialClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickCount >= 4) {
      setShowEasterEgg(true);
      playGlitchSound();
      
      setTimeout(() => {
        setShowEasterEgg(false);
        setClickCount(0);
      }, 5000);
    }
  };
  
  const playGlitchSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Audio context not supported or user interaction required');
    }
  };
  
  return (
    <section 
      id="cta" 
      ref={containerRef}
      className={`section relative overflow-hidden text-white perspective preserve-3d ${isGlitching ? 'glitch-effect' : ''}`}
      style={{
        background: 'linear-gradient(to bottom right, #111111, #222222)',
      }}
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
      
      {/* Only Startups Easter Egg */}
      {showEasterEgg && (
        <div className="absolute inset-0 z-50 bg-gradient-to-br from-[#300A24] to-[#170312] flex items-center justify-center">
          <div className="max-w-md text-center p-6">
            <div className="text-3xl font-bold text-[#FF00FF] mb-4 flex items-center justify-center gap-2">
              <Trophy className="h-8 w-8 text-[#FFD700]" />
              <span>OnlyStartups</span>
              <Trophy className="h-8 w-8 text-[#FFD700]" />
            </div>
            <p className="text-[#00FFDD] mb-6">Premium content for the most dedicated hustlers only!</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {["Growth Hacking Secrets", "VC Dating Tips", "Stealth Mode Techniques", "The 10X Mindset"].map((plan, i) => (
                <div key={i} className="bg-black/40 p-4 rounded-lg border border-[#FF00FF]/30 w-40">
                  <div className="text-xl font-bold mb-2 text-white">{plan}</div>
                  <div className="text-[#00FFDD] font-mono">$69.42/mo</div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-white/60 text-xs">
              JK! This is a parody. Keep hustling for free!
            </div>
          </div>
        </div>
      )}
      
      <div 
        className="container mx-auto px-4 relative z-10 py-24"
        style={{
          transform: `translateZ(20px) rotateX(${(mousePosition.y - 0.5) * -5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <span 
            className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#00FFDD]/20 to-[#FF00FF]/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/10 transform -rotate-1 cursor-pointer"
            onClick={handleGlitchEffect}
          >
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
          
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto transform -rotate-1 font-glitch">
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
          
          <p 
            className="mt-8 text-sm text-white/70 font-mono animate-pulse cursor-pointer" 
            onClick={handleSpecialClick}
          >
            <span className="relative group">
              No credit card required. <span className="text-[#00FFDD] group-hover:text-[#FF00FF] transition-colors">Cancel anytime.</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF00FF] group-hover:w-full transition-all"></span>
            </span>
          </p>
        </div>
      </div>
      
      {/* TikTok-style side comments */}
      <div className="absolute right-4 top-1/3 max-w-[150px] bg-black/60 p-3 rounded-lg border border-[#FF00FF]/30 text-white transform rotate-3 text-sm">
        <div className="flex items-center gap-1 mb-1">
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#00FFDD] to-[#FF00FF]"></div>
          <span className="font-bold">@hustleBro</span>
        </div>
        <p>omg this AI helped me raise 500k in 2 weeks 🔥</p>
        <div className="flex items-center gap-2 mt-2 text-xs">
          <Flame className="h-3 w-3" /> 1.2k
        </div>
      </div>
      
      <div className="absolute left-4 bottom-1/3 max-w-[150px] bg-black/60 p-3 rounded-lg border border-[#00FFDD]/30 text-white transform -rotate-2 text-sm">
        <div className="flex items-center gap-1 mb-1">
          <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-[#FF00FF] to-[#00FFDD]"></div>
          <span className="font-bold">@vc_girlboss</span>
        </div>
        <p>I use this to vet all my deals now lol</p>
        <div className="flex items-center gap-2 mt-2 text-xs">
          <Flame className="h-3 w-3" /> 943
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
