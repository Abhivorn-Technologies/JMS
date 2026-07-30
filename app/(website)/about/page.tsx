"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/UI/Button";
import { FadeIn } from "@/components/UI/FadeIn";

const tabs = [
  { id: "mission", label: "Mission & Vision" },
  { id: "values", label: "Our Core Values" },
  { id: "facilities", label: "Facilities & Technology" },
  { id: "specialties", label: "Core Specialties" },
];

const reviews = [
  { name: "Sophia R.", rating: 5, text: "Before I came to JMS Medical, I struggled with my health for years. The team here offered exceptional care and advanced treatments that completely transformed my life. The facilities are truly world-class." },
  { name: "David M.", rating: 5, text: "I had a long history of related health issues, including high blood pressure. After extensive research, I decided on JMS Medical. The doctors are incredibly knowledgeable and the staff is very supportive." },
  { name: "Emily T.", rating: 5, text: "Deciding to have my procedure at JMS Medical in Hyderabad was one of the best decisions I've made. The sterile environment, the advanced technology, and the 24/7 care made me feel incredibly safe and valued." },
  { name: "Michael K.", rating: 5, text: "Outstanding experience from start to finish. The managing director's patient-first approach is evident in every single interaction. Highly recommend for any specialized treatments." }
];

const gallery = [
  "/images/facilities_intro.png",
  "/images/facilities_hero.png",
  "/images/facilities_endoscopy.png",
  "/images/WhatsApp Image 2026-07-29 at 10.46.34 AM.jpeg",
  "/images/WhatsApp Image 2026-07-29 at 10.46.35 AM (2).jpeg",
  "/images/WhatsApp Image 2026-07-29 at 10.46.36 AM (2).jpeg"
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className="flex flex-col bg-background pb-16">
      
      {/* 1. ULTRA-PREMIUM MAGAZINE HERO */}
      <section className="relative bg-white pt-12 lg:pt-16 pb-20 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
              <FadeIn delay={0.1} direction="up">
                <div className="inline-flex items-center gap-4">
                  <div className="w-12 h-px bg-primary"></div>
                  <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Excellence in Healthcare</span>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.3} direction="up">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-forest leading-[1.1] font-serif">
                  About <br/><span className="text-primary italic font-light">JMS Medical</span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.5} direction="up">
                <p className="text-xl text-gray-500 font-light leading-relaxed max-w-lg">
                  Hyderabad's premier destination for specialized medical care. We blend world-class clinical expertise with unparalleled patient comfort.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.4} direction="left" className="w-full lg:w-1/2 relative aspect-[4/3]">
              <div className="absolute inset-0 bg-primary/5 translate-x-6 translate-y-6 rounded-[2.5rem]"></div>
              <Image 
                src="/images/facilities_intro.png" 
                alt="Facility" 
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover rounded-[2.5rem] shadow-2xl" 
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE SHOWCASE */}
      <section className="bg-gray-50/50 border-y border-gray-100 py-12">
          <div className="max-w-7xl mx-auto w-full px-6">
            
            {/* Elegant Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 border-b border-gray-200 pb-4">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative pb-4 px-2 text-lg md:text-xl font-serif transition-all duration-300 ${
                      isActive ? "text-primary font-bold" : "text-gray-400 hover:text-forest"
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.5)]"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Showcase Content Container */}
            <div className="relative min-h-[400px]">
              {tabs.map((tab) => (
                <div 
                  key={tab.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    activeTab === tab.id ? "opacity-100 translate-y-0 relative z-10" : "opacity-0 translate-y-8 absolute pointer-events-none z-0"
                  }`}
                >
                  {tab.id === "mission" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                      <div className="space-y-10">
                        <div className="relative">
                          <h3 className="text-3xl lg:text-4xl font-bold text-forest mb-4 font-serif">Our Mission</h3>
                          <div className="w-12 h-px bg-primary mb-6"></div>
                          <p className="text-gray-500 text-lg leading-relaxed font-light italic">
                            "To lead in specialized healthcare by delivering innovative, compassionate, and comprehensive care focused entirely on patient well-being at Hyderabad's top-rated facility."
                          </p>
                        </div>
                        <div className="relative">
                          <h3 className="text-3xl lg:text-4xl font-bold text-forest mb-4 font-serif">Our Vision</h3>
                          <div className="w-12 h-px bg-primary mb-6"></div>
                          <p className="text-gray-500 text-lg leading-relaxed font-light italic">
                            "To be India's most trusted healthcare destination, offering holistic medical solutions with advanced technology and an unwavering patient-first approach."
                          </p>
                        </div>
                      </div>
                      <div className="relative w-full aspect-[4/3] max-h-[450px] p-4 bg-white border border-gray-200 shadow-sm hidden md:block mx-auto">
                        <img src="/images/facilities_hero.png" alt="Mission Vision" className="w-full h-full object-cover grayscale-[15%]" />
                      </div>
                    </div>
                  )}

                  {tab.id === "values" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-2">
                      {[
                        { title: "Compassion", desc: "Treating every patient with the utmost empathy, kindness, and respect they deserve.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                        { title: "Excellence", desc: "Striving for the highest clinical standards and continuously improving our medical practices.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                        { title: "Integrity", desc: "Maintaining complete transparency, ethics, and honesty in all our patient interactions.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                        { title: "Innovation", desc: "Embracing cutting-edge technology and modern techniques to deliver superior outcomes.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }
                      ].map((value, i) => (
                        <div key={i} className="group relative bg-white rounded-[2rem] border border-gray-100 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:border-primary/20 transition-all duration-500 overflow-hidden">
                          {/* Accent Glow */}
                          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>
                          
                          <div className="flex items-start gap-6">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500 shrink-0 border border-gray-100 group-hover:border-primary shadow-sm">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={value.icon}></path></svg>
                            </div>
                            <div>
                              <h4 className="text-2xl font-bold text-forest mb-3 font-serif group-hover:text-primary transition-colors duration-300">{value.title}</h4>
                              <p className="text-gray-500 font-light leading-relaxed text-base">{value.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab.id === "facilities" && (
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
                      <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <h3 className="text-3xl lg:text-4xl font-bold text-forest mb-6 font-serif leading-tight">State-of-the-Art <br/><span className="text-primary italic font-light">Infrastructure</span></h3>
                        <div className="w-12 h-px bg-primary mb-6"></div>
                        <p className="text-gray-500 font-light text-lg mb-8 leading-relaxed">
                          Equipped with the world's most advanced medical technology, our facilities are designed to provide unparalleled precision, safety, and comfort.
                        </p>
                        <ul className="space-y-4 border-l border-gray-200 pl-6">
                          {[
                            "Advanced Robotic Surgery Suites",
                            "24/7 Level-1 Trauma & Emergency",
                            "AI-Powered Diagnostic Imaging",
                            "Ultra-Sterile HEPA-filtered OTs",
                            "Luxury Private Recovery Suites"
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-forest text-base font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-full lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-gray-50 border border-gray-200 p-4 translate-x-4 translate-y-4"></div>
                        <img src="/images/facilities_intro.png" alt="Facilities" className="relative w-full aspect-[4/3] max-h-[400px] object-cover grayscale-[10%]" />
                      </div>
                    </div>
                  )}

                  {tab.id === "specialties" && (
                    <div className="bg-forest p-10 lg:p-12 relative overflow-hidden border border-forest">
                      <div className="relative z-10 text-center mb-10">
                        <div className="w-12 h-px bg-primary mx-auto mb-6"></div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-serif">Centers of <span className="text-primary-light italic font-light">Excellence</span></h3>
                        <p className="text-white/70 font-light text-lg max-w-2xl mx-auto">
                          JMS Medical offers specialized departments led by globally trained experts, ensuring comprehensive care for complex conditions.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 relative z-10 max-w-5xl mx-auto">
                        {[
                          "Advanced Cardiology", "Neurology & Neurosurgery", "Orthopedics & Spine", 
                          "Gastroenterology", "Oncology Care", "Minimally Invasive Surgery"
                        ].map((specialty, i) => (
                          <div key={i} className="text-center group cursor-pointer border-t border-white/20 pt-6 hover:border-primary transition-colors duration-500">
                            <h4 className="text-xl text-white font-serif group-hover:text-primary-light transition-colors">{specialty}</h4>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        </section>

      {/* 2. MD Message Section */}
      <section className="relative py-12 lg:py-16 px-6 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left: Text */}
            <FadeIn direction="right" className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-4">
                <div className="w-12 h-px bg-primary"></div>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Message from the Managing Director</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-forest leading-tight font-serif">
                At JMS Medical, your health is our highest priority.
              </h2>
              <div className="space-y-4 text-gray-500 font-light leading-relaxed text-lg">
                <p>
                  Our hospital was founded with a clear mission — to provide personalized, ethical, and quality-driven care that empowers you on your journey to better health. We are committed to constant improvement and uphold the highest standards of patient confidentiality and professionalism.
                </p>
                <p>
                  With a patient-first approach and a team dedicated to excellence, JMS Medical is here to support you every step of the way.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 font-bold text-sm mb-1 uppercase tracking-widest">Warm regards,</p>
                  <p className="text-forest font-bold text-xl font-serif">Dr. Managing Director (MD, FASMB)</p>
                  <p className="text-gray-400 text-sm mt-1">Managing Director, JMS Medical Hospitals</p>
                </div>
                <button className="hidden sm:flex bg-white border border-gray-200 hover:border-primary text-forest hover:text-primary px-8 py-3 rounded-full font-bold transition transform hover:-translate-y-1 shadow-sm">
                  Read Full Message
                </button>
              </div>
            </FadeIn>

            {/* Right: Image */}
            <FadeIn delay={0.4} direction="left" className="lg:col-span-5 relative">
              <div className="relative p-2 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 max-w-md mx-auto">
                <div className="aspect-square sm:aspect-[4/3] lg:aspect-square max-h-[400px] rounded-[2rem] overflow-hidden relative">
                  <Image 
                    src="/images/hero_doctor.png" 
                    alt="Managing Director" 
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top" 
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-forest font-bold text-xl">15+ Years</p>
                    <p className="text-gray-500 font-light text-sm">Medical Excellence</p>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 3. The JMS Difference */}
      <section className="relative py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto w-full text-center space-y-10">
          <div className="inline-block border border-primary text-primary px-8 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
            Experience the JMS Difference
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-forest font-serif">
            Redefining Healthcare with <span className="text-primary italic font-light">Precision and Comfort</span>
          </h2>
          <div className="space-y-6 text-gray-500 font-light leading-relaxed text-lg text-justify md:text-center">
            <p>
              JMS Medical Hospitals introduces a new era in Indian healthcare — blending luxury hospitality with advanced medical excellence. Located in the upscale Jubilee Hills, our facility replaces the traditional hospital atmosphere with world-class ambience, patient-first service, and cutting-edge infrastructure.
            </p>
            <p>
              Our approach is built on the concept of Personalized Medicine, where every service is designed for comfort, timely care, and clinical effectiveness. Backed by a team of highly experienced consultants with training from global institutions, we offer trusted expertise across every specialty.
            </p>
            <p>
              Our facilities are equipped with the latest technologies and minimally invasive solutions for faster recovery and better results. Recognized as an accredited Center of Excellence, JMS Medical is led by renowned surgeons. Under our leadership, we've helped hundreds of patients achieve significant health improvements along with reversal of lifestyle diseases.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Google Reviews */}
      <section className="relative py-20 lg:py-24 bg-gray-50/50 overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto w-full px-6 mb-16 text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary"></div>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Patient Testimonials</span>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-forest font-serif leading-tight max-w-3xl mx-auto">
            Trusted by Thousands of <span className="text-primary italic font-light">Happy Patients</span>
          </h2>
          <p className="text-gray-500 font-light mt-6 max-w-2xl mx-auto text-lg">
            Read real reviews and inspiring stories from those who transformed their lives with us.
          </p>
        </div>

        <div className="relative overflow-hidden flex gap-6 group w-full max-w-[100vw]">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-100% - 1.5rem)); }
            }
            .animate-marquee {
              animation: marquee 40s linear infinite;
            }
            .group:hover .animate-marquee {
              animation-play-state: paused;
            }
          `}</style>
          
          {/* Fade gradients for smooth entry/exit */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

          {/* Marquee Track 1 */}
          <div className="flex animate-marquee gap-6 w-max shrink-0 px-3">
            {reviews.map((review, i) => (
              <div key={i} className="w-[380px] bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-xl font-serif">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-forest text-base">{review.name}</p>
                      <p className="text-gray-400 text-xs">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 text-sm">
                    {"★".repeat(review.rating)}
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 line-clamp-4">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 border-t border-gray-50 pt-4">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Posted on Google
                </div>
              </div>
            ))}
          </div>

          {/* Marquee Track 2 (Duplicate for infinite loop) */}
          <div aria-hidden="true" className="flex animate-marquee gap-6 w-max shrink-0 px-3">
            {reviews.map((review, i) => (
              <div key={i} className="w-[380px] bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-xl font-serif">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-forest text-base">{review.name}</p>
                      <p className="text-gray-400 text-xs">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 text-sm">
                    {"★".repeat(review.rating)}
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 line-clamp-4">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 border-t border-gray-50 pt-4">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Posted on Google
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center relative z-20">
          <Button className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-primary/30 transition transform hover:-translate-y-1 text-lg">
            Review Us On Google
          </Button>
        </div>
      </section>

      {/* 5. Gallery Section */}
      <section className="relative py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4 font-serif">
            Our Team Work - A Glimpse into <span className="text-primary italic font-light">the Excellence Behind Our Care</span>
          </h2>
          <p className="text-gray-500 font-light mb-12">
            Explore our gallery to see the professionals who make JMS Medical Hospitals a trusted name in healthcare.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((img, i) => (
              <FadeIn key={i} delay={i * 0.15} direction="up" className="relative w-full aspect-[4/3] perspective-1000 mx-auto">
                {/* 3D Container */}
                <div className="relative w-full h-full rounded-[2rem] bg-white p-3 shadow-[10px_10px_30px_#d1d5db,-10px_-10px_30px_#ffffff] transform hover:rotate-y-2 hover:rotate-x-2 hover:-translate-y-2 transition-all duration-700 ease-out border border-gray-100 group cursor-pointer">
                  
                  {/* Inner Groove (Inset Shadow) */}
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.15)] relative bg-gray-50 flex items-center justify-center">
                    <Image 
                      src={img} 
                      alt={`Gallery ${i}`} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transform scale-[1.02] group-hover:scale-110 transition-transform duration-1000"
                    />
                    
                    {/* Subtle glare effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
