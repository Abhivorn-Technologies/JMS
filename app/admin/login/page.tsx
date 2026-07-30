"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/UI/Button';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.message || 'Invalid Email or Password');
      } else {
        toast.success('Login successful');
        router.push('/admin');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      
      {/* Floating Back Button (Moved outside main container for better mobile positioning) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-4 left-4 lg:top-8 lg:left-8 z-30"
      >
        <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#0a192f] transition-all shadow-sm">
          <FiArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </motion.div>

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-[24px] lg:rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row w-full max-w-[1100px] overflow-hidden relative min-h-[500px] lg:min-h-[650px] z-10"
      >
        
        {/* Left Side - Presentation (Hidden on mobile for a clean login experience) */}
        <div className="hidden lg:flex w-full lg:w-1/2 p-14 flex-col justify-center items-center relative border-r border-gray-100 bg-white">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-10 max-w-[350px]"
          >
            <h1 className="text-3xl font-bold text-[#0a192f] mb-3 font-serif">
              JMS Medical Platform
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed px-2">
              The secure portal for managing your enterprise content and operations.
            </p>
          </motion.div>
          
          {/* AI Image Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-100 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/40 to-transparent z-10 pointer-events-none"></div>
            <img 
              src="/images/admin_login_desk.png" 
              alt="JMS Medical Desk" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Elegant overlay logo in image */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 opacity-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-serif font-bold text-sm shadow-lg">
                JMS
              </div>
              <span className="font-serif tracking-tight text-white font-bold text-xl drop-shadow-md">Medical</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 lg:p-16 flex flex-col items-center justify-center bg-white relative">
          
          {/* Brand Logo Top */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center space-x-2 text-forest mb-8 mt-4 lg:mt-0"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#0a192f] to-[#112a52] rounded-xl flex items-center justify-center text-white font-serif shadow-md">
              JMS
            </div>
            <span className="font-serif tracking-tight text-2xl font-bold text-[#0a192f]">Medical</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mb-8 lg:mb-10 w-full"
          >
            <h2 className="text-[22px] sm:text-[26px] font-bold text-[#0a192f] mb-2 font-serif">Welcome Back</h2>
            <p className="text-[13px] text-gray-500">Sign in to continue to Admin Dashboard</p>
          </motion.div>
          
          <form onSubmit={handleLogin} className="w-full max-w-[360px] space-y-5 lg:space-y-6">
            
            {/* Email Field */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-2"
            >
              <label className="block text-[13px] font-bold text-[#0a192f]">Email Address <span className="text-red-500">*</span></label>
              <div className="relative flex items-center group">
                <div className="absolute left-4 text-gray-400 group-focus-within:text-teal-600 transition-colors z-10">
                  <FiMail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-[42px] pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 transition-all text-[13px]" 
                  placeholder="Enter the email" 
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="space-y-2"
            >
              <label className="block text-[13px] font-bold text-[#0a192f]">Password <span className="text-red-500">*</span></label>
              <div className="relative flex items-center group">
                <div className="absolute left-4 text-gray-400 group-focus-within:text-teal-600 transition-colors z-10">
                  <FiLock className="w-4 h-4" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-[42px] pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 transition-all text-[13px]" 
                  placeholder="Enter password" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-[#0a192f] transition-colors focus:outline-none z-10"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button 
                type="submit" 
                isLoading={isLoading} 
                className="w-full py-[14px] bg-[#018c79] hover:bg-[#017061] text-white font-bold rounded-lg shadow-[0_8px_20px_rgba(1,140,121,0.25)] transition-all mt-6 hover:-translate-y-0.5 tracking-wide text-[13px]"
              >
                Sign In To Dashboard
              </Button>
            </motion.div>
          </form>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-auto pt-8 lg:pt-10 text-center w-full"
          >
            <p className="text-[11px] text-gray-400">
              © {new Date().getFullYear()} JMS Medical. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
