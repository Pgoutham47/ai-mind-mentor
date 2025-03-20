
import React, { useRef, useState, useEffect } from 'react';
import { MessageSquare, BarChart, Compass, Sparkles } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import AnimatedText from './AnimatedText';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const HowItWorks = () => {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Ask Anything",
      description: "Type your startup question, and our AI will respond instantly with tailored guidance.",
      delay: 0
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Get Personalized Insights",
      description: "Receive AI-driven analysis customized to your specific business needs and industry context.",
      delay: 200
    },
    {
      icon: <Compass className="h-10 w-10 text-primary" />,
      title: "Take Action with Confidence",
      description: "Get actionable recommendations backed by data and strategic frameworks.",
      delay: 400
    }
  ];
  
  // Refs for each card for the tilt effect
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Handle tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 6; // Max 6deg rotation
    const rotateX = ((centerY - y) / centerY) * 6; // Max 6deg rotation
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  
  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };
  
  // Intersection Observer for scroll animations
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="section bg-secondary/30 dark:bg-secondary/10 relative overflow-hidden py-24"
    >
      {/* Adaptive Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-primary animate-pulse-soft" />
            <span className="text-sm font-medium text-primary">Insirra Forge Features</span>
          </div>
          
          <AnimatedText
            text="AI That Thinks Like a Startup Mentor"
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              "font-display",
              "bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/90",
              "text-transparent bg-clip-text"
            )}
          />
          
          <AnimatedText
            text="Our advanced AI combines the wisdom of successful founders, investors, and industry experts to provide you with guidance that's both technically sound and strategically insightful."
            className="text-lg text-muted-foreground"
            delay={200}
          />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className={cn(
                "transition-all duration-300",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${feature.delay}ms` }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <Card className={cn(
                "h-full bg-background/80 dark:bg-card/60",
                "backdrop-blur-md",
                "rounded-2xl",
                "border border-border/50 dark:border-border/30",
                "shadow-sm transition-all duration-300",
                "hover:shadow-md hover:border-primary/20 dark:hover:border-primary/30",
                "overflow-hidden group"
              )}>
                <CardContent className="p-8 flex flex-col h-full relative">
                  {/* Accent border that animates from left to right on hover */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary/80 dark:from-primary to-primary/80 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  
                  <div className="rounded-xl bg-primary/10 dark:bg-primary/20 p-3 w-fit mb-6 transition-colors duration-300 group-hover:bg-primary/15 dark:group-hover:bg-primary/25">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 font-display">{feature.title}</h3>
                  <p className="text-muted-foreground flex-grow">{feature.description}</p>
                  
                  <div className="mt-8 pt-4 border-t border-border/50 dark:border-border/30">
                    <div className="flex items-center text-sm">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                      <span className="text-primary font-medium">Smart Response</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button
            className={cn(
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              "px-8 py-6 rounded-full font-medium",
              "transition-all duration-300 transform hover:scale-[1.03] active:scale-95",
              "shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10",
              "inline-flex items-center h-auto overflow-hidden group"
            )}
          >
            <span className="relative z-10">Try Now – It's Free!</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
