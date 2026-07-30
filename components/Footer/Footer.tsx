'use client';

import Link from 'next/link';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#0a192f] text-white pt-16 pb-8 mt-auto relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-white/10 pb-12">
        
        {/* Column 1: Brand & Description (4 cols) */}
        <div className="md:col-span-12 lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-bold text-white text-2xl font-serif">
              JMS
            </div>
            <span className="text-2xl font-bold font-serif tracking-wide">JMS Medical</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed text-justify pr-4">
            James Medical Systems is a premier provider of top-quality medical equipment and advanced surgical solutions. We deal in all ENT products, including Microdebrider sinus shaver systems, Mastoid drills, Portable endoscopy Video Systems, and Full HD Camera Systems.
          </p>
        </div>

        {/* Column 2: Accreditations (2 cols) */}
        <div className="md:col-span-6 lg:col-span-3 space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Accreditations</h4>
          
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-3">
            <p className="text-primary text-[10px] font-bold uppercase mb-1 flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              NABH ACCREDITED
            </p>
            <p className="text-gray-300 text-xs">Hospital Reg No: 99482</p>
          </div>
          
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-3">
            <p className="text-primary text-[10px] font-bold uppercase mb-1 flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              CLINICAL LICENSE
            </p>
            <p className="text-gray-300 text-xs">Valid till: 12/2028</p>
          </div>
        </div>

        {/* Column 3: Quick Links & Services (3 cols) */}
        <div className="md:col-span-6 lg:col-span-2 space-y-6">
          <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/facilities" className="hover:text-primary transition-colors">Facilities</Link></li>
            <li><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
            <li><Link href="/admin/login" className="hover:text-primary transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact (3 cols) */}
        <div className="md:col-span-12 lg:col-span-3 space-y-6">
          <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <span className="leading-relaxed">#6-2-9/1, Flat No.202, 2nd Floor, Azam Towers, Lakadi-Ka-Pool, Hyderabad - 500 004, Telangana</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <span>+91 96668 20714 / 9398367411</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <span>jamesmedicalsystems@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>&copy; {new Date().getFullYear()} JMS Medical Hospital. All rights reserved.</p>
        <p>Developed by <a href="https://www.abhivorn.com/" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:text-white transition-colors duration-300">Abhivorn Technologies Pvt Ltd</a></p>
      </div>

      {/* Floating Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 w-12 h-12 bg-primary/90 hover:bg-primary text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 border border-primary/30 group"
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
      </button>
    </footer>
  );
};
