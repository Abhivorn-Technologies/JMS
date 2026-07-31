export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      {/* Cool Pulsing Circle Animation */}
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#3B58E7] rounded-full border-t-transparent animate-spin"></div>
        <div className="w-8 h-8 bg-[#3B58E7]/10 rounded-full animate-pulse"></div>
      </div>

      {/* Bouncing Text Animation */}
      <div className="flex items-end space-x-1 font-bold text-gray-400 tracking-widest uppercase text-sm">
        <span>Loading Data</span>
        <div className="flex space-x-1 mb-0.5 ml-1">
          <span className="w-1.5 h-1.5 bg-[#3B58E7] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-1.5 h-1.5 bg-[#3B58E7] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-1.5 h-1.5 bg-[#3B58E7] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
}
