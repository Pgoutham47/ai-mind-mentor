
import React from 'react';
import { MessageSquare, BarChart, Compass } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import AnimatedText from './AnimatedText';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

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

  return (
    <section id="features" className="section bg-secondary/50 dark:bg-secondary/20 relative overflow-hidden">
      {/* Adaptive Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedText
            text="AI That Thinks Like a Startup Mentor"
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 dark:from-primary-foreground dark:to-primary-foreground/90 text-transparent bg-clip-text"
          />
          <AnimatedText
            text="Our advanced AI combines the wisdom of successful founders, investors, and industry experts to provide you with guidance that's both technically sound and strategically insightful."
            className="text-lg text-muted-foreground"
            delay={200}
          />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <AnimatedCard key={index} delay={feature.delay}>
              <Card className="h-full bg-background dark:bg-card rounded-2xl border border-border/50 dark:border-border/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 dark:hover:border-primary/30 overflow-hidden group">
                <CardContent className="p-6 flex flex-col h-full relative">
                  {/* Accent border that animates from left to right on hover */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary/80 dark:from-primary to-primary/80 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  
                  <div className="rounded-xl bg-primary/10 dark:bg-primary/20 p-3 w-fit mb-5 transition-colors duration-300 group-hover:bg-primary/15 dark:group-hover:bg-primary/25">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground flex-grow">{feature.description}</p>
                  
                  <div className="mt-6 pt-4 border-t border-border/50 dark:border-border/30">
                    <div className="flex items-center text-sm">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                      <span className="text-primary font-medium">Smart Response</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#cta" 
            className={cn(
              "relative bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium",
              "transition-all duration-300 transform hover:scale-105 active:scale-95",
              "shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10",
              "inline-flex items-center overflow-hidden group"
            )}
          >
            <span className="relative z-10">Try Now – It's Free!</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
