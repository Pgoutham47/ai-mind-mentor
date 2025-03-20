
import React from 'react';
import { BrainCog, ArrowRight } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-screen opacity-10" 
          style={{
            background: 'radial-gradient(circle at 30% 20%, rgba(77, 171, 245, 0.2), transparent 40%), radial-gradient(circle at 70% 60%, rgba(114, 9, 183, 0.1), transparent 50%)'
          }} 
        />
      </div>
      
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-6 mb-12">
          {/* Brand Identity */}
          <div className="flex justify-center mb-8">
            <div className="bg-background/80 backdrop-blur-sm border border-border/30 rounded-full px-4 py-2 inline-flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <BrainCog className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground/80">Insirra GPT</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance max-w-3xl mx-auto">
            <AnimatedText 
              text="AI That Thinks Like a Startup Mentor" 
              animation="fade-in"
              delay={300}
            />
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            <AnimatedText 
              text="Our advanced AI combines the wisdom of successful founders, investors, and industry experts to provide you with guidance."
              animation="fade-in"
              delay={600}
            />
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button size="lg" className="px-8 font-medium transition-all">
              Try Now
            </Button>
            <Button variant="outline" size="lg" className="group px-8 font-medium transition-all">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        
        {/* Preview Card */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="overflow-hidden border border-border/40 bg-background/60 backdrop-blur-sm shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BrainCog className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Startup Mentor AI</h3>
                  <p className="text-sm text-muted-foreground">Intelligent guidance for founders</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-6">
                <div className="p-3 rounded-lg bg-muted/50 text-sm">
                  <span className="text-muted-foreground">How do I validate my startup idea?</span>
                </div>
                
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 text-sm">
                  <p className="text-foreground">
                    Based on market research, your concept shows promise. Focus on validating with potential customers through interviews and a minimum viable product.
                  </p>
                </div>
                
                <div className="text-xs text-muted-foreground text-center mt-2">
                  Try asking your own questions
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <div className="text-sm text-muted-foreground flex flex-col items-center gap-2 animate-pulse">
            <span>Scroll to explore</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="2" />
              <circle cx="8" cy="8" r="3" fill="currentColor" className="animate-bounce">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 0 6; 0 0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
