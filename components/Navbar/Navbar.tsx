"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { Button } from '@/components/UI/Button';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Facilities', href: '/facilities' },
  { name: 'Contact', href: '/contact' },
  { name: 'Admin', href: '/admin/login' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-100 z-50 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <span className="font-serif tracking-tight text-4xl sm:text-[40px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500 drop-shadow-sm">JMS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = item.name === 'Home' 
              ? pathname === '/' 
              : item.name === 'Admin'
                ? pathname.startsWith('/admin')
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm transition-colors group py-1 ${
                  isActive ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary font-medium'
                }`}
              >
                {item.name}
                <span className={`absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300 rounded-full ${
                  isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`}></span>
              </Link>
            );
          })}
        </div>

        {/* Right Action Button (Desktop) */}
        <div className="hidden md:block">
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 px-6 py-2.5 rounded-full text-sm font-bold border-none">
              Make An Appointment
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button - Right aligned */}
        <div className="md:hidden flex items-center justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:bg-gray-50 transition-colors rounded-full p-2 -mr-2 focus:outline-none"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-[100] w-[80%] max-w-sm bg-white flex flex-col md:hidden shadow-2xl"
            >
              {/* Header */}
              <div className="px-6 py-5 flex items-center justify-between">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
                  <span className="font-serif tracking-tight text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500 drop-shadow-sm">JMS</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  <HiX size={16} />
                </button>
              </div>
              
              {/* Links */}
              <div className="flex-1 overflow-y-auto py-2 px-4 flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = item.name === 'Home' 
                    ? pathname === '/' 
                    : item.name === 'Admin'
                      ? pathname.startsWith('/admin')
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`w-full py-3.5 px-4 rounded-xl transition-all text-[13px] ${
                        isActive 
                          ? 'bg-[#f4f6f8] text-[#0a192f] font-bold' 
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
