
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import Audience from '@/components/Audience';
import FAQ from '@/components/FAQ';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import AnimatedContainer from '@/components/AnimatedContainer';

const Index = () => {
  // Smooth scroll functionality
  useEffect(() => {
    // Function to handle smooth scrolling for anchor links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.href.includes(window.location.pathname)) {
        e.preventDefault();
        
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Update URL without page jump
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };
    
    // Add event listener to the document
    document.addEventListener('click', handleLinkClick);
    
    // Scroll to the section if there's a hash in the URL on page load
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }, 100);
      }
    }
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative dark:bg-gray-900">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-screen" style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(77, 171, 245, 0.15), transparent 40%), radial-gradient(circle at 70% 60%, rgba(114, 9, 183, 0.1), transparent 50%)',
          backgroundSize: '100% 100%'
        }} />
      </div>
      
      <Navbar />
      
      <main className="flex-grow">
        <AnimatedContainer
          animation="fade-in"
          delay={200}
          className="w-full"
        >
          <Hero />
        </AnimatedContainer>
        
        <AnimatedContainer
          animation="fade-in"
          delay={100}
          glassmorphism
          className="w-full"
        >
          <HowItWorks />
        </AnimatedContainer>
        
        <AnimatedContainer
          animation="fade-in"
          delay={100}
          className="w-full"
        >
          <Benefits />
        </AnimatedContainer>
        
        <AnimatedContainer
          animation="fade-in"
          delay={100}
          className="w-full"
        >
          <Audience />
        </AnimatedContainer>
        
        <AnimatedContainer
          animation="fade-in"
          delay={100}
          className="w-full"
        >
          <FAQ />
        </AnimatedContainer>
        
        <AnimatedContainer
          animation="fade-in"
          delay={100}
          className="w-full"
        >
          <CallToAction />
        </AnimatedContainer>
      </main>
      
      <Footer />
      
      {/* Minimal custom CSS for dark mode support */}
      <style>
        {`
        /* Dark mode adjustments */
        :root {
          color-scheme: light dark;
        }
        
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #121212;
            color: #f5f5f5;
          }
        }
        
        /* Ensures proper contrast in both modes */
        .text-balance {
          text-wrap: balance;
        }
        `}
      </style>
    </div>
  );
};

export default Index;
