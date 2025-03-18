
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  // Check and apply the theme from local storage
  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 lg:px-8',
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 select-none">
          <span className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse-soft"></span>
          </span>
          <span className="text-xl font-bold">Insirra GPT</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </a>
          <a href="#benefits" className="text-sm font-medium transition-colors hover:text-primary">
            Why Insirra GPT
          </a>
          <a href="#audience" className="text-sm font-medium transition-colors hover:text-primary">
            Who It's For
          </a>
          <a href="#faq" className="text-sm font-medium transition-colors hover:text-primary">
            FAQ
          </a>
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode} 
            className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          {/* CTA Button */}
          <a 
            href="#cta" 
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105 hover:shadow-md active:scale-95"
          >
            Try Now
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button 
            onClick={toggleDarkMode} 
            className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="menu-button p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={cn(
            'mobile-menu fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background dark:bg-card p-6 shadow-xl transform transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <a href="#" className="flex items-center space-x-2 select-none">
              <span className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </span>
              <span className="text-xl font-bold">Insirra GPT</span>
            </a>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="py-2 transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a 
              href="#benefits" 
              className="py-2 transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Why Insirra GPT
            </a>
            <a 
              href="#audience" 
              className="py-2 transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Who It's For
            </a>
            <a 
              href="#faq" 
              className="py-2 transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </a>
          </div>
          
          <div className="mt-8">
            <a 
              href="#cta" 
              className="block w-full bg-primary text-white text-center py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              Try Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
