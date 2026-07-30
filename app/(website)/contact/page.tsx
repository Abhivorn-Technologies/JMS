"use client";

import { useState } from 'react';
import { Button } from '@/components/UI/Button';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });

  const validateName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return "Name is required.";
    if (trimmed.length < 2) return "Min 2 characters.";
    if (trimmed.length > 100) return "Max 100 characters.";
    if (/\d/.test(trimmed)) return "Numbers not allowed.";
    const validCharRegex = /^[a-zA-Z\u00C0-\u024F\s\-'.]+$/;
    if (!validCharRegex.test(trimmed)) return "Invalid characters.";
    return "";
  };

  const validateMobile = (mobile: string) => {
    const cleaned = mobile.trim();
    if (!cleaned) return "Mobile number is required.";
    if (cleaned.length !== 10) return "Must be exactly 10 digits.";
    if (/^[0-5]/.test(cleaned)) return "Cannot start with 0-5.";
    if (!/^[6-9]\d{9}$/.test(cleaned)) return "Invalid phone number format.";
    return "";
  };

  const validateEmail = (email: string) => {
    const trimmed = email.trim();
    if (!trimmed) return "Email address is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return "Invalid email address.";
    return "";
  };

  const validateMessage = (message: string) => {
    if (!message) return ""; // Optional
    const trimmed = message.trim();
    if (trimmed.length > 2000) return "Max 2000 characters.";
    if (/[<>]/.test(trimmed)) return "HTML tags not allowed.";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Real-time strict typing prevention (blocks characters instantly)
    if (name === 'name' && /[^a-zA-Z\u00C0-\u024F\s\-'.]/.test(value)) return;
    
    if (name === 'mobile') {
      if (/[^\d]/.test(value)) return;
      if (value.length > 0 && /^[0-5]/.test(value)) return;
    }

    if (name === 'email') {
      if (/[^a-zA-Z0-9._\-@]/.test(value)) return;
      if (/^[@.]/.test(value)) return;
      if ((value.match(/@/g) || []).length > 1) return;
    }

    if (name === 'message') {
      // Whitelist for message: Letters, numbers, space, newline, and basic punctuation (- ' . ? ! ,)
      if (/[^a-zA-Z0-9\u00C0-\u024F\s\-'.?!,\n]/.test(value)) return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(formData.name);
    const mobileError = validateMobile(formData.mobile);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    if (nameError || mobileError || emailError || messageError) {
      setErrors({ name: nameError, mobile: mobileError, email: emailError, message: messageError });
      return;
    }

    alert("Form submitted successfully!");
    setFormData({ name: '', mobile: '', email: '', message: '' });
  };

  return (
    <div className="bg-[#fcfdfd] min-h-screen pt-32 pb-24">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-100/50 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-50"></div>
        <h1 className="text-[42px] md:text-[64px] font-serif font-extrabold text-[#0a192f] text-center leading-tight tracking-tight">
          Let's Start Your <span className="italic text-blue-600 font-light block mt-[-10px]">Partnership</span>
        </h1>
        <p className="text-center text-gray-500 mt-6 max-w-2xl mx-auto text-lg font-medium">
          Have a question or ready to discuss a project? Our team is standing by to provide expert medical equipment solutions tailored for you.
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-28">
        
        {/* Left Side: Map with Floating Card */}
        <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 h-[600px] w-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827184247!2d77.2090212!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full z-0 object-cover"
          ></iframe>
          
          <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-[340px] bg-white p-7 rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.15)] z-10 border border-gray-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#0a192f] rounded-full flex items-center justify-center text-white shadow-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-gray-900 text-[16px]">JMS Medical</h3>
                <p className="text-[11px] text-gray-500 font-medium">India</p>
              </div>
            </div>
            
            <div className="space-y-5 mb-7">
              <div className="flex items-start gap-3 text-[12px] font-medium text-gray-800">
                <svg className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <div className="flex flex-col gap-0.5">
                  <span className="text-gray-400">Address:</span>
                  <span>#6-2-9/1, Azam Towers, Lakadi-Ka-Pool, Hyd</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[12px] font-medium text-gray-800">
                <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <div><span className="text-gray-400 mr-1">Phone:</span> +91 96668 20714</div>
              </div>
              <div className="flex items-center gap-3 text-[12px] font-medium text-gray-800">
                <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <div><span className="text-gray-400 mr-1">Email:</span> jamesmedicalsystems@gmail.com</div>
              </div>
            </div>
            
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              <button className="w-full bg-gradient-to-b from-[#0a192f] to-[#061020] hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] shadow-lg border border-[#061020]/50">
                GET DIRECTIONS
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </button>
            </a>
          </div>
        </div>

        {/* Right Side: The Form Card */}
        <div className="w-full bg-white rounded-[32px] p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100/50 flex flex-col justify-center h-[600px]">
          <h2 className="text-[28px] font-serif font-bold text-[#0a192f] mb-8 text-center">Book a Consultation</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 relative">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex gap-1">YOUR NAME <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} maxLength={100} className={`w-full px-5 py-4 bg-[#f8f9fa] rounded-[14px] border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all text-sm text-gray-900`} placeholder="John Doe" required />
                {errors.name && <p className="text-red-500 text-[9px] font-bold uppercase tracking-wider absolute -bottom-4 left-1">{errors.name}</p>}
              </div>
              <div className="space-y-2 relative">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex gap-1">MOBILE NUMBER <span className="text-red-500">*</span></label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} maxLength={10} className={`w-full px-5 py-4 bg-[#f8f9fa] rounded-[14px] border ${errors.mobile ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all text-sm text-gray-900`} placeholder="9876543210" required />
                {errors.mobile && <p className="text-red-500 text-[9px] font-bold uppercase tracking-wider absolute -bottom-4 left-1">{errors.mobile}</p>}
              </div>
            </div>
            
            <div className="space-y-2 relative">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex gap-1">EMAIL ADDRESS <span className="text-red-500">*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} maxLength={255} className={`w-full px-5 py-4 bg-[#f8f9fa] rounded-[14px] border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all text-sm text-gray-900`} placeholder="john@company.com" required />
              {errors.email && <p className="text-red-500 text-[9px] font-bold uppercase tracking-wider absolute -bottom-4 left-1">{errors.email}</p>}
            </div>
            
            <div className="space-y-2 relative">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex gap-1">YOUR MESSAGE</label>
              <textarea name="message" value={formData.message} onChange={handleChange} maxLength={2000} rows={4} className={`w-full px-5 py-4 bg-[#f8f9fa] rounded-[14px] border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all text-sm text-gray-900 resize-none`} placeholder="Tell us about your project, location, and goals..."></textarea>
              {errors.message && <p className="text-red-500 text-[9px] font-bold uppercase tracking-wider absolute -bottom-4 left-1">{errors.message}</p>}
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-4.5 rounded-[14px] transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] tracking-widest uppercase text-[12px] mt-8 border border-blue-800/50">
              SUBMIT REQUEST
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-5 leading-relaxed">
              By submitting this form, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>

      </div>

      {/* Bottom 3 Contact Blocks */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
        
        <div className="bg-white rounded-[24px] p-8 shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center transition-all hover:-translate-y-1 duration-300">
          <h3 className="font-bold text-[#0a192f] text-base mb-2">Email</h3>
          <p className="text-gray-500 text-xs font-medium">jamesmedicalsystems@gmail.com</p>
        </div>

        <div className="bg-white rounded-[24px] p-8 shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center transition-all hover:-translate-y-1 duration-300">
          <h3 className="font-bold text-[#0a192f] text-base mb-2">Phone</h3>
          <p className="text-gray-500 text-xs font-medium">+91 96668 20714</p>
        </div>

        <div className="bg-white rounded-[24px] p-8 shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center transition-all hover:-translate-y-1 duration-300">
          <h3 className="font-bold text-[#0a192f] text-base mb-2">WhatsApp</h3>
          <p className="text-gray-500 text-xs font-medium">+91 9398367411</p>
        </div>

      </div>

    </div>
  );
}
