
import React from 'react';
import { MessageSquare, BarChart, Compass } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import AnimatedText from './AnimatedText';

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
    <section id="features" className="section bg-secondary/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedText
            text="AI That Thinks Like a Startup Mentor"
            className="text-3xl md:text-4xl font-bold mb-4"
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
              <div className="h-full bg-background rounded-2xl p-6 border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 flex flex-col">
                <div className="rounded-xl bg-primary/10 p-3 w-fit mb-5">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground flex-grow">{feature.description}</p>
                
                <div className="mt-6 pt-4 border-t border-border/50">
                  <div className="flex items-center text-sm">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
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
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/20 inline-flex items-center"
          >
            Try Now – It's Free!
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
