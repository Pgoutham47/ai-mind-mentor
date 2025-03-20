
import React from 'react';
import { Rocket, Briefcase, LineChart, GraduationCap } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import AnimatedText from './AnimatedText';

const Audience = () => {
  const audiences = [
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: "Aspiring Entrepreneurs",
      description: "Validate your idea, understand market fit, and launch faster with AI-guided strategies.",
      delay: 0
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: "Startup Founders",
      description: "Scale smarter with AI-powered insights on growth, funding, and operational efficiency.",
      delay: 200
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Investors & Mentors",
      description: "Discover promising startups and stay on top of emerging market trends and opportunities.",
      delay: 400
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: "Students & Researchers",
      description: "Learn business strategies and entrepreneurship concepts through AI-driven models and examples.",
      delay: 600
    }
  ];

  return (
    <section id="audience" className="section bg-secondary/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-blue-300/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedText
            text="For Every Founder & Innovator"
            className="text-3xl md:text-4xl font-bold mb-4"
          />
          <AnimatedText
            text="Whether you're just starting out or looking to scale, Insirra GPT adapts to your specific needs and context."
            className="text-lg text-muted-foreground"
            delay={200}
          />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {audiences.map((audience, index) => (
            <AnimatedCard key={index} delay={audience.delay}>
              <div className="h-full bg-background rounded-2xl p-6 border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 flex flex-col">
                <div className="rounded-xl bg-primary/10 p-3 w-fit mb-5">
                  {audience.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{audience.title}</h3>
                <p className="text-muted-foreground">{audience.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        {/* Use Case Example */}
        <div className="mt-16 bg-background rounded-2xl p-8 border border-border/50 shadow-sm max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Real User Experience</h3>
          
          <div className="rounded-xl bg-secondary/70 p-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/20 p-2 mt-1">
                <Rocket className="h-5 w-5 text-primary" />
              </div>
              
              <div>
                <p className="font-medium mb-2">Startup Founder Question:</p>
                <p className="text-muted-foreground mb-4">
                  "How can I create a compelling pitch deck for my B2B SaaS product that will attract Series A investors?"
                </p>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-border/50">
                  <p className="font-medium mb-2">Insirra GPT Response:</p>
                  <p className="text-muted-foreground mb-3">
                    For a Series A pitch deck for your B2B SaaS product, focus on these key elements:
                  </p>
                  
                  <ol className="list-decimal list-inside space-y-2 mb-3 text-sm text-muted-foreground">
                    <li><span className="font-medium">Traction metrics</span> - Show MRR growth, CAC, LTV, and retention rates</li>
                    <li><span className="font-medium">Market opportunity</span> - Demonstrate TAM/SAM/SOM analysis with clear data points</li>
                    <li><span className="font-medium">Go-to-market strategy</span> - Detail your customer acquisition channels and sales process</li>
                    <li><span className="font-medium">Competitive landscape</span> - Position your unique advantage in the market</li>
                    <li><span className="font-medium">Financial projections</span> - Show 18-36 month projections with clear use of funds</li>
                  </ol>
                  
                  <p className="text-muted-foreground text-sm">
                    Series A investors look for evidence of product-market fit and a clear path to scaling revenue. I recommend creating a 12-15 slide deck with a strong narrative that connects your product to the market opportunity and shows how additional capital will accelerate growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="#cta" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/20 inline-flex items-center"
            >
              Try It Now – No Signup Required
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Audience;
