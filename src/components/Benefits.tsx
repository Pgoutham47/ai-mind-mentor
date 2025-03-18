
import React, { useState } from 'react';
import { Brain, TrendingUp, BarChart4 } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import AnimatedText from './AnimatedText';

const testimonials = [
  {
    quote: "Insirra GPT helped me secure my first investment. It's like having a personal mentor available 24/7!",
    author: "Sarah Chen",
    position: "Founder, NexTech Solutions"
  },
  {
    quote: "The market insights and strategic advice I received saved me months of research and potentially costly mistakes.",
    author: "Michael Rodriguez",
    position: "CEO, Quantum Finance"
  },
  {
    quote: "As a first-time founder, Insirra GPT has been invaluable for answering my questions and guiding my decision-making.",
    author: "Jessica Wong",
    position: "Founder, EcoSolutions"
  }
];

const Benefits = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const benefits = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI-Powered Insights",
      description: "Expert-level strategies at your fingertips, drawn from a vast knowledge base of startup success patterns.",
      delay: 0
    },
    {
      icon: <BarChart4 className="h-10 w-10 text-primary" />,
      title: "Investor-Ready Reports",
      description: "Generate professional funding roadmaps, business valuations, and pitch decks with a few simple prompts.",
      delay: 200
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Real-Time Market Trends",
      description: "Stay ahead with live startup intelligence and industry-specific insights for informed decision making.",
      delay: 400
    }
  ];
  
  // Auto-rotate testimonials
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="benefits" className="section bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-blue-300/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedText
            text="Why Founders Trust Insirra GPT"
            className="text-3xl md:text-4xl font-bold mb-4"
          />
          <AnimatedText
            text="Our AI platform delivers startup founders the tools, insights, and guidance they need to navigate the complex journey of building a successful company."
            className="text-lg text-muted-foreground"
            delay={200}
          />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <AnimatedCard key={index} delay={benefit.delay}>
              <div className="h-full bg-secondary/50 rounded-2xl p-6 border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 flex flex-col">
                <div className="rounded-xl bg-primary/10 p-3 w-fit mb-5">
                  {benefit.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-center text-2xl font-semibold mb-10">What Founders Are Saying</h3>
          
          <div className="relative bg-secondary/50 rounded-2xl p-8 shadow-sm border border-border/50 overflow-hidden">
            {/* Testimonial Content */}
            <div className="relative z-10">
              <div className="mb-6 text-center">
                <svg className="h-10 w-10 text-primary/30 mx-auto mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.17463 6C9.58911 6 9.92638 6.32 9.92638 6.72V9.44C9.92638 9.83 9.58911 10.15 9.17463 10.15H7.24148L7.23579 14.04C7.23579 15.2 8.30232 16.16 9.60243 16.16H9.89574C10.3067 16.16 10.6408 16.48 10.6408 16.87V18.28C10.6408 18.68 10.3067 19 9.89574 19H9.60243C6.71255 19 4.36908 16.85 4.36908 14.1V6.72C4.36908 6.32 4.70067 6 5.11083 6H9.17463Z" fill="currentColor"/>
                  <path d="M18.8914 6C19.3094 6 19.6409 6.32 19.6409 6.72V9.44C19.6409 9.83 19.3094 10.15 18.8914 10.15H16.9582L16.9582 14.04C16.9582 15.2 18.0191 16.16 19.3192 16.16H19.6125C20.0269 16.16 20.3585 16.48 20.3585 16.87V18.28C20.3585 18.68 20.0269 19 19.6125 19H19.3192C16.4293 19 14.0915 16.85 14.0915 14.1V6.72C14.0915 6.32 14.4231 6 14.8333 6H18.8914Z" fill="currentColor"/>
                </svg>
                <p className="text-lg md:text-xl italic text-center mx-auto max-w-2xl">
                  {testimonials[activeTestimonial].quote}
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">{testimonials[activeTestimonial].author}</p>
                <p className="text-sm text-muted-foreground">{testimonials[activeTestimonial].position}</p>
              </div>
            </div>
            
            {/* Testimonial Navigation */}
            <div className="mt-8 flex items-center justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'w-6 bg-primary' 
                      : 'w-2 bg-primary/30'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Background Elements */}
            <div className="absolute top-0 left-0 -z-0 opacity-5 w-20 h-20">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.17463 6C9.58911 6 9.92638 6.32 9.92638 6.72V9.44C9.92638 9.83 9.58911 10.15 9.17463 10.15H7.24148L7.23579 14.04C7.23579 15.2 8.30232 16.16 9.60243 16.16H9.89574C10.3067 16.16 10.6408 16.48 10.6408 16.87V18.28C10.6408 18.68 10.3067 19 9.89574 19H9.60243C6.71255 19 4.36908 16.85 4.36908 14.1V6.72C4.36908 6.32 4.70067 6 5.11083 6H9.17463Z" fill="currentColor"/>
                <path d="M18.8914 6C19.3094 6 19.6409 6.32 19.6409 6.72V9.44C19.6409 9.83 19.3094 10.15 18.8914 10.15H16.9582L16.9582 14.04C16.9582 15.2 18.0191 16.16 19.3192 16.16H19.6125C20.0269 16.16 20.3585 16.48 20.3585 16.87V18.28C20.3585 18.68 20.0269 19 19.6125 19H19.3192C16.4293 19 14.0915 16.85 14.0915 14.1V6.72C14.0915 6.32 14.4231 6 14.8333 6H18.8914Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 -z-0 opacity-5 w-20 h-20 transform rotate-180">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.17463 6C9.58911 6 9.92638 6.32 9.92638 6.72V9.44C9.92638 9.83 9.58911 10.15 9.17463 10.15H7.24148L7.23579 14.04C7.23579 15.2 8.30232 16.16 9.60243 16.16H9.89574C10.3067 16.16 10.6408 16.48 10.6408 16.87V18.28C10.6408 18.68 10.3067 19 9.89574 19H9.60243C6.71255 19 4.36908 16.85 4.36908 14.1V6.72C4.36908 6.32 4.70067 6 5.11083 6H9.17463Z" fill="currentColor"/>
                <path d="M18.8914 6C19.3094 6 19.6409 6.32 19.6409 6.72V9.44C19.6409 9.83 19.3094 10.15 18.8914 10.15H16.9582L16.9582 14.04C16.9582 15.2 18.0191 16.16 19.3192 16.16H19.6125C20.0269 16.16 20.3585 16.48 20.3585 16.87V18.28C20.3585 18.68 20.0269 19 19.6125 19H19.3192C16.4293 19 14.0915 16.85 14.0915 14.1V6.72C14.0915 6.32 14.4231 6 14.8333 6H18.8914Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#cta" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/20 inline-flex items-center"
          >
            Start Your AI Mentorship Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
