
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import AnimatedText from './AnimatedText';

const CallToAction = () => {
  return (
    <section id="cta" className="section bg-gradient-to-br from-primary/90 to-blue-500 relative overflow-hidden text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute inset-0 backdrop-blur-[100px] opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),transparent)]" />
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
            Start Your Journey Today
          </span>
          
          <AnimatedText
            text="Your Startup, Supercharged by AI"
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
            animation="glitch"
            glowColor="rgba(255, 255, 255, 0.8)"
          />
          
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Join thousands of founders who are leveraging AI to make better decisions, 
            secure funding, and build successful companies with the Insirra Forge ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 min-w-44"
            >
              Join Insirra Forge
              <ArrowRight className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="bg-transparent hover:bg-white/10 border border-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 min-w-44"
            >
              <Play className="h-4 w-4" />
              Watch Demo
            </a>
          </div>
          
          <p className="mt-8 text-sm text-white/70">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
