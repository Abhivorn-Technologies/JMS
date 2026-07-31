import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/UI/Button';
import { FadeIn } from '@/components/UI/FadeIn';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-background lg:min-h-[85vh] flex lg:items-center overflow-hidden pt-12 lg:pt-20 pb-12 lg:pb-16">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary-light/40 to-transparent rounded-bl-[100px] -z-10"></div>
        <div className="absolute -left-20 top-20 w-64 h-64 bg-hospital/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute right-20 bottom-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>

        <div className="relative w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-center mt-4 lg:mt-0">
          
          {/* Left Text Area */}
          <div className="lg:col-span-5 space-y-6 z-10">
            <FadeIn delay={0.1} direction="up">
              <div className="inline-block px-4 py-2 bg-primary-light/50 text-primary font-bold text-sm rounded-full tracking-wider uppercase mb-2">
                Next-Gen Medical Tech
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3} direction="up">
              <h1 className="font-serif leading-tight">
                <span className="text-primary text-5xl md:text-6xl lg:text-7xl font-bold block mb-3">Precision</span>
                <span className="text-forest text-4xl md:text-5xl lg:text-5xl font-normal block">in Every Detail</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.5} direction="up">
              <p className="text-lg text-gray-500 font-sans max-w-lg leading-relaxed">
                Equip your facility with world-class surgical microscopes and endoscopy systems. Engineering the future of healthcare.
              </p>
            </FadeIn>

            <FadeIn delay={0.7} direction="up">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link href="/products">
                  <Button className="bg-primary text-white hover:bg-primary-dark px-10 py-4 rounded-full text-lg shadow-xl shadow-primary/30 transition transform hover:-translate-y-1 w-full sm:w-auto">
                    Explore Equipment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" className="px-10 py-4 rounded-full text-lg shadow-xl shadow-hospital/30 transition transform hover:-translate-y-1 w-full sm:w-auto">
                    Request a Demo
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
          
          {/* Right Image Area (3D Groove & Floating) */}
          <div className="lg:col-span-7 relative z-10 mt-12 lg:mt-0">
            <FadeIn delay={0.4} direction="left">
              <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto perspective-1000">
                {/* 3D Container */}
                <div className="relative w-full h-full rounded-[2.5rem] bg-white p-4 shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff] transform hover:rotate-y-2 hover:rotate-x-2 transition-transform duration-700 ease-out border border-gray-100 group">
                  
                  {/* Inner Groove (Inset Shadow) */}
                  <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.1)] relative">
                    <Image 
                      src="/images/surgical_microscope.png" 
                      alt="Advanced Surgical Microscope" 
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
                    />
                    
                    {/* Subtle glare effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* Featured Equipment Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn delay={0.2} direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-forest mb-4">State-of-the-Art Medical Equipment</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Explore our premium range of clinical and surgical equipment designed for the most demanding healthcare environments.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <FadeIn delay={0.4} direction="up">
              <div className="group rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50 flex flex-col h-full">
                <div className="h-80 overflow-hidden relative">
                  <Image 
                    src="/images/surgical_microscope.png" 
                    alt="Surgical Microscope" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform group-hover:scale-105 transition duration-500" 
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-forest mb-3 font-serif">Advanced Surgical Microscopes</h3>
                  <p className="text-gray-600 mb-6">High-precision optics for neurosurgery, ENT, and ophthalmology, ensuring crystal-clear visualization.</p>

                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.6} direction="up">
              <div className="group rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50 flex flex-col h-full">
                <div className="h-80 overflow-hidden relative">
                  <Image 
                    src="/images/endoscopy_system.png" 
                    alt="Endoscopy System" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform group-hover:scale-105 transition duration-500" 
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-forest mb-3 font-serif">HD Endoscopy Systems</h3>
                  <p className="text-gray-600 mb-6">Complete clinical solutions including monitors, camera consoles, and microdebriders for minimally invasive procedures.</p>

                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn direction="up">
            <h2 className="text-4xl font-bold text-forest mb-12">Why Choose JMS Medical?</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Quality Assurance', desc: 'All products meet strict international healthcare standards.' },
              { title: 'Global Delivery', desc: 'Fast and secure shipping to healthcare facilities worldwide.' },
              { title: '24/7 Support', desc: 'Dedicated support team for technical assistance and inquiries.' },
            ].map((feature, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.2)} direction="up">
                <div className="p-8 rounded-2xl bg-background border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 h-full">
                  <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <span className="text-forest text-2xl font-bold">{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-forest mb-3">{feature.title}</h3>
                  <p className="text-gray-text">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 relative bg-white flex justify-center items-center">
        
        {/* The Card (60% width on large screens) */}
        <div className="w-full lg:w-[60%] max-w-4xl relative z-10 rounded-[2.5rem] p-10 md:p-12 text-center overflow-hidden border border-white/10 bg-[#0a192f] shadow-2xl">
          {/* Abstract Glowing Orbs inside the card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-50">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/40 rounded-full blur-[80px] mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/30 rounded-full blur-[80px] mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
          <div className="relative flex flex-col items-center">
            
            <FadeIn delay={0.1} direction="up">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight tracking-tight">
                Ready to Upgrade Your <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Medical Infrastructure?</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.3} direction="up">
              <p className="text-sm md:text-base text-gray-400 max-w-xl mb-8 font-light leading-relaxed">
                Join thousands of leading healthcare providers worldwide who trust <span className="font-bold text-white">JMS Medical</span>.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.5} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Link href="/contact" className="group w-full sm:w-auto">
                <div className="relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 bg-primary rounded-full shadow-[0_0_20px_rgba(0,137,123,0.5)] hover:shadow-[0_0_30px_rgba(0,137,123,0.7)] hover:-translate-y-1">
                  <span className="flex items-center gap-2">
                    Contact Sales
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                </div>
              </Link>
              <Link href="/products" className="group w-full sm:w-auto">
                <div className="relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 hover:-translate-y-1">
                  View Catalog
                </div>
              </Link>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
