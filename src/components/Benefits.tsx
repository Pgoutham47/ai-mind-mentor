
import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, BarChart4, Sparkles, Zap, Rocket, Database } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import AnimatedText from './AnimatedText';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: "Insirra GPT helped me secure my first investment. It's like having a personal mentor available 24/7!",
    author: "Sarah Chen",
    position: "Founder, NexTech Solutions",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "The market insights and strategic advice I received saved me months of research and potentially costly mistakes.",
    author: "Michael Rodriguez",
    position: "CEO, Quantum Finance",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "As a first-time founder, Insirra GPT has been invaluable for answering my questions and guiding my decision-making.",
    author: "Jessica Wong",
    position: "Founder, EcoSolutions",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const Benefits = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [animateChart, setAnimateChart] = useState(false);
  
  const benefits = [
    {
      icon: <Brain className="h-12 w-12 text-primary" />,
      secondaryIcon: <Sparkles className="h-6 w-6 text-primary/80" />,
      title: "AI-Powered Insights",
      description: "Expert-level strategies at your fingertips, drawn from a vast knowledge base of startup success patterns.",
      delay: 0,
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      icon: <BarChart4 className="h-12 w-12 text-primary" />,
      secondaryIcon: <Database className="h-6 w-6 text-primary/80" />,
      title: "Investor-Ready Reports",
      description: "Generate professional funding roadmaps, business valuations, and pitch decks with a few simple prompts.",
      delay: 200,
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      secondaryIcon: <Zap className="h-6 w-6 text-primary/80" />,
      title: "Real-Time Market Trends",
      description: "Stay ahead with live startup intelligence and industry-specific insights for informed decision making.",
      delay: 400,
      color: "from-orange-500/20 to-amber-500/20"
    }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Trigger chart animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateChart(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('benefits');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="benefits" className="section py-24 bg-gradient-to-b from-background/95 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] bg-primary/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute left-0 bottom-0 h-[300px] w-[300px] bg-blue-500/5 rounded-full blur-3xl opacity-70" />
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid-background"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary/90 text-sm font-medium">
            <Rocket className="h-4 w-4 mr-2" />
            <span>Supercharged with AI</span>
          </div>
          
          <AnimatedText
            text="Why Founders Trust Insirra GPT"
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            animation="fade-in"
            glowColor="rgba(59, 130, 246, 0.5)"
          />
          
          <AnimatedText
            text="Our AI platform delivers startup founders the tools, insights, and guidance they need to navigate the complex journey of building a successful company."
            className="text-lg text-muted-foreground mx-auto"
            delay={200}
            animation="fade-in"
          />
          
          {/* Decorative elements */}
          <div className="absolute -right-10 top-0 transform rotate-12 text-xs rounded-md font-mono opacity-60">
            <span className="text-primary inline-block animate-pulse">
              <Zap className="h-5 w-5" />
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 mt-12">
          {benefits.map((benefit, index) => (
            <AnimatedCard 
              key={index} 
              delay={benefit.delay}
              animation="card-up"
            >
              <div 
                className={cn(
                  "h-full rounded-2xl p-8 border border-border transition-all duration-300 relative group overflow-hidden",
                  isHovered === index ? "shadow-xl scale-[1.02] border-primary/30" : "shadow-md hover:shadow-lg hover:border-primary/20"
                )}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Gradient background that animates on hover */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 -z-10",
                    benefit.color,
                    isHovered === index ? "opacity-100" : "opacity-0"
                  )}
                />
                
                {/* Icon with glow effect */}
                <div className="relative mb-6 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300">
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl group-hover:animate-pulse"></div>
                  <div className="relative">{benefit.icon}</div>
                  
                  {/* Secondary floating icon */}
                  <div 
                    className={cn(
                      "absolute -right-2 -bottom-2 w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border shadow-md transform transition-all duration-500",
                      isHovered === index ? "translate-x-0 translate-y-0 rotate-0 opacity-100" : "translate-x-4 translate-y-4 rotate-45 opacity-0"
                    )}
                  >
                    {benefit.secondaryIcon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 transition-all duration-300 group-hover:text-foreground">
                  {benefit.description}
                </p>
                
                {/* Interactive chart/visualization for each benefit */}
                <div className="mt-6 h-24 overflow-hidden rounded-lg border border-border/60 bg-muted/20 p-2 relative">
                  {index === 0 && (
                    <div className="flex items-center justify-center h-full">
                      <div className="grid grid-cols-5 gap-1 w-full h-16">
                        {Array.from({length: 10}).map((_, i) => (
                          <div 
                            key={i}
                            className="bg-primary/30 rounded-sm"
                            style={{
                              height: `${animateChart ? 20 + Math.random() * 60 : 5}%`,
                              transition: `height 1s ease-out ${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className="flex items-center justify-between h-full">
                      <div className="w-1/3 h-full flex items-center justify-center">
                        <div 
                          className="rounded-full relative"
                          style={{
                            width: animateChart ? '60px' : '10px',
                            height: animateChart ? '60px' : '10px',
                            background: 'conic-gradient(#3b82f6 70%, #dbeafe 0)',
                            transition: 'all 0.8s ease-out'
                          }}
                        >
                          <div className="absolute inset-[15%] bg-background rounded-full flex items-center justify-center text-xs font-bold">
                            70%
                          </div>
                        </div>
                      </div>
                      <div className="w-2/3 flex flex-col justify-center space-y-2 px-2">
                        {['Revenue', 'Users', 'Growth'].map((item, i) => (
                          <div key={i} className="flex items-center">
                            <div className="w-1/3 text-xs">{item}</div>
                            <div className="w-2/3 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary/70 rounded-full"
                                style={{
                                  width: animateChart ? `${(3-i) * 25 + 10}%` : '0%',
                                  transition: `width 1s ease-out ${i * 0.2}s`
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="h-full flex items-end">
                      <svg width="100%" height="100%" viewBox="0 0 300 80">
                        <path
                          d={`M0,80 ${Array.from({length: 30}).map((_, i) => {
                            const x = i * 10;
                            const y = animateChart ? 
                              40 + Math.sin(i * 0.5) * 15 + Math.cos(i * 0.3) * 10 + (i > 15 ? -20 : 0) : 
                              80;
                            return `L${x},${y}`;
                          }).join(' ')} L300,80 Z`}
                          fill="rgba(59, 130, 246, 0.1)"
                          stroke="rgba(59, 130, 246, 0.6)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          style={{ transition: 'all 1s ease-out' }}
                        />
                      </svg>
                    </div>
                  )}
                  
                  <div 
                    className={cn(
                      "absolute bottom-2 right-2 text-xs text-primary/60 font-mono opacity-0 transition-opacity",
                      isHovered === index ? "opacity-100" : "opacity-0"
                    )}
                  >
                    real-time data
                  </div>
                </div>
                
                {/* Indicator dot */}
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></div>
                    <span className="text-xs text-primary/70">Live</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="mt-32 max-w-4xl mx-auto">
          <h3 className="text-center text-2xl font-bold mb-12">What Founders Are Saying</h3>
          
          <div className="relative overflow-hidden">
            <div 
              className="transition-all duration-500 flex"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="min-w-full px-4"
                >
                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border relative overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent -z-10"></div>
                    
                    {/* Highlight corners */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/30 rounded-tl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/30 rounded-br-xl"></div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="w-full md:w-1/3 flex-shrink-0">
                        <div className="relative mx-auto md:ml-0 w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="mb-4 relative">
                          {/* Quote icon */}
                          <div className="absolute -top-6 -left-2 text-6xl text-primary/10 font-serif">"</div>
                          <p className="text-lg italic relative z-10 leading-relaxed">
                            {testimonial.quote}
                          </p>
                          <div className="absolute -bottom-6 -right-2 text-6xl text-primary/10 font-serif">"</div>
                        </div>
                        
                        <div className="mt-6 flex flex-col items-center md:items-start">
                          <p className="font-semibold text-lg">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation dots */}
            <div className="mt-8 flex items-center justify-center space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={cn(
                    "h-3 rounded-full transition-all duration-300",
                    index === activeTestimonial 
                      ? "w-8 bg-primary" 
                      : "w-3 bg-primary/30 hover:bg-primary/50"
                  )}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <a 
            href="#cta" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/20 inline-flex items-center gap-2"
          >
            <span>Start Your AI Mentorship Now</span>
            <Rocket className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
