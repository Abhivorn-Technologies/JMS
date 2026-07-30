export default function ProductsLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Section Skeleton */}
      <section className="relative pt-32 pb-24 px-6 bg-[#0a192f] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="h-12 w-3/4 md:w-1/2 bg-white/10 rounded-full animate-pulse mb-6"></div>
          <div className="h-6 w-5/6 md:w-2/3 bg-white/5 rounded-full animate-pulse mb-10"></div>
          
          <div className="w-full max-w-2xl relative h-16 rounded-full bg-white/10 animate-pulse"></div>
        </div>
      </section>

      {/* 2. Main Content Area Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Horizontal Category Tabs Skeleton */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-8 py-4 rounded-full bg-gray-200 animate-pulse w-24"></div>
          ))}
        </div>

        {/* 3. Product Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[400px]">
              {/* Image Skeleton */}
              <div className="h-[220px] bg-gray-200 animate-pulse w-full"></div>
              
              {/* Content Skeleton */}
              <div className="p-6 flex flex-col flex-grow bg-white rounded-t-2xl -mt-4 z-10">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-full bg-gray-100 rounded animate-pulse mb-auto"></div>
                
                <div className="flex items-end justify-between mt-4">
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
