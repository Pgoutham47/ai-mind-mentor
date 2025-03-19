import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, ChevronDown, Zap, Sparkles, Star, Flame, Bot, Cpu, GitPullRequest, TrendingUp, Bomb } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';

const Hero: React.FC = () => {
  const chatBubbleRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  
  const [buzzwords, setBuzzwords] = useState<Array<{id: number, text: string, x: number, y: number, scale: number, life: number, maxLife: number}>>([]);
  const [unicornProgress, setUnicornProgress] = useState(0);
  const [isRoastMode, setIsRoastMode] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [hoverButton, setHoverButton] = useState('');
  const [morphState, setMorphState] = useState(0);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showRetro, setShowRetro] = useState(false);
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // up up down down left right left right b a
  
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
    let typingSpeed = isResponse ? 30 : 50;
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
        setTimeout(() => {
          currentMessageIndex = (currentMessageIndex + 1) % messages.length;
          currentCharIndex = 0;
          isResponse = !isResponse;
          typingSpeed = isResponse ? 30 : 50;
          
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
          
          bubbleElement!.textContent = '';
          setTimeout(typeNextChar, 1000);
        }, 2000);
      }
    };
    
    setTimeout(typeNextChar, 1000);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === konamiCode[konamiIndex]) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);
        
        if (newIndex === konamiCode.length) {
          triggerRetroMode();
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return;
      
      const rect = sceneRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      setMousePosition({ x, y });
      
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${x * 30}px, ${y * 30}px, 0) rotate(${x * 10}deg)`;
        orbRef.current.style.boxShadow = `
          0 0 30px 10px rgba(0, 255, 240, ${0.2 + Math.abs(x) * 0.1}), 
          0 0 100px 20px rgba(245, 0, 245, ${0.1 + Math.abs(y) * 0.05})
        `;
      }
      
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
            const translateX = -Math.cos(angle) * repulsion * 40;
            const translateY = -Math.sin(angle) * repulsion * 40;
            
            (particle as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px) scale(${1 + repulsion})`;
            (particle as HTMLElement).style.opacity = (0.4 + repulsion * 0.8).toString();
            (particle as HTMLElement).style.filter = `hue-rotate(${repulsion * 180}deg)`;
          } else {
            (particle as HTMLElement).style.transform = 'translate(0, 0)';
            (particle as HTMLElement).style.opacity = '0.4';
            (particle as HTMLElement).style.filter = 'hue-rotate(0deg)';
          }
        });
      }
    };
    
    const generateBuzzwords = () => {
      const newBuzzwords = [];
      const words = ['VC', 'Pivot', 'Scale', 'MVP', 'SaaS', 'YC', 'Hustle', 'Exit', 'PMF', 'CAC', 'LTV', 'Unicorn', 'Runway'];
      
      for (let i = 0; i < 10; i++) {
        newBuzzwords.push({
          id: i,
          text: words[Math.floor(Math.random() * words.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          scale: 0.5 + Math.random() * 1.5,
          life: 100,
          maxLife: 100 + Math.random() * 300
        });
      }
      
      setBuzzwords(newBuzzwords);
    };
    
    generateBuzzwords();
    
    const buzzwordInterval = setInterval(() => {
      setBuzzwords(prev => {
        return prev.map(word => {
          const newLife = word.life - 1;
          if (newLife <= 0) {
            const words = ['VC', 'Pivot', 'Scale', 'MVP', 'SaaS', 'YC', 'Hustle', 'Exit', 'PMF', 'CAC', 'LTV', 'Unicorn', 'Runway'];
            return {
              ...word,
              text: words[Math.floor(Math.random() * words.length)],
              x: Math.random() * 100,
              y: Math.random() * 100,
              scale: 0.5 + Math.random() * 1.5,
              life: word.maxLife,
            };
          }
          
          return {
            ...word,
            x: word.x + (Math.random() * 0.6 - 0.3), 
            y: word.y + (Math.random() * 0.4 - 0.1),
            life: newLife
          };
        });
      });
    }, 50);
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(buzzwordInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const scrollPercentage = (scrollTop / (docHeight - windowHeight)) * 100;
      setUnicornProgress(Math.min(scrollPercentage * 1.5, 100));
      
      const progress = Math.min(scrollTop / windowHeight, 1);
      setScrollProgress(progress);
      
      setMorphState(Math.floor(progress * 3) % 3);
      
      if (sceneRef.current) {
        const hue1 = 180 - progress * 60;
        const hue2 = 300 + progress * 60;
        sceneRef.current.style.background = `linear-gradient(45deg, 
          hsl(${hue1}, 100%, 50%, 0.1), 
          hsl(${hue2}, 100%, 70%, 0.2))`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const triggerRetroMode = () => {
    playGlitchSound();
    setShowRetro(true);
    document.body.classList.add('retro-mode');
    
    setTimeout(() => {
      setShowRetro(false);
      document.body.classList.remove('retro-mode');
    }, 10000);
  };
  
  useEffect(() => {
    if (!particlesRef.current) return;
    
    while (particlesRef.current.firstChild) {
      particlesRef.current.removeChild(particlesRef.current.firstChild);
    }
    
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'grid-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.backgroundColor = `hsla(${Math.random() * 60 + 180}, 100%, 70%, 0.4)`;
      particlesRef.current.appendChild(particle);
    }
  }, []);
  
  useEffect(() => {
    if (clickCount >= 5) {
      setShowEasterEgg(true);
      playGlitchSound();
      
      const timer = setTimeout(() => {
        setShowEasterEgg(false);
        setClickCount(0);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [clickCount]);
  
  useEffect(() => {
    const createAudioContext = () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();
        
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
        
        const buttons = document.querySelectorAll('.hero-cta-button');
        buttons.forEach(button => createHoverSound(button as HTMLElement));
        
        if (orbRef.current) {
          createHoverSound(orbRef.current);
        }
      } catch (e) {
        console.log('Audio context not supported or user interaction required');
      }
    };
    
    const initialUserInteraction = () => {
      createAudioContext();
      document.removeEventListener('click', initialUserInteraction);
    };
    
    document.addEventListener('click', initialUserInteraction);
    
    return () => {
      document.removeEventListener('click', initialUserInteraction);
    };
  }, []);
  
  const playGlitchSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator1.type = 'sawtooth';
      oscillator1.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator1.frequency.linearRampToValueAtTime(880, audioContext.currentTime + 0.1);
      
      oscillator2.type = 'square';
      oscillator2.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator2.frequency.linearRampToValueAtTime(110, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.3);
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator1.start();
      oscillator2.start();
      oscillator1.stop(audioContext.currentTime + 0.3);
      oscillator2.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Audio context not supported or user interaction required');
    }
  };
  
  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    playClickSound();
  };
  
  const playClickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800 - clickCount * 50, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      console.log('Audio context not supported or user interaction required');
    }
  };
  
  const playHoverSound = () => {
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
  
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
      playHoverSound();
    }
  };

  const handleAvatarHover = () => {
    setIsRoastMode(prev => !prev);
    playGlitchSound();
  };

  const triggerConfetti = () => {
    playHoverSound();
  };

  return (
    <section 
      ref={sceneRef}
      className={cn(
        "relative min-h-screen pt-32 pb-16 overflow-hidden flex flex-col justify-center items-center",
        showRetro ? "retro-geocities" : ""
      )}
      style={{ 
        transition: 'background 0.5s ease-out',
        transform: `perspective(1000px) rotateX(${scrollProgress * 3}deg)`
      }}
    >
      <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-black/20">
        <div 
          className="h-full bg-gradient-to-r from-[#FF00FF] via-[#00FFDD] to-[#FF00FF] bg-size-200 animate-pulse"
          style={{ width: `${unicornProgress}%`, transition: 'width 0.3s ease-out' }}
        ></div>
        <div className="absolute right-4 -bottom-6 text-xs font-mono bg-black/70 text-[#00FFDD] px-2 py-1 rounded-lg">
          Leveling Up Your Hustle: {Math.floor(unicornProgress)}% to Unicorn Status <Flame className="inline-block h-3 w-3 text-orange-500" />
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {buzzwords.map((word) => (
          <div 
            key={word.id}
            className={`absolute font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] to-[#00FFDD] mix-blend-screen pointer-events-auto cursor-pointer transition-all`}
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              transform: `scale(${word.scale}) rotate(${(word.id * 10) % 360}deg)`,
              fontSize: `${1 + word.scale}rem`,
              opacity: word.life / word.maxLife,
              textShadow: '0 0 15px rgba(0, 255, 221, 0.8)'
            }}
            onClick={() => {
              setBuzzwords(prev => 
                prev.map(b => b.id === word.id ? {...b, life: 0} : b)
              );
              playGlitchSound();
            }}
          >
            {word.text}
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#00FFDD]/10 to-transparent" />
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#FF00FF]/10 blur-3xl transform transition-transform"
          style={{ 
            transform: `translate3d(-50%, -50%, 0) scale(${1 + scrollProgress * 0.2})`,
            opacity: 1 - scrollProgress * 0.8,
            filter: `hue-rotate(${scrollProgress * 360}deg)`
          }} 
        />
        
        <div className="absolute inset-0 z-0 overflow-hidden glitch-background pointer-events-none"></div>
      </div>
      
      {showRetro && (
        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden geocities-background">
          <div className="absolute top-5 left-5 animate-bounce h-20 w-20">
            <img src="https://web.archive.org/web/20091026220832/http://www.geocities.com/Area51/Cavern/2686/dancing_baby.gif" alt="Dancing baby" />
          </div>
          <div className="absolute top-5 right-5 animate-float h-20 w-20">
            <img src="https://web.archive.org/web/20091026220832/http://www.geocities.com/Area51/Cavern/2686/flamingline.gif" alt="Flaming line" />
          </div>
          <div className="absolute bottom-5 left-5 h-20 w-20">
            <img src="https://web.archive.org/web/20091026220832/http://www.geocities.com/Area51/Cavern/2686/construction.gif" alt="Under construction" />
          </div>
          <div className="absolute bottom-5 right-5 animate-pulse h-20 w-20">
            <img src="https://web.archive.org/web/20091026220832/http://www.geocities.com/Area51/Cavern/2686/noframes.gif" alt="No frames" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 bg-yellow-300 border-4 border-black rotate-3 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold text-blue-700 mb-3 blink"><marquee>WELCOME TO MY STARTUP!!!</marquee></h2>
              <p className="text-red-600 font-comic">This page is best viewed in NETSCAPE NAVIGATOR at 800x600 resolution!!</p>
              <div className="mt-4">
                <img src="https://web.archive.org/web/20091027120212/http://www.geocities.com/Area51/Corridor/8611/ie.gif" alt="Netscape" className="inline-block h-10" />
              </div>
              <div className="mt-4 visitor-counter p-2 bg-black text-green-400 font-mono">
                Visitors: 0000001337
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left transform -rotate-3 glass-card p-6 rounded-lg backdrop-blur-md border-2 border-[#00FFDD]/50 shadow-xl shadow-[#FF00FF]/20"> 
          <div
            ref={logoRef}
            onClick={handleLogoClick}
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full bg-[#00FFDD]/20 text-[#00FFDD] mb-2 text-sm font-medium cursor-pointer transition-all",
              showEasterEgg ? "crt-effect glitch-hard" : "hover:glitch"
            )}
          >
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-[#FF00FF]"></span>
            <span className="relative font-mono">
              <GitPullRequest className="h-4 w-4 inline mr-1" />
              Insirra Forge 
              <span className="ml-1 font-bold text-[#FF00FF]">v4.20.69</span>
              <span className="absolute top-0 left-0 w-full h-full glitch-overlay opacity-0 group-hover:opacity-100"></span>
            </span>
          </div>
          
          <div className="overflow-hidden">
            <AnimatedText 
              text="Your AI-Powered Startup Ecosystem"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight lg:leading-tight glitch-text transform -skew-x-2 font-vhs"
              animation="glitch"
              glowColor="rgba(0, 255, 221, 0.7)"
            />
          </div>
          
          <AnimatedText
            text="Get AI-driven insights, strategic tools, and networking opportunities. Guiding startups through every stage of growth."
            className="text-lg text-[#00FFDD] max-w-xl lg:mx-0 mx-auto transform -skew-x-2 font-glitch"
            animation="typewriter"
            typewriterSpeed={20}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 mx-auto lg:mx-0 max-w-md sm:max-w-none">
            <a 
              href="#cta" 
              className="hero-cta-button bg-gradient-to-r from-[#FF00FF] to-[#00FFDD] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-[#FF00FF]/20 relative overflow-hidden group"
              onMouseEnter={() => { setHoverButton('join'); playHoverSound(); }}
              onMouseLeave={() => setHoverButton('')}
              onClick={triggerConfetti}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="font-extrabold">{hoverButton === 'join' ? "Let's Go Viral" : "Join Insirra Forge"}</span>
                {hoverButton === 'join' && <Star className="h-4 w-4 animate-spin" />}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00FFDD] via-[#FF00FF] to-[#00FFDD] bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
              
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {hoverButton === 'join' && Array.from({length: 10}).map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `emoji-burst ${0.5 + Math.random()}s ease-out forwards`,
                      animationDelay: `${Math.random() * 0.3}s`
                    }}
                  >
                    {['🚀', '🔥', '💯', '🤖', '📈', '💸', '🦄', '🧠'][Math.floor(Math.random() * 8)]}
                  </div>
                ))}
              </div>
            </a>
            
            <button 
              onClick={scrollToFeatures}
              className="hero-cta-button flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#222222] border border-[#00FFDD]/50 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group"
              onMouseEnter={() => { setHoverButton('explore'); playHoverSound(); }}
              onMouseLeave={() => setHoverButton('')}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="font-extrabold">Explore Features</span>
                {hoverButton === 'explore' ? 
                  <Sparkles className="h-4 w-4 text-[#00FFDD] animate-pulse" /> : 
                  <ChevronDown className="h-4 w-4" />
                }
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#222222] to-[#111111] bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 relative perspective preserve-3d">
          <div 
            ref={orbRef}
            className={cn(
              "absolute top-0 left-0 w-32 h-32 rounded-full backdrop-blur-xl transition-all duration-500 floating-orb z-20",
              morphState === 0 ? "bg-gradient-to-br from-[#00FFDD]/30 to-[#FF00FF]/20 rounded-full" :
              morphState === 1 ? "bg-gradient-to-br from-[#00FFDD]/30 to-[#FF00FF]/20 rounded-xl" :
              "bg-gradient-to-br from-[#00FFDD]/30 to-[#FF00FF]/20 polygon-morph"
            )}
            style={{ 
              boxShadow: '0 0 30px 10px rgba(0, 255, 221, 0.2), 0 0 100px 20px rgba(255, 0, 255, 0.1)',
              transition: 'transform 0.1s ease-out, box-shadow 0.3s ease-out, border-radius 0.5s ease'
            }}
            onMouseEnter={handleAvatarHover}
          >
            <div className="absolute inset-2 bg-gradient-to-br from-[#00FFDD]/10 to-[#FF00FF]/10 rounded-full border border-white/20 pulse-slow"></div>
            <div className="absolute inset-0 orb-particles"></div>
            
            {isRoastMode ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[#FF00FF] font-bold text-lg">
                  {morphState === 0 ? <Bot className="w-8 h-8 animate-pulse" /> : 
                   morphState === 1 ? <Cpu className="w-8 h-8 animate-pulse" /> : 
                   <Bomb className="w-8 h-8 animate-pulse" />}
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white font-bold text-lg eye-follow">
                  👁️
                </div>
              </div>
            )}
            
            {Array.from({length: 3}).map((_, i) => (
              <div 
                key={i}
                className="absolute text-xs font-mono text-white/80 bg-black/40 px-2 py-1 rounded-full transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm"
              >
                {['🚀', '🔥', '💯', '🤖', '📈', '💸', '🦄', '🧠'][Math.floor(Math.random() * 8)]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
