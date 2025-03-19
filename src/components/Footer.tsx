
import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Github, Mail, MapPin, Zap, Flame, Bot, Sparkles, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleEasterEgg = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    target.classList.add('glitch-text');
    
    // Play glitch sound
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Audio context not supported or user interaction required');
    }
    
    setTimeout(() => {
      target.classList.remove('glitch-text');
    }, 1000);
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#111111] to-[#222222] border-t border-[#00FFDD]/20 pt-16 pb-8">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-20 bg-[radial-gradient(circle_at_top,rgba(0,255,221,0.05),transparent)]" />
        <div className="absolute inset-0 grid-background opacity-10" />
      </div>
      
      {/* Holographic scan line */}
      <div className="absolute inset-0 pointer-events-none holographic-scan opacity-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-[#FF00FF]/20 transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="flex items-center space-x-2 mb-4">
              <span className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-[#00FFDD] to-[#FF00FF] flex items-center justify-center">
                <span className="text-white font-bold text-lg glitch-text">I</span>
                <span className="absolute inset-0 animate-pulse rounded-lg opacity-50 bg-transparent border border-[#00FFDD]"></span>
              </span>
              <span className="text-xl font-bold text-white">Insirra<span className="text-[#00FFDD]">::</span>GPT</span>
            </div>
            <p className="text-white/70 mb-4 max-w-xs font-glitch text-sm">
              Insirra GPT is an AI-powered ecosystem designed to provide startup founders with expert guidance, insights, and strategies. <span className="text-[#FF00FF]">We're not just an AI, we're your co-founder.</span>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-[#00FFDD] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#00FFDD] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#00FFDD] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#00FFDD] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#00FFDD] transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-[#00FFDD]/20 transform rotate-1 hover:rotate-0 transition-transform">
            <h3 className="font-semibold text-lg mb-4 text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#FF00FF]" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Features", href: "#features", icon: <Sparkles className="h-3 w-3" /> },
                { label: "Benefits", href: "#benefits", icon: <Flame className="h-3 w-3" /> },
                { label: "Who It's For", href: "#audience", icon: <Bot className="h-3 w-3" /> },
                { label: "FAQ", href: "#faq", icon: <ArrowRight className="h-3 w-3" /> }
              ].map((link, index) => (
                <li key={index} className="group">
                  <a 
                    href={link.href} 
                    className="text-white/70 hover:text-[#00FFDD] transition-colors flex items-center gap-1 group-hover:-skew-x-6 transform-gpu transition-transform"
                    onClick={handleEasterEgg}
                  >
                    <span className="text-[#FF00FF] group-hover:text-[#00FFDD] transition-colors">
                      {link.icon}
                    </span>
                    {link.label}
                    <span className="w-0 h-0.5 bg-[#00FFDD] group-hover:w-full transition-all ml-1"></span>
                  </a>
                </li>
              ))}
              <li className="group">
                <a 
                  href="#" 
                  className="text-white/70 hover:text-[#00FFDD] transition-colors flex items-center gap-1 group-hover:-skew-x-6 transform-gpu transition-transform"
                >
                  <span className="text-[#FF00FF] group-hover:text-[#00FFDD] transition-colors">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  Blog
                  <span className="w-0 h-0.5 bg-[#00FFDD] group-hover:w-full transition-all ml-1"></span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-[#FF00FF]/20 transform -rotate-1 hover:rotate-0 transition-transform">
            <h3 className="font-semibold text-lg mb-4 text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#00FFDD]" />
              Legal
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Terms of Service", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Cookie Policy", href: "#" },
                { label: "Data Processing", href: "#" }
              ].map((link, index) => (
                <li key={index} className="group">
                  <a 
                    href={link.href} 
                    className="text-white/70 hover:text-[#FF00FF] transition-colors group-hover:skew-x-6 transform-gpu transition-transform inline-block"
                    onClick={handleEasterEgg}
                  >
                    {link.label}
                    <span className="w-0 h-0.5 bg-[#FF00FF] group-hover:w-full transition-all block"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-[#00FFDD]/20 transform rotate-1 hover:rotate-0 transition-transform">
            <h3 className="font-semibold text-lg mb-4 text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#FF00FF]" />
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 group cursor-pointer" onClick={handleEasterEgg}>
                <Mail className="h-5 w-5 text-[#00FFDD] mt-0.5 group-hover:text-[#FF00FF] transition-colors group-hover:rotate-6 transform-gpu transition-transform" />
                <span className="text-white/70 group-hover:text-white transition-colors group-hover:font-bold">support@insirragpt.com</span>
              </div>
              <div className="flex items-start space-x-3 group cursor-pointer" onClick={handleEasterEgg}>
                <MapPin className="h-5 w-5 text-[#00FFDD] mt-0.5 group-hover:text-[#FF00FF] transition-colors group-hover:-rotate-6 transform-gpu transition-transform" />
                <span className="text-white/70 group-hover:text-white transition-colors">
                  123 Innovation Drive<br />
                  San Francisco, CA 94103
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA and Copyright */}
        <div className="border-t border-[#00FFDD]/20 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-white/50 mb-4 md:mb-0 font-mono glitch-text-sm group cursor-pointer" onClick={handleEasterEgg}>
            <span className="group-hover:text-[#00FFDD] transition-colors inline-block">©</span> {currentYear} <span className="font-bold text-white/70">Insirra GPT</span>. All rights reserved.
          </p>
          
          <a 
            href="#cta" 
            className="bg-gradient-to-r from-[#00FFDD] to-[#FF00FF] hover:from-[#FF00FF] hover:to-[#00FFDD] text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 hover:skew-x-2"
          >
            <span className="mix-blend-difference">Start Your AI Journey</span>
          </a>
        </div>
      </div>
      
      {/* Easter egg element */}
      <div className="absolute bottom-2 right-2">
        <div className="text-[8px] text-white/20 font-mono cursor-pointer transform hover:scale-110 transition-transform" onClick={handleEasterEgg}>
          v4.20.69
        </div>
      </div>
    </footer>
  );
};

export default Footer;
