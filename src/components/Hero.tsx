
import React, { useEffect, useRef } from 'react';
import { MessageSquare, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';

const Hero: React.FC = () => {
  const chatBubbleRef = useRef<HTMLDivElement>(null);
  
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
  
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-16 overflow-hidden flex flex-col justify-center items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-300/10 dark:bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-sky-300/10 dark:bg-sky-400/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary mb-2 text-sm font-medium">
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></span>
            AI-Powered Startup Guidance
          </div>
          
          <AnimatedText 
            text="Your AI-Powered Startup Mentor"
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight lg:leading-tight"
          />
          
          <AnimatedText
            text="Get instant guidance, investment insights, and tailored strategies in seconds. Like having a world-class startup advisor available 24/7."
            className="text-lg text-muted-foreground max-w-xl lg:mx-0 mx-auto"
            delay={300}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 mx-auto lg:mx-0 max-w-md sm:max-w-none">
            <a 
              href="#cta" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/20"
            >
              Try Insirra GPT Now
            </a>
            <button 
              onClick={scrollToFeatures}
              className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              See How It Works
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Hero Image & Chat Bubble */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative mx-auto max-w-md perspective preserve-3d">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 hover:rotate-y-3 hover:rotate-x-3">
              <img 
                src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Founder with AI" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Chat Bubble */}
            <div 
              ref={chatBubbleRef}
              className="absolute -top-16 -right-8 max-w-xs p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg animate-float"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-4 w-4 text-white" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse-soft"></span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Insirra GPT</p>
                  <p className="text-sm chat-content">How do I validate my startup idea?</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-4 h-4 bg-gray-100 dark:bg-gray-800"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm mb-2 text-muted-foreground">Scroll to explore</span>
        <div className="w-[30px] h-[50px] rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce mt-1"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
