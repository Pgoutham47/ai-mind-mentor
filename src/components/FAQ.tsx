
import React, { useState, useEffect, useRef } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedText from './AnimatedText';
import { Shield, Flame, ZapOff, BadgeCheck, Cpu, AlertTriangle, X, Check } from 'lucide-react';

const FAQ = () => {
  const [activeRoast, setActiveRoast] = useState<number | null>(null);
  const [counterAttack, setCounterAttack] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "How accurate is Insirra GPT?",
      hateComment: "AI can't replace real mentors 💀",
      answer: "Insirra GPT is built using advanced AI trained on vast datasets of startup knowledge, including insights from successful founders, investors, and industry experts. While it provides high-quality guidance, we recommend using it as a powerful starting point that complements (not replaces) traditional research and mentorship.",
      clapback: "While human mentors sleep, I'm analyzing 50,000+ successful exits. Who's irreplaceable now? 🧠💅",
      icon: <Cpu className="h-5 w-5 text-[#FF00FF]" />,
      statistic: "93% accuracy on startup trend predictions vs 62% for human VCs",
      emojiArray: ['🤖', '📈', '🚀', '💯']
    },
    {
      question: "Is it free to use?",
      hateComment: "Prob just another cash grab subscription 🙄",
      answer: "Yes! We offer a generous free tier that gives you access to most of Insirra GPT's capabilities. For users with more advanced needs, we offer premium plans with additional features like investor-ready report generation, custom data integration, and higher usage limits.",
      clapback: "Imagine calling 'free' a cash grab. Let me analyze your business model next... oh wait 💸",
      icon: <Flame className="h-5 w-5 text-[#00FFDD]" />,
      statistic: "Free tier offers more features than 87% of paid competitors",
      emojiArray: ['🆓', '💰', '🤑', '👑']
    },
    {
      question: "Can it help with funding?",
      hateComment: "No AI can get you funded in this market lmao",
      answer: "Absolutely. Insirra GPT can help you create compelling pitch decks, financial projections, and investor-ready business plans. It can also analyze your business model to identify potential red flags investors might focus on, and suggest strategies to address them effectively.",
      clapback: "Our users raised $127M last quarter. What's your portfolio looking like? 🤔",
      icon: <BadgeCheck className="h-5 w-5 text-green-400" />,
      statistic: "Users are 3.4x more likely to secure seed funding after using Insirra",
      emojiArray: ['💸', '💼', '📊', '🏆']
    },
    {
      question: "How is my data protected?",
      hateComment: "Bet they're selling our startup ideas to VCs behind our backs 👀",
      answer: "We take data security very seriously. All communications with Insirra GPT are encrypted end-to-end, and we don't store your conversations permanently unless you explicitly save them. We never share your data with third parties, and our business model is based on providing valuable services to you, not monetizing your data.",
      clapback: "Our encryption is so strong even our own team can't see your ideas. Unlike your public GitHub repos... 👀",
      icon: <Shield className="h-5 w-5 text-blue-500" />,
      statistic: "Zero data breaches since launch, with SOC 2 and GDPR compliance",
      emojiArray: ['🔒', '🛡️', '🔐', '✅']
    },
    {
      question: "How does Insirra GPT stay updated with the latest startup trends?",
      hateComment: "AI always uses outdated data from like 2020 💤",
      answer: "Our AI system is regularly updated with the latest market data, venture capital trends, and startup methodologies. We also incorporate feedback from real founders and investors to continuously improve the quality and relevance of our guidance.",
      clapback: "We process 500,000+ startup news articles daily. Meanwhile, you're still using last year's pitch template 📉",
      icon: <ZapOff className="h-5 w-5 text-yellow-500" />,
      statistic: "Data freshness rated at 98.7%, compared to industry average of 70%",
      emojiArray: ['📰', '🔄', '📆', '🔮']
    },
    {
      question: "Can I use Insirra GPT for my specific industry or niche?",
      hateComment: "Generic advice doesn't work for deep tech startups fr fr",
      answer: "Yes! Insirra GPT has knowledge across a wide range of industries and can provide tailored advice for your specific sector. Simply mention your industry when asking questions, and the AI will contextualize its responses accordingly.",
      clapback: "We have industry-specific models for 124 sectors, including quantum computing. But sure, call us 'generic' 💅",
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      statistic: "89% of users report our advice is more specific than what they get from industry publications",
      emojiArray: ['🔬', '🏭', '🏗️', '🧪']
    }
  ];

  useEffect(() => {
    if (counterAttack) {
      const timer = setTimeout(() => {
        setCounterAttack(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [counterAttack]);

  // Simulated haptic feedback (vibration effect)
  useEffect(() => {
    if (isVibrating) {
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }
      
      if (accordionRef.current) {
        accordionRef.current.classList.add('animate-shake');
        setTimeout(() => {
          if (accordionRef.current) {
            accordionRef.current.classList.remove('animate-shake');
          }
          setIsVibrating(false);
        }, 500);
      }
    }
  }, [isVibrating]);

  const playClickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.linearRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log('Audio context not supported or user interaction required');
    }
  };

  const handleRoastClick = (index: number) => {
    playClickSound();
    setActiveRoast(index);
    setCounterAttack(true);
    setIsVibrating(true);
  };

  return (
    <section id="faq" className="section bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-300/10 blur-3xl" />
        
        {/* Animated grid lines for cyberpunk feel */}
        <div className="absolute inset-0 grid-background opacity-10"></div>
        
        {/* Holographic scan line effect */}
        <div className="absolute inset-0 pointer-events-none scanning-line opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <AnimatedText
            text="Frequently Asked Questions"
            className="text-3xl md:text-4xl font-bold mb-2 font-['Barlow'] uppercase tracking-tight"
            animation="glitch"
            glowColor="rgba(255, 0, 255, 0.5)"
          />
          
          <div className="relative">
            <AnimatedText
              text="Or should we say... Frequently Avoided Questions 😏"
              className="text-lg text-muted-foreground font-['Comic_Neue'] italic"
              delay={200}
              animation="slide-up"
            />
            <div className="absolute -right-10 top-0 transform rotate-12 bg-[#FF00FF]/10 text-[#FF00FF] text-xs px-2 py-0.5 rounded-md border border-[#FF00FF]/30 font-mono">
              100% real
            </div>
          </div>
        </div>
        
        <div className="relative max-w-3xl mx-auto" ref={accordionRef}>
          {counterAttack && activeRoast !== null && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20 flex items-center justify-center rounded-xl overflow-hidden">
              <div className="w-full max-w-lg bg-[#111111] border-2 border-[#00FFDD] p-6 rounded-xl relative overflow-hidden shadow-[0_0_15px_rgba(0,255,221,0.5)]">
                <div className="absolute top-2 right-2">
                  <button 
                    className="p-1 rounded-full bg-[#222222] hover:bg-[#333333] transition-colors"
                    onClick={() => setCounterAttack(false)}
                  >
                    <X className="h-5 w-5 text-[#00FFDD]" />
                  </button>
                </div>
                
                <div className="mb-3 flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm font-mono">AI_CLAPBACK.exe</span>
                </div>
                
                <div className="font-['Permanent_Marker'] text-2xl mb-4 text-white">
                  {faqs[activeRoast].clapback}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-black/30 border border-[#FF00FF]/20 rounded-lg p-3">
                    <div className="text-[#FF00FF] text-xs font-mono mb-1">CRITICAL HIT</div>
                    <div className="text-2xl font-bold font-['Barlow']">
                      {faqs[activeRoast].statistic}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2">
                    {faqs[activeRoast].emojiArray.map((emoji, i) => (
                      <div 
                        key={i} 
                        className="text-2xl animate-bounce" 
                        style={{ animationDelay: `${i * 0.15}s` }}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b border-[#00FFDD]/20 hover:border-[#00FFDD]/50 group transition-colors"
              >
                <AccordionTrigger className="text-left font-medium py-4 hover:no-underline data-[state=open]:text-[#00FFDD] transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-full bg-[#111111] border border-[#00FFDD]/20 group-hover:border-[#00FFDD]/50 transition-colors">
                      {faq.icon}
                    </div>
                    <span className="font-['Barlow'] tracking-tight">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent>
                  <div className="pb-4 space-y-4">
                    {/* Twitter/X-style hate comment */}
                    <div 
                      className="bg-[#111111] border border-[#222222] rounded-xl p-4 transition-all hover:scale-105 cursor-pointer group relative overflow-hidden"
                      onClick={() => handleRoastClick(index)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm border border-[#333333]">
                          🤡
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold text-white">Anon_Hater69</span>
                              <span className="text-[#555555] ml-1">@startup_skeptic</span>
                            </div>
                            <div className="text-[#555555] text-sm">Just now</div>
                          </div>
                          <div className="mt-1 text-white font-medium">
                            {faq.hateComment}
                          </div>
                          <div className="mt-3 flex items-center gap-4 text-[#555555] text-sm">
                            <div className="flex items-center gap-1 group-hover:text-red-500 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                              <span>0</span>
                            </div>
                            <div className="flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-repeat"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
                              <span>0</span>
                            </div>
                            <div className="flex items-center gap-1 group-hover:text-[#00FFDD] transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                              <span>1</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00FFDD]/0 via-[#00FFDD]/5 to-[#00FFDD]/0 translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
                    </div>
                    
                    {/* Actual answer */}
                    <div className="text-muted-foreground ml-4 border-l-2 border-[#FF00FF]/20 pl-4 relative group">
                      <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#FF00FF]/50 via-[#00FFDD]/50 to-[#FF00FF]/50 transform -translate-x-[1px]"></div>
                      <p>{faq.answer}</p>
                      <div className="mt-2 text-xs font-mono text-[#00FFDD]/70 flex items-center gap-2">
                        <span className="font-bold">DEPTH LEVEL:</span> 
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div 
                              key={level} 
                              className={`h-3 w-6 ${level <= 3 ? 'bg-[#00FFDD]/70' : 'bg-[#222222]'} ${level > 1 ? 'ml-0.5' : ''}`}
                            ></div>
                          ))}
                        </div>
                        <button className="ml-2 text-[#FF00FF] hover:underline">Go deeper</button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#cta" 
            className="bg-gradient-to-r from-[#FF00FF] to-[#00FFDD] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-[#FF00FF]/20 inline-flex items-center gap-2 group relative overflow-hidden"
          >
            <span className="relative z-10">Try AI Mentorship Now</span>
            <span className="relative z-10 w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#FF00FF] text-xs">🔥</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#00FFDD] via-[#FF00FF] to-[#00FFDD] bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
