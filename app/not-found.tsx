import Link from 'next/link';
import { HiOutlineExclamationTriangle, HiOutlineHome } from 'react-icons/hi2';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-[32px] p-10 sm:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-lg w-full flex flex-col items-center text-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-6 hover:opacity-90 transition-opacity">
          <span className="font-serif tracking-tight text-3xl sm:text-4xl text-primary font-bold">JMS</span>
        </Link>

        {/* 404 Graphic */}
        <div className="flex items-center justify-center space-x-2 text-primary mb-6 drop-shadow-sm">
          <span className="text-[80px] sm:text-[90px] font-black leading-none tracking-tighter">4</span>
          <HiOutlineExclamationTriangle className="w-16 h-16 sm:w-20 sm:h-20 stroke-[2.5px] mt-1" />
          <span className="text-[80px] sm:text-[90px] font-black leading-none tracking-tighter">4</span>
        </div>

        {/* Text content */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10 max-w-sm">
          We couldn't find the page you were looking for. Please check the URL or return to the homepage.
        </p>

        {/* Return Button */}
        <Link href="/" className="w-full">
          <button className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl flex items-center justify-center space-x-2 font-bold transition-all shadow-lg shadow-primary/30 transform hover:-translate-y-1">
            <HiOutlineHome className="w-5 h-5 stroke-2" />
            <span>Return to Homepage</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
