
import React, { useState } from 'react';
import { MessageSquare, BarChart, Compass, Sparkles, Zap, Cpu } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import AnimatedText from './AnimatedText';

const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      secondaryIcon: <Sparkles className="h-6 w-6 text-[#FF00FF]" />,
      title: "Ask Anything",
      description: "Type your startup question, and our AI will respond instantly with tailored guidance.",
      delay: 0,
      glitchText: "HACK THE VC MATRIX",
      cyberTag: "NLP-CORE::v7.3.1"
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      secondaryIcon: <Zap className="h-6 w-6 text-[#00FFDD]" />,
      title: "Get Personalized Insights",
      description: "Receive AI-driven analysis customized to your specific business needs and industry context.",
      delay: 200,
      glitchText: "UNLOCK DATA STREAMS",
      cyberTag: "INSIGHT-ENGINE::v4.2.0"
    },
    {
      icon: <Compass className="h-10 w-10 text-primary" />,
      secondaryIcon: <Cpu className="h-6 w-6 text-[#FF00FF]" />,
      title: "Take Action with Confidence",
      description: "Get actionable recommendations backed by data and strategic frameworks.",
      delay: 400,
      glitchText: "EXECUTE PROFIT PROTOCOL",
      cyberTag: "ACTION-MATRIX::v2.0.9"
    }
  ];

  const playGlitchSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator1.type = 'sawtooth';
      oscillator1.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator1.frequency.linearRampToValueAtTime(880, audioContext.currentTime + 0.05);
      
      oscillator2.type = 'square';
      oscillator2.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator2.frequency.linearRampToValueAtTime(110, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator1.start();
      oscillator2.start();
      oscillator1.stop(audioContext.currentTime + 0.2);
      oscillator2.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log('Audio context not supported or user interaction required');
    }
  };

  const handleCardHover = (index: number) => {
    setHoveredIndex(index);
    if (!isGlitching) {
      setIsGlitching(true);
      playGlitchSound();
      setTimeout(() => setIsGlitching(false), 500);
    }
  };

  return (
    <section id="features" className="section bg-secondary/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        
        {/* Grid Background */}
        <div className="absolute inset-0 grid-background opacity-10"></div>
        
        {/* Holographic scan line */}
        <div className="absolute inset-0 pointer-events-none holographic-scan opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs font-mono bg-black/50 text-[#00FFDD] px-3 py-1 rounded-full border border-[#00FFDD]/30">
            sys::startup_mentor.ai
          </div>
          
          <AnimatedText
            text="AI That Thinks Like a Startup Mentor"
            className="text-3xl md:text-4xl font-['Barlow'] font-black uppercase tracking-tight mb-4"
            animation="glitch"
            glowColor="rgba(0, 255, 221, 0.5)"
          />
          
          <div className={`relative ${isGlitching ? 'glitch-text' : ''}`}>
            <AnimatedText
              text="Our advanced AI combines the wisdom of successful founders, investors, and industry experts to provide you with guidance that's both technically sound and strategically insightful."
              className="text-lg text-muted-foreground"
              delay={200}
              staggerChildren={true}
            />
            
            <div className="absolute -right-10 top-0 transform rotate-12 bg-[#FF00FF]/10 text-[#FF00FF] text-xs px-2 py-0.5 rounded-md border border-[#FF00FF]/30 font-mono">
              neural-path::activated
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12 relative">
          {/* Connecting lines between cards for cyberpunk feel */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <line x1="33%" y1="15%" x2="66%" y2="15%" stroke="rgba(0, 255, 221, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="66%" y1="15%" x2="85%" y2="50%" stroke="rgba(0, 255, 221, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="33%" y1="15%" x2="15%" y2="50%" stroke="rgba(0, 255, 221, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="15%" y1="50%" x2="33%" y2="85%" stroke="rgba(255, 0, 255, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="85%" y1="50%" x2="66%" y2="85%" stroke="rgba(255, 0, 255, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="33%" y1="85%" x2="66%" y2="85%" stroke="rgba(255, 0, 255, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
          
          {features.map((feature, index) => (
            <AnimatedCard 
              key={index} 
              delay={feature.delay}
              className="z-10"
            >
              <div 
                className={`h-full bg-background rounded-2xl p-6 border transition-all duration-300 overflow-hidden relative group hover:shadow-lg
                  ${hoveredIndex === index 
                    ? 'border-primary shadow-primary/20 scale-105' 
                    : 'border-border/50 shadow-sm'}`}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Cyberpunk corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 rotate-45 text-center text-[10px] font-mono py-1 -translate-y-0 translate-x-8
                    ${hoveredIndex === index 
                      ? 'bg-primary text-white' 
                      : 'bg-primary/10 text-primary/70'}`}
                  >
                    {feature.cyberTag}
                  </div>
                </div>
                
                <div className="rounded-xl bg-primary/10 p-3 w-fit mb-5 relative overflow-hidden group-hover:bg-primary/20 transition-colors">
                  <div className="relative z-10">
                    {feature.icon}
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                    {feature.secondaryIcon}
                  </div>
                </div>
                
                <h3 className="text-xl font-['Barlow'] font-bold mb-3 group-hover:text-primary transition-colors relative">
                  {feature.title}
                  <span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300`}></span>
                </h3>
                
                <p className="text-muted-foreground flex-grow relative z-10">
                  {feature.description}
                </p>
                
                {/* Hidden glitch text that appears on hover */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none
                  ${hoveredIndex === index ? 'opacity-5' : 'opacity-0'} transition-opacity`}>
                  <div className="font-['Rubik_Glitch'] text-[#FF00FF] text-4xl tracking-wide transform -rotate-12">
                    {feature.glitchText}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border/50 group-hover:border-primary/20 transition-colors">
                  <div className="flex items-center text-sm">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 group-hover:animate-pulse"></span>
                    <span className="text-primary font-medium">Smart Response</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#cta" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/20 inline-flex items-center relative group overflow-hidden"
          >
            <span className="relative z-10 font-['Barlow'] tracking-tight">Try Now – It's Free!</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#00FFDD] via-[#FF00FF] to-[#00FFDD] bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
            
            {/* Particle burst on hover */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
              {Array.from({length: 5}).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-white"
                  style={{
                    left: `${50 + (Math.random() * 40 - 20)}%`,
                    top: `${50 + (Math.random() * 40 - 20)}%`,
                    animation: `emoji-burst ${0.5 + Math.random() * 0.5}s ease-out forwards`,
                    animationDelay: `${Math.random() * 0.2}s`
                  }}
                ></div>
              ))}
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
