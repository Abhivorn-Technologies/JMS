import Link from 'next/link';
import { HiOutlineExclamationTriangle, HiOutlineHome } from 'react-icons/hi2';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-[32px] p-10 sm:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-lg w-full flex flex-col items-center text-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 text-2xl font-bold text-forest mb-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white font-serif shadow-lg text-sm sm:text-base">
            JMS
          </div>
          <span className="font-serif tracking-tight text-xl sm:text-3xl">Medical</span>
        </Link>

        {/* 404 Graphic */}
        <div className="flex items-center justify-center space-x-2 text-forest mb-6">
          <span className="text-[120px] font-black leading-none tracking-tighter">4</span>
          <HiOutlineExclamationTriangle className="w-24 h-24 stroke-[2.5px] mt-2" />
          <span className="text-[120px] font-black leading-none tracking-tighter">4</span>
        </div>

        {/* Text content */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10 max-w-sm">
          We couldn't find the page you were looking for. Please check the URL or return to the homepage.
        </p>

        {/* Return Button */}
        <Link href="/" className="w-full">
          <button className="w-full bg-[#0a2f24] hover:bg-[#07241b] text-white py-4 rounded-2xl flex items-center justify-center space-x-2 font-bold transition-all shadow-md">
            <HiOutlineHome className="w-5 h-5 stroke-2" />
            <span>Return to Homepage</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
