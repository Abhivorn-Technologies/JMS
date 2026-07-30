import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { Button } from '@/components/UI/Button';

export const dynamic = 'force-dynamic';

export default async function ProductsPage(props: {
  searchParams?: Promise<{ search?: string; page?: string; category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || '';
  const categoryParam = searchParams?.category || 'All';
  const page = parseInt(searchParams?.page || '1');
  const limit = 4; // Exactly 4 items per page
  let totalProducts = 0;
  let totalPages = 1;

  let products: any[] = [];
  try {
    await dbConnect();
    let query: any = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (categoryParam !== 'All') query.category = categoryParam;
    
    totalProducts = await Product.countDocuments(query);
    totalPages = Math.ceil(totalProducts / limit);
    products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit) // Traditional pagination
      .limit(limit)
      .lean();
  } catch (error) {
    console.error("Database connection failed, using mock data for UI preview", error);
  }

  // Mock Data Fallback
  if (products.length === 0) {
    const allMockProducts = [
      {
        _id: 'mock1',
        name: 'Labomed Prima Surgical Microscope',
        category: 'Surgical',
        description: 'High-precision surgical microscope designed for detailed ENT and neurosurgical procedures. Features brilliant optics and ergonomic handling.',
        price: 15400.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.34 AM.jpeg',
        badge: 'Bestseller'
      },
      {
        _id: 'mock2',
        name: 'AMT-SPIN X PRO Endoscopy System',
        category: 'Endoscopy',
        description: 'Advanced medical endoscopy system with crystal clear HD monitor and microdebrider console for precise surgical interventions.',
        price: 24500.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.34 AM (2).jpeg',
        badge: 'New Arrival'
      },
      {
        _id: 'mock3',
        name: 'COAGLATOR II Electrosurgical Unit',
        category: 'Surgical',
        description: 'Reliable and robust electrosurgical generator offering monopolar and bipolar modes for precise cutting and coagulation.',
        price: 4200.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.34 AM.jpeg'
      },
      {
        _id: 'mock4',
        name: 'VisionX 4K Surgical Monitor',
        category: 'Imaging',
        description: 'Ultra HD 4K medical grade monitor providing unparalleled color accuracy and depth perception for critical surgical environments.',
        price: 3200.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.35 AM (1).jpeg'
      },
      {
        _id: 'mock5',
        name: 'NeuroDrill Pro System',
        category: 'Surgical',
        description: 'High-speed pneumatic drill system designed for complex cranial and spinal procedures with minimal vibration.',
        price: 8900.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.35 AM (2).jpeg'
      },
      {
        _id: 'mock6',
        name: 'Lumina LED Surgical Light',
        category: 'Equipment',
        description: 'Shadowless operating room light with adjustable color temperature and superior tissue illumination.',
        price: 6500.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.35 AM (3).jpeg',
        badge: 'Top Rated'
      },
      {
        _id: 'mock7',
        name: 'GastroView Pro Endoscope',
        category: 'Endoscopy',
        description: 'High-definition flexible video gastroscope with enhanced imaging capabilities and an ultra-slim insertion tube.',
        price: 12800.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.35 AM.jpeg'
      },
      {
        _id: 'mock8',
        name: 'ClearScan Portable Ultrasound',
        category: 'Imaging',
        description: 'Compact, point-of-care ultrasound system offering exceptional image quality for rapid diagnostics anywhere in the facility.',
        price: 18500.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.36 AM (1).jpeg'
      },
      {
        _id: 'mock9',
        name: 'AeroVent ICU Ventilator',
        category: 'Equipment',
        description: 'Advanced intensive care ventilator with multiple breathing modes and real-time monitoring displays.',
        price: 21000.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.36 AM (2).jpeg'
      },
      {
        _id: 'mock10',
        name: 'BronchoFlex Digital Scope',
        category: 'Endoscopy',
        description: 'Single-use digital flexible bronchoscope eliminating cross-contamination risks while providing crisp airway visualization.',
        price: 350.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.36 AM (3).jpeg'
      },
      {
        _id: 'mock11',
        name: 'X-Ray Mobile C-Arm System',
        category: 'Imaging',
        description: 'Versatile mobile fluoroscopy system designed for orthopedic, pain management, and general surgical applications.',
        price: 45000.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.36 AM.jpeg',
        badge: 'Premium'
      },
      {
        _id: 'mock12',
        name: 'VitalSigns Monitor Pro',
        category: 'Equipment',
        description: 'Multi-parameter patient monitor featuring a touch screen interface, ECG, SpO2, NIBP, and temperature tracking.',
        price: 1250.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.39 AM.jpeg'
      }
    ];

    let filteredMock = allMockProducts;
    
    if (categoryParam !== 'All') {
      filteredMock = filteredMock.filter(p => p.category === categoryParam);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredMock = filteredMock.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.category.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
      
    totalPages = Math.ceil(filteredMock.length / limit);
    products = filteredMock.slice((page - 1) * limit, page * limit);
  }

  const categories = ['All', 'Surgical', 'Endoscopy', 'Imaging', 'Equipment'];

  // Determine active category for UI highlighting
  let activeCategoryUi = categoryParam;
  // If searching and all found products belong to the same category, highlight that category
  if (search && products.length > 0 && activeCategoryUi === 'All') {
    const firstCat = products[0].category;
    const allSameCat = products.every((p: any) => p.category === firstCat);
    if (allSameCat) {
      activeCategoryUi = firstCat;
    }
  }

  // Traditional Pagination Logic matching the design
  let pages: any[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (page <= 3) {
      pages = [1, 2, 3, '...', totalPages];
    } else if (page >= totalPages - 2) {
      pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, '...', page, '...', totalPages];
    }
  }

  const createUrl = (p: number) => `/products?page=${p}${search ? `&search=${search}` : ''}${categoryParam !== 'All' ? `&category=${categoryParam}` : ''}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 px-6 bg-[#0a192f] overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-10 right-10 w-96 h-96 bg-primary/30 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Medical Equipment <span className="text-primary">Catalog</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-10">
            Discover our comprehensive range of state-of-the-art medical equipment, designed for precision, reliability, and superior patient care.
          </p>
          
          {/* Integrated Search Bar in Hero */}
          <form action="/products" method="GET" className="w-full max-w-2xl relative group flex shadow-2xl rounded-full">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none z-10">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              name="search"
              defaultValue={search}
              placeholder="Search medical equipment..." 
              className="w-full pl-12 sm:pl-16 pr-28 sm:pr-32 py-4 sm:py-5 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600/30 transition-all font-medium text-base sm:text-lg text-ellipsis overflow-hidden whitespace-nowrap"
            />
            {categoryParam !== 'All' && <input type="hidden" name="category" value={categoryParam} />}
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full font-bold transition-colors shadow-md">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Horizontal Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategoryUi === cat;
            return (
              <Link 
                key={cat}
                href={`/products?category=${cat}`}
                scroll={false}
                className={`px-6 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 ${
                  isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 transform -translate-y-0.5' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* 3. Stunning Product Grid */}
        <div>
          {products.length === 0 ? (
            <div className="bg-white p-16 rounded-3xl border border-gray-100 text-center shadow-sm max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-forest mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-6">We couldn't find any equipment matching your current criteria.</p>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary-dark text-white rounded-full px-8 py-3">Clear Filters</Button>
              </Link>
            </div>
          ) : (
            <div className={`grid gap-8 mx-auto ${
              products.length === 1 ? 'grid-cols-1 max-w-sm' :
              products.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl' :
              products.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {products.map((product: any) => (
                <div key={product._id.toString()} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col transform hover:-translate-y-1 cursor-pointer">
                  
                  {/* Image Container with Colored Gradient */}
                  <div className="h-[220px] bg-gradient-to-br from-[#8a94b5] to-[#cbd4ed] relative p-6 flex items-center justify-center overflow-hidden">
                    
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4 bg-blue-600 shadow-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest z-10">
                        {product.badge}
                      </div>
                    )}
                    
                    {product.photo ? (
                      <img 
                        src={product.photo} 
                        alt={product.name} 
                        className="max-h-full object-contain group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 ease-out drop-shadow-xl mix-blend-multiply" 
                      />
                    ) : (
                      <div className="w-16 h-16 bg-white/30 border border-white/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white text-[10px] uppercase tracking-widest font-bold">No Img</span>
                      </div>
                    )}
                  </div>

                  {/* Content Area (Overlapping white card effect) */}
                  <div className="p-6 flex flex-col flex-grow relative bg-white rounded-t-2xl -mt-4 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    
                    {/* Styled Tags */}
                    <div className="flex gap-2 mb-3">
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border border-gray-200 text-gray-500 rounded">{product.category || 'Equipment'}</span>
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border border-gray-200 text-gray-500 rounded">CLINICAL</span>
                    </div>

                    <p className="text-gray-500 text-xs mb-5 line-clamp-2 leading-relaxed flex-grow font-medium">{product.description}</p>
                    
                    {/* Bottom Row: Price & Button */}
                    <div className="flex items-end justify-between mt-auto">
                      <div>
                         <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">PRICE</p>
                        <span className="text-xl font-black text-gray-900 tracking-tight">${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <Link href={`/products/${product._id.toString()}`}>
                        <Button className="bg-[#666f8e] hover:bg-[#4f5673] text-white px-5 py-2 rounded-lg font-bold shadow-sm transition-colors text-xs">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Traditional Pagination matching the design */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-16">
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <Link 
                  href={page > 1 ? createUrl(page - 1) : '#'} 
                  scroll={false}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl border-2 transition-all ${
                    page === 1 
                    ? 'border-gray-100 text-gray-300 pointer-events-none' 
                    : 'border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 bg-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </Link>

                {/* Page Numbers & Ellipses */}
                {pages.map((p, i) => {
                  if (p === '...') {
                    // Determine which page to jump to when dots are clicked
                    const prevNum = typeof pages[i - 1] === 'number' ? pages[i - 1] : 1;
                    const nextNum = typeof pages[i + 1] === 'number' ? pages[i + 1] : totalPages;
                    const targetPage = i > pages.length / 2 ? prevNum + 1 : nextNum - 1;
                    
                    return (
                      <Link 
                        key={`dots-${i}`}
                        href={createUrl(targetPage)}
                        scroll={false}
                        className="w-11 h-11 flex items-center justify-center text-gray-600 font-bold text-lg tracking-widest hover:text-blue-600 transition-colors cursor-pointer"
                        title={`Jump to page ${targetPage}`}
                      >
                        ...
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={p}
                      href={createUrl(p as number)}
                      scroll={false}
                      className={`w-11 h-11 flex items-center justify-center rounded-xl font-bold text-lg transition-all ${
                        page === p
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}

                {/* Next Button */}
                <Link 
                  href={page < totalPages ? createUrl(page + 1) : '#'} 
                  scroll={false}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl border-2 transition-all ${
                    page === totalPages 
                    ? 'border-gray-100 text-gray-300 pointer-events-none' 
                    : 'border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 bg-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
