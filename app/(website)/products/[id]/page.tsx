import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';
import { Button } from '@/components/UI/Button';

export const dynamic = 'force-dynamic';

export default async function ProductDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  let product: any = null;
  let relatedProducts: any[] = [];

  try {
    await dbConnect();
    product = await Product.findById(params.id).lean();
    if (product) {
      relatedProducts = await Product.find({ _id: { $ne: product._id } })
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();
    }
  } catch (e) {
    console.error("Database connection or fetch failed, using mock data for UI preview", e);
  }

  // Fallback Mock Data
  if (!product) {
    const allMockProducts = [
      {
        _id: 'mock1',
        name: 'Labomed Prima Surgical Microscope',
        category: 'Surgical',
        description: 'High-precision surgical microscope designed for detailed ENT and neurosurgical procedures. Features brilliant optics, ergonomic handling, and a highly flexible suspension system. The modular design allows for easy integration of high-definition video systems and assistant viewing accessories.',
        price: 15400.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.34 AM (1).jpeg',
        badge: 'Bestseller',
        features: ['Apochromatic Optics', 'LED Illumination', 'Modular Design']
      },
      {
        _id: 'mock2',
        name: 'AMT-SPIN X PRO Endoscopy System',
        category: 'Endoscopy',
        description: 'Advanced medical endoscopy system with crystal clear HD monitor and microdebrider console for precise surgical interventions. Equipped with the latest image enhancement technology to provide unparalleled visibility in the most challenging anatomical spaces.',
        price: 24500.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.34 AM (2).jpeg',
        badge: 'New Arrival',
        features: ['4K Ultra HD Resolution', 'Integrated Recording', 'Ergonomic Interface']
      },
      {
        _id: 'mock3',
        name: 'COAGLATOR II Electrosurgical Unit',
        category: 'Surgical',
        description: 'Reliable and robust electrosurgical generator offering monopolar and bipolar modes for precise cutting and coagulation.',
        price: 4200.00,
        photo: '/images/WhatsApp Image 2026-07-29 at 10.46.34 AM.jpeg',
        features: ['Dual Output', 'Auto-Stop Technology']
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

    product = allMockProducts.find(p => p._id === params.id);
    if (!product) {
      notFound();
    }
    
    relatedProducts = allMockProducts.filter(p => p._id !== params.id).slice(0, 3);
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* 1. Stunning Hero for Product */}
      <section className="relative pt-32 pb-24 px-6 bg-[#0a192f] overflow-hidden text-center">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-10 right-10 w-96 h-96 bg-primary/30 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <Link href="/products" className="group inline-flex items-center space-x-2 text-primary hover:text-white transition-colors duration-300 mb-8 font-medium">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            <span>Back to Products</span>
          </Link>
          <div className="inline-block px-4 py-1.5 bg-primary/20 border border-primary/30 text-primary font-bold text-xs rounded-full tracking-widest uppercase mb-6">
            {product.category || 'Medical Equipment'}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight max-w-4xl">
            {product.name}
          </h1>
        </div>
      </section>

      {/* 2. Main Product Display */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-16">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Section */}
            <div className="h-[400px] lg:h-[600px] bg-white relative p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>
              {product.badge && (
                <div className="absolute top-8 left-8 bg-blue-600 text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg z-10 tracking-widest uppercase">
                  {product.badge}
                </div>
              )}
              {product.photo ? (
                <img src={product.photo} alt={product.name} className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-xl" />
              ) : (
                <div className="w-32 h-32 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm uppercase tracking-widest font-bold">No Image</span>
                </div>
              )}
            </div>
            
            {/* Details Section */}
            <div className="p-10 lg:p-16 flex flex-col justify-center bg-gray-50/50">
              <div className="mb-8">
                <p className="text-sm text-gray-500 font-medium mb-2 uppercase tracking-wide">Investment Value</p>
                <div className="text-4xl lg:text-5xl font-bold text-forest">₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              
              <h3 className="text-xl font-bold text-forest mb-4 font-serif">Product Overview</h3>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">{product.description}</p>
              
              {product.features && (
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-forest mb-4 font-serif">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-primary mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg font-bold rounded-full shadow-xl shadow-primary/20 transition-transform transform hover:-translate-y-1">
                    Request a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-serif font-bold text-forest">You May Also Like</h2>
              <Link href="/products" className="text-primary hover:text-primary-dark font-bold hover:underline transition-colors hidden sm:block">View all products</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p: any) => (
                <Link href={`/products/${p._id.toString()}`} key={p._id.toString()} className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1">
                  <div className="h-48 bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100 relative overflow-hidden">
                    {p.photo ? (
                      <img src={p.photo} alt={p.name} className="max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">No Img</span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">{p.category || 'Equipment'}</p>
                    <h4 className="text-lg font-bold text-forest line-clamp-1 mb-2 group-hover:text-primary transition-colors">{p.name}</h4>
                    <div className="text-forest font-bold">₹{p.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
