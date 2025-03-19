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
