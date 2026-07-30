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
    <nav className="sticky top-0 bg-white border-b border-gray-100 z-50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <span className="font-serif tracking-tight text-3xl sm:text-4xl text-primary font-bold">JMS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm transition-colors ${
                  isActive ? 'text-primary font-bold' : 'text-gray-500 hover:text-primary font-medium'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Action Button (Desktop) */}
        <div className="hidden md:block">
          <Link href="/contact">
            <Button className="bg-primary text-white hover:bg-primary-dark px-6 py-2.5 rounded-full shadow-md text-sm font-bold">
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

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col py-6 px-4 space-y-1 mx-auto max-w-sm">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-[13px] py-4 px-5 rounded-2xl transition-all flex items-center justify-between ${
                      isActive 
                        ? 'bg-gray-50 text-gray-900 font-bold shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'
                    }`}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
