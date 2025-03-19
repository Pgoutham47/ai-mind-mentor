
import React, { useState, useEffect } from 'react';
import { Rocket, Briefcase, LineChart, GraduationCap, CheckCircle, ArrowRight, Bot as BotIcon } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import AnimatedText from './AnimatedText';
import { cn } from '@/lib/utils';

const Audience = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  
  const audiences = [
    {
      icon: <Rocket className="h-12 w-12 text-primary" />,
      title: "Aspiring Entrepreneurs",
      description: "Validate your idea, understand market fit, and launch faster with AI-guided strategies.",
      benefits: [
        "Idea validation framework",
        "Market size calculator",
        "Competitor analysis tools",
        "Business model templates"
      ],
      color: "from-orange-500/20 to-red-500/20",
      delay: 0
    },
    {
      icon: <Briefcase className="h-12 w-12 text-primary" />,
      title: "Startup Founders",
      description: "Scale smarter with AI-powered insights on growth, funding, and operational efficiency.",
      benefits: [
        "Growth strategy modeling",
        "Fundraising pitch guides",
        "Unit economics calculator",
        "Team scaling playbooks"
      ],
      color: "from-blue-500/20 to-indigo-500/20",
      delay: 200
    },
    {
      icon: <LineChart className="h-12 w-12 text-primary" />,
      title: "Investors & Mentors",
      description: "Discover promising startups and stay on top of emerging market trends and opportunities.",
      benefits: [
        "Deal flow analysis",
        "Due diligence templates",
        "Market trend reports",
        "Portfolio optimization"
      ],
      color: "from-emerald-500/20 to-green-500/20",
      delay: 400
    },
    {
      icon: <GraduationCap className="h-12 w-12 text-primary" />,
      title: "Students & Researchers",
      description: "Learn business strategies and entrepreneurship concepts through AI-driven models and examples.",
      benefits: [
        "Case study generator",
        "Startup simulation tools",
        "Research paper summarizer",
        "Business concept explainers"
      ],
      color: "from-purple-500/20 to-violet-500/20",
      delay: 600
    }
  ];

  // Trigger animations when component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowAnimation(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('audience');
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
    <section id="audience" className="section py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute left-1/4 top-1/4 w-72 h-72 rounded-full bg-blue-300/5 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Moving particles */}
        <div className="absolute inset-0 overflow-hidden">
          {showAnimation && Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/20"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-y ${Math.random() * 10 + 20}s linear infinite, float-x ${Math.random() * 15 + 15}s ease-in-out infinite alternate`,
                opacity: Math.random() * 0.5
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary/90 text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Perfect For You</span>
          </div>
          
          <AnimatedText
            text="For Every Founder & Innovator"
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            animation="fade-in"
            glowColor="rgba(59, 130, 246, 0.5)"
          />
          
          <AnimatedText
            text="Whether you're just starting out or looking to scale, Insirra GPT adapts to your specific needs and context."
            className="text-lg text-muted-foreground mx-auto"
            delay={200}
            animation="fade-in"
          />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {audiences.map((audience, index) => (
            <AnimatedCard 
              key={index} 
              delay={audience.delay}
              animation="fade-in"
            >
              <div 
                className={cn(
                  "h-full bg-card/50 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 overflow-hidden relative group border",
                  activeIndex === index ? 
                    "border-primary/40 shadow-lg scale-[1.03] z-10" : 
                    "border-border/60 shadow-md hover:shadow-lg hover:border-primary/20"
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Animated background gradient */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 -z-10",
                    audience.color,
                    activeIndex === index ? "opacity-100" : "opacity-0" 
                  )}
                />
                
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
                  <div 
                    className={cn(
                      "absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary/0 rounded-tr-xl transition-all duration-300",
                      activeIndex === index ? "border-primary/30 w-14 h-14" : "border-primary/0"
                    )}
                  />
                </div>
                
                <div 
                  className={cn(
                    "rounded-xl bg-primary/10 p-3 w-fit mb-5 transition-all duration-300 relative overflow-hidden group-hover:bg-primary/15",
                    activeIndex === index ? "scale-110" : "scale-100"
                  )}
                >
                  <div className="relative z-10">
                    {audience.icon}
                  </div>
                  
                  {/* Ripple effect on hover */}
                  {activeIndex === index && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 animate-ping-slow rounded-xl bg-primary/10"></div>
                    </div>
                  )}
                </div>
                
                <h3 className={cn(
                  "text-xl font-bold mb-3 transition-all duration-300",
                  activeIndex === index ? "text-primary text-2xl" : "text-foreground"
                )}>
                  {audience.title}
                </h3>
                
                <p className="text-muted-foreground mb-5 transition-all duration-300 group-hover:text-foreground">
                  {audience.description}
                </p>
                
                {/* Feature list that appears on hover */}
                <div 
                  className={cn(
                    "space-y-2 transition-all duration-300",
                    activeIndex === index ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
                  )}
                >
                  {audience.benefits.map((benefit, i) => (
                    <div 
                      key={i} 
                      className="flex items-center text-sm"
                      style={{ 
                        transitionDelay: `${i * 50}ms`,
                        animation: activeIndex === index ? `fade-in-right 0.3s ease-out forwards ${i * 0.1}s` : 'none'
                      }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                
                {/* Focus outline on card */}
                <div 
                  className={cn(
                    "absolute inset-0 rounded-2xl pointer-events-none border-2 border-primary/0 transition-all duration-300",
                    activeIndex === index ? "border-primary/30 shadow-glow" : "border-primary/0"
                  )}
                />
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        {/* Use Case Example with enhanced styling */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-xl"></div>
            
            {/* Card content */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/60 shadow-lg relative overflow-hidden">
              {/* Card background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 -z-10"></div>
              
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-primary/10 p-2 rounded-full mr-3">
                  <Rocket className="h-5 w-5 text-primary" />
                </span>
                Real User Experience
              </h3>
              
              <div className="rounded-xl bg-background/70 p-6 mb-8 shadow-sm border border-border/40">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-full md:w-auto md:flex-shrink-0">
                    <div className="rounded-full bg-primary/10 p-3 w-fit">
                      <Rocket className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="font-medium text-lg mb-2">Startup Founder Question:</p>
                    <p className="text-muted-foreground mb-5 text-lg italic">
                      "How can I create a compelling pitch deck for my B2B SaaS product that will attract Series A investors?"
                    </p>
                    
                    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-inner">
                      <div className="flex items-center mb-4">
                        <div className="rounded-full bg-gradient-to-r from-primary/20 to-blue-600/20 p-2 mr-3">
                          <BotIcon className="h-5 w-5 text-primary" />
                        </div>
                        <p className="font-medium text-lg">Insirra GPT Response:</p>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        For a Series A pitch deck for your B2B SaaS product, focus on these key elements:
                      </p>
                      
                      <ol className="space-y-3 mb-4 text-muted-foreground">
                        {[
                          {
                            title: "Traction metrics",
                            desc: "Show MRR growth, CAC, LTV, and retention rates"
                          },
                          {
                            title: "Market opportunity",
                            desc: "Demonstrate TAM/SAM/SOM analysis with clear data points"
                          },
                          {
                            title: "Go-to-market strategy",
                            desc: "Detail your customer acquisition channels and sales process"
                          },
                          {
                            title: "Competitive landscape",
                            desc: "Position your unique advantage in the market"
                          },
                          {
                            title: "Financial projections",
                            desc: "Show 18-36 month projections with clear use of funds"
                          }
                        ].map((item, i) => (
                          <li key={i} className="pl-6 relative">
                            <div className="absolute left-0 top-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-primary/20">
                              <span className="text-xs font-bold">{i+1}</span>
                            </div>
                            <span className="font-medium text-foreground">{item.title}</span>
                            <span> — {item.desc}</span>
                          </li>
                        ))}
                      </ol>
                      
                      <p className="text-muted-foreground text-base border-t border-border/40 pt-4 mt-4">
                        Series A investors look for evidence of product-market fit and a clear path to scaling revenue. 
                        I recommend creating a 12-15 slide deck with a strong narrative that connects your product 
                        to the market opportunity and shows how additional capital will accelerate growth.
                      </p>
                      
                      {/* AI confidence indicator */}
                      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                        <span>AI Confidence:</span>
                        <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-[95%] bg-primary rounded-full"></div>
                        </div>
                        <span className="text-primary font-medium">95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <a 
                  href="#cta" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/20 inline-flex items-center group"
                >
                  <span>Try It Now – No Signup Required</span>
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      
      <style>
        {`
        @keyframes float-y {
          0% { transform: translateY(0); }
          50% { transform: translateY(-100vh); }
          100% { transform: translateY(-200vh); }
        }
        
        @keyframes float-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(50px); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          70%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .shadow-glow {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        `}
      </style>
    </section>
  );
};

export default Audience;
