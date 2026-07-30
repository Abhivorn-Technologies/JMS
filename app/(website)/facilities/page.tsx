"use client";

import { useState } from 'react';
import { Button } from '@/components/UI/Button';
import Link from 'next/link';

export default function FacilitiesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: ''
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Real-time strict typing prevention
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

    if (nameError || mobileError || emailError) {
      setErrors({ name: nameError, mobile: mobileError, email: emailError });
      return;
    }

    alert("Appointment requested successfully!");
    setFormData({ name: '', mobile: '', email: '' });
  };

  return (
    <div className="flex flex-col bg-white">
      
      {/* Premium Hero Section */}
      <section className="relative h-[calc(100vh-72px)] min-h-[500px] flex items-center justify-center bg-[#0a192f] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/facilities_hero.png" alt="Facilities" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 z-10 w-full text-center">
          <p className="text-blue-400 font-bold tracking-[0.2em] text-sm uppercase mb-4">Facilities & Infrastructure</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-serif mb-6">
            World-Class <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 italic font-light">Care Centers</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto font-light mb-8">
            JMS Medical Hospitals redefines healthcare by offering state-of-the-art facilities that combine cutting-edge medical technology with unparalleled patient-centric care.
          </p>
          <div className="flex justify-center w-full">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg transition-all rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.3)] border-none">
              Explore Centres
            </Button>
          </div>
        </div>
      </section>

      {/* Modern Intro Section */}
      <section className="relative py-28 bg-[#f8f9fa] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative hidden lg:block">
            <div className="w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white">
              <img src="/images/facilities_intro.png" alt="Excellence" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 aspect-square rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-8 border-[#f8f9fa] z-20 bg-white">
              <img src="/images/surgical_microscope.png" alt="Precision" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-8 lg:pl-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a192f] leading-tight font-serif">
              Excellence <br/>
              <span className="text-blue-600 italic font-light">at JMS Medical</span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              We are dedicated to providing exceptional care through state-of-the-art facilities designed with your comfort and well-being in mind. Our advanced surgical suites ensure the highest standards of precision and safety.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="text-4xl font-serif text-[#0a192f] mb-2">24/7</h4>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Emergency Care</p>
              </div>
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="text-4xl font-serif text-[#0a192f] mb-2">100%</h4>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sterile Protocol</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Services Grid */}
      <section className="relative py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-6 font-serif">Comprehensive <span className="text-blue-600 italic font-light">Care</span></h2>
            <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">Specialized facilities tailored for every need with next-generation infrastructure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 relative h-[400px] rounded-[32px] overflow-hidden group shadow-md border border-gray-100">
              <img src="/images/hero_doctor.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-[#0a192f]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10">
                <div className="text-blue-400 font-bold text-sm tracking-widest mb-3 bg-blue-500/20 inline-block px-4 py-1 rounded-full backdrop-blur-md">01</div>
                <h3 className="text-3xl font-bold text-white mb-3 font-serif">Multi-Speciality Team Approach</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light max-w-md">One Patient, Multiple Experts. Our dedicated technical team works together to deliver coordinated and holistic care.</p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-[32px] overflow-hidden group shadow-md border border-gray-100">
              <img src="/images/facilities_endoscopy.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-[#0a192f]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-blue-400 font-bold text-sm tracking-widest mb-3 bg-blue-500/20 inline-block px-4 py-1 rounded-full backdrop-blur-md">02</div>
                <h3 className="text-2xl font-bold text-white mb-3 font-serif">Advanced Endoscopy Unit</h3>
              </div>
            </div>
            <div className="relative h-[400px] rounded-[32px] overflow-hidden group shadow-md border border-gray-100">
              <img src="/images/surgical_microscope.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-[#0a192f]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-blue-400 font-bold text-sm tracking-widest mb-3 bg-blue-500/20 inline-block px-4 py-1 rounded-full backdrop-blur-md">03</div>
                <h3 className="text-2xl font-bold text-white mb-3 font-serif">Ethical & Professional</h3>
              </div>
            </div>
            <div className="lg:col-span-2 relative h-[400px] rounded-[32px] overflow-hidden group shadow-md border border-gray-100">
              <img src="/images/facilities_hero.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-[#0a192f]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10">
                <div className="text-blue-400 font-bold text-sm tracking-widest mb-3 bg-blue-500/20 inline-block px-4 py-1 rounded-full backdrop-blur-md">04</div>
                <h3 className="text-3xl font-bold text-white mb-3 font-serif">24 Hour Equipment Support</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light max-w-md">Always Available, Always Reliable. Round-the-clock technical support for all your medical devices and emergency response.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Split Layout - Clean and Leveled */}
      <section className="relative bg-white h-[calc(100vh-72px)] min-h-[600px] flex items-center overflow-hidden">
        {/* Subtle Gradient Glows (No dots, pure clean elegance) */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/70 rounded-full blur-[100px] opacity-80 pointer-events-none -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-50/40 rounded-full blur-[100px] pointer-events-none translate-y-1/4 -translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Left: Narrative (Title, Paragraph, CTA) */}
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-sm border border-gray-100 text-[#0a192f] font-bold text-[10px] tracking-[0.2em] uppercase mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Next-Gen Facilities
              </div>
              
              <h2 className="text-5xl lg:text-[72px] font-bold text-[#0a192f] mb-6 tracking-tight font-serif leading-[1.05]">
                Advanced <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 italic font-light pr-2">Endoscopy</span> <br/>
                Suites.
              </h2>
              
              <p className="text-lg lg:text-xl font-light text-gray-500 leading-relaxed mb-10 max-w-lg">
                JMS Medical offers advanced options for comprehensive endoscopy diagnostics and treatments using next-generation visualization instruments.
              </p>
              
              <Button className="bg-[#0a192f] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold tracking-[0.15em] uppercase text-[11px] transition-all shadow-lg hover:shadow-xl flex items-center gap-4 group w-max">
                Call +91 96668 20714
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                  <svg className="w-3 h-3 text-white transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </Button>
            </div>

            {/* Right: Visual Features Grid */}
            <div className="lg:w-1/2 w-full flex items-center justify-center pt-8 lg:pt-0">
              
              {/* Product-Style Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                
                {/* Card 1 - High Precision */}
                <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col overflow-hidden group hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] transition-all duration-300">
                  {/* Top Image */}
                  <div className="h-48 w-full overflow-hidden relative bg-gray-100">
                    <img src="/images/endoscopy_system.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Endoscopy System" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 lg:p-8 flex flex-col flex-grow relative bg-white">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      </div>
                      <h4 className="text-[18px] font-bold text-[#0a192f] font-serif">High Precision</h4>
                    </div>
                    
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-8 flex-grow">
                      State-of-the-art visualization instruments for exact diagnostics and treatments.
                    </p>
                    
                    {/* Outline Button */}
                    <a href="/contact" className="w-full bg-white border border-gray-200 text-blue-600 hover:text-blue-700 font-bold text-[10px] tracking-widest uppercase py-3.5 rounded-xl hover:border-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 text-center">
                      CONNECT
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                  </div>
                </div>
                
                {/* Card 2 - Patient Comfort */}
                <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col overflow-hidden group hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] transition-all duration-300">
                  {/* Top Image */}
                  <div className="h-48 w-full overflow-hidden relative bg-gray-100">
                    <img src="/images/facilities_hero.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Patient Care Facility" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 lg:p-8 flex flex-col flex-grow relative bg-white">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                      </div>
                      <h4 className="text-[18px] font-bold text-[#0a192f] font-serif">Patient Comfort</h4>
                    </div>
                    
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-8 flex-grow">
                      Designed to ensure the absolute highest level of safety and patient care during procedures.
                    </p>
                    
                    {/* Outline Button */}
                    <a href="/contact" className="w-full bg-white border border-gray-200 text-blue-600 hover:text-blue-700 font-bold text-[10px] tracking-widest uppercase py-3.5 rounded-xl hover:border-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 text-center">
                      CONNECT
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Premium Unified Contact Section - Best Organized Layout */}
      <section className="relative bg-[#f8f9fa] h-[calc(100vh-72px)] min-h-[850px] flex items-center py-12">
        <div className="max-w-6xl mx-auto px-6 w-full">
          
          {/* Unified Mega Card Container */}
          <div className="flex flex-col lg:flex-row w-full bg-white rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 relative z-10">
            
            {/* Left Panel - Dark & Elegant */}
            <div className="w-full lg:w-[45%] bg-[#0a192f] p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden">
              {/* Background glowing accents inside the panel */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-10 h-1 bg-blue-500 mb-6 rounded-full"></div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-serif leading-tight">
                  Let's Connect <br/><span className="text-blue-400 italic font-light block mt-1">Today.</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mt-4">
                  Reach out to Hyderabad's Leading Multispeciality Distributor for all your facility and medical equipment needs.
                </p>
              </div>

              <div className="relative z-10 space-y-8 mt-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/5 backdrop-blur-md">
                    <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">Office Address</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">#6-2-9/1, 2nd Floor, Azam Towers,<br/>Lakadi-Ka-Pool, Hyderabad 500004</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/5 backdrop-blur-md">
                    <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">Contact Numbers</h4>
                    <p className="text-gray-400 text-sm leading-relaxed flex flex-col">
                      <span>+91 96668 20714</span>
                      <span>+91 9398367411</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - White Form */}
            <div className="w-full lg:w-[55%] bg-white p-10 lg:p-16 flex flex-col justify-center">
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#0a192f] mb-8">Book an Appointment</h3>
              
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2 relative">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex gap-1">YOUR NAME <span className="text-red-500">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} maxLength={100} className={`w-full px-5 py-4 bg-[#f8f9fa] rounded-[14px] border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all text-sm text-gray-900`} placeholder="John Doe" required />
                  {errors.name && <p className="text-red-500 text-[9px] font-bold uppercase tracking-wider absolute -bottom-4 left-1">{errors.name}</p>}
                </div>

                <div className="space-y-2 relative">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex gap-1">EMAIL ADDRESS <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} maxLength={255} className={`w-full px-5 py-4 bg-[#f8f9fa] rounded-[14px] border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all text-sm text-gray-900`} placeholder="john@company.com" required />
                  {errors.email && <p className="text-red-500 text-[9px] font-bold uppercase tracking-wider absolute -bottom-4 left-1">{errors.email}</p>}
                </div>

                <div className="space-y-2 relative">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex gap-1">MOBILE NUMBER <span className="text-red-500">*</span></label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} maxLength={10} className={`w-full px-5 py-4 bg-[#f8f9fa] rounded-[14px] border ${errors.mobile ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all text-sm text-gray-900`} placeholder="9876543210" required />
                  {errors.mobile && <p className="text-red-500 text-[9px] font-bold uppercase tracking-wider absolute -bottom-4 left-1">{errors.mobile}</p>}
                </div>
                
                <button type="submit" className="w-full bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-4.5 rounded-[14px] transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] tracking-widest uppercase text-[12px] mt-6 border border-blue-800/50">
                  SUBMIT REQUEST
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
