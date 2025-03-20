
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
    
    // Mouse trail effect
    const createMouseTrail = () => {
      const trail = document.createElement('div');
      trail.className = 'pointer-events-none fixed w-6 h-6 rounded-full z-50 opacity-0';
      trail.style.background = 'radial-gradient(circle, rgba(77, 171, 245, 0.5) 0%, rgba(77, 171, 245, 0) 70%)';
      trail.style.transform = 'translate(-50%, -50%)';
      trail.style.transition = 'opacity 0.3s ease-out, width 0.2s ease-out, height 0.2s ease-out';
      document.body.appendChild(trail);
      
      const handleMouseMove = (e: MouseEvent) => {
        trail.style.opacity = '0.7';
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        
        // Animate size based on mouse speed
        const now = Date.now();
        const lastMove = trail.getAttribute('data-last-move') || now;
        const timeDiff = now - Number(lastMove);
        
        if (timeDiff > 0) {
          const lastX = Number(trail.getAttribute('data-last-x') || e.clientX);
          const lastY = Number(trail.getAttribute('data-last-y') || e.clientY);
          
          const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
          const speed = distance / timeDiff;
          
          const size = Math.min(16 + speed * 20, 60);
          trail.style.width = `${size}px`;
          trail.style.height = `${size}px`;
        }
        
        trail.setAttribute('data-last-move', String(now));
        trail.setAttribute('data-last-x', String(e.clientX));
        trail.setAttribute('data-last-y', String(e.clientY));
      };
      
      const handleMouseLeave = () => {
        trail.style.opacity = '0';
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.body.removeChild(trail);
      };
    };
    
    // Add CSS for typewriter animation
    const addTypewriterStyles = () => {
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        .typewriter .typewriter-cursor {
          display: inline-block;
          width: 2px;
          background-color: currentColor;
          animation: typewriter-blink 0.7s infinite;
        }
        
        @keyframes typewriter-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .typewriter {
          display: inline-block;
        }
        
        .typewriter-container {
          display: inline-flex;
          align-items: center;
        }
      `;
      document.head.appendChild(styleEl);
      
      return () => {
        document.head.removeChild(styleEl);
      };
    };
    
    // Add event listener to the document
    document.addEventListener('click', handleLinkClick);
    
    // Create mouse trail
    const removeMouseTrail = createMouseTrail();
    
    // Add typewriter styles
    const removeTypewriterStyles = addTypewriterStyles();
    
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
      removeMouseTrail();
      removeTypewriterStyles();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background mesh effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-20 pointer-events-none">
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
          particleBackground
          particleCount={30}
          className="w-full"
        >
          <Benefits />
        </AnimatedContainer>
        
        <AnimatedContainer
          animation="fade-in"
          delay={100}
          perspective
          className="w-full"
        >
          <Audience />
        </AnimatedContainer>
        
        <AnimatedContainer
          animation="fade-in"
          delay={100}
          cyberpunk
          className="w-full"
        >
          <FAQ />
        </AnimatedContainer>
        
        <AnimatedContainer
          animation="slide-up"
          delay={100}
          neonBorder
          neonColor="rgba(82, 109, 254, 0.5)"
          className="w-full"
        >
          <CallToAction />
        </AnimatedContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
