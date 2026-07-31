import { HiOutlineCube, HiOutlineUserGroup, HiOutlineCurrencyRupee, HiOutlineArrowRight, HiOutlineExternalLink, HiOutlinePlus } from 'react-icons/hi';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  await dbConnect();
  
  const totalProducts = await Product.countDocuments();
  const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(4).lean();

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-3xl font-black text-[#0f172a] tracking-tight">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Here is the latest summary of your hospital equipment inventory.</p>
        </div>
        <Link href="/admin/products/add">
          <button className="flex items-center space-x-2 bg-[#3B58E7] hover:bg-[#2B44C1] text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-[0_4px_14px_0_rgba(59,88,231,0.39)] text-sm">
            <HiOutlinePlus size={18} />
            <span>Add New Product</span>
          </button>
        </Link>
      </div>

      {/* Stats Cards - Classic Corporate Styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/60 flex flex-col justify-between relative overflow-hidden group hover:border-[#3B58E7]/30 transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#3B58E7]"></div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Inventory</p>
            <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#3B58E7]/10 group-hover:text-[#3B58E7] transition-colors">
              <HiOutlineCube size={20} />
            </div>
          </div>
          <div className="flex items-end space-x-3">
            <h3 className="text-4xl font-black text-[#0f172a] tracking-tight">{totalProducts}</h3>
            <span className="text-sm font-bold text-gray-400 mb-1">Products</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/60 flex flex-col justify-between relative overflow-hidden group hover:border-[#3B58E7]/30 transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#3B58E7]"></div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Users</p>
            <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#3B58E7]/10 group-hover:text-[#3B58E7] transition-colors">
              <HiOutlineUserGroup size={20} />
            </div>
          </div>
          <div className="flex items-end space-x-3">
            <h3 className="text-4xl font-black text-[#0f172a] tracking-tight">1,248</h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 mb-1">+12%</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/60 flex flex-col justify-between relative overflow-hidden group hover:border-[#3B58E7]/30 transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#3B58E7]"></div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Revenue</p>
            <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#3B58E7]/10 group-hover:text-[#3B58E7] transition-colors">
              <HiOutlineCurrencyRupee size={20} />
            </div>
          </div>
          <div className="flex items-end space-x-3">
            <h3 className="text-4xl font-black text-[#0f172a] tracking-tight">₹42.5k</h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 mb-1">+8.5%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Products + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Products List - Sleek Table Look */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden">
          <div className="flex justify-between items-center p-4 sm:px-6 sm:py-5 border-b border-gray-100 bg-gray-50/30 gap-2">
            <h3 className="text-[12px] sm:text-sm font-bold text-gray-500 uppercase tracking-wider leading-tight">Recently Added Products</h3>
            <Link href="/admin/products" className="flex items-center text-[11px] sm:text-xs font-bold text-[#3B58E7] hover:text-[#2B44C1] transition-colors uppercase tracking-wider whitespace-nowrap shrink-0">
              View All <HiOutlineArrowRight className="ml-1 w-3 h-3" />
            </Link>
          </div>
          
          <div className="divide-y divide-gray-100">
            {(recentProducts.length > 0 ? recentProducts : []).map((p: any) => (
              <div key={p._id.toString()} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 hover:bg-gray-50/50 transition-colors group gap-3 sm:gap-0">
                <div className="flex items-start sm:items-center space-x-3 sm:space-x-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-white rounded flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden p-1">
                    {p.photo ? (
                      <img src={p.photo} alt={p.name} className="w-full h-full object-contain" />
                    ) : (
                      <HiOutlineCube className="text-gray-300 w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-[#0f172a] text-base group-hover:text-[#3B58E7] transition-colors truncate pr-2">{p.name}</h4>
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-1 sm:mt-1.5">
                      <span className="text-[10px] sm:text-xs font-bold text-gray-500 tracking-wide uppercase truncate max-w-[80px] sm:max-w-none">{p.category || 'Equipment'}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full shrink-0"></span>
                      <span className="text-[10px] sm:text-xs font-bold text-[#3B58E7]">Active</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-gray-100/80 pt-3 sm:pt-0 mt-2 sm:mt-0">
                  <p className="text-[13px] sm:text-sm font-black text-[#0f172a]">₹{p.price?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}</p>
                  <Link href={`/admin/products/edit/${p._id}`} className="text-xs font-bold text-[#3B58E7] bg-[#3B58E7]/10 sm:bg-transparent px-3 py-1 sm:px-0 sm:py-0 rounded sm:rounded-none sm:text-gray-400 hover:text-[#3B58E7] sm:mt-1.5 transition-colors">
                    Edit Details
                  </Link>
                </div>
              </div>
            ))}
            
            {recentProducts.length === 0 && (
              <div className="p-8 text-center text-gray-500 font-medium text-sm">
                No recent products found in the database.
              </div>
            )}
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#5370f5] via-[#3B58E7] to-[#253da8] rounded-xl shadow-lg overflow-hidden relative text-white">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="150" cy="50" r="100" stroke="white" strokeWidth="20"/>
                <circle cx="150" cy="50" r="140" stroke="white" strokeWidth="20"/>
              </svg>
            </div>
            <div className="p-8 relative z-10">
              <h3 className="text-xl font-black mb-2">Live Storefront</h3>
              <p className="text-blue-100 text-sm mb-6 opacity-80 leading-relaxed">View your catalog exactly as your customers see it on the live website.</p>
              <Link href="/" target="_blank">
                <button className="bg-white text-[#3B58E7] hover:bg-gray-100 px-6 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center space-x-2">
                  <span>Visit Website</span>
                  <HiOutlineExternalLink className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6">
            <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-5">System Actions</h3>
            <div className="space-y-3">
              <Link href="/admin/products/add" className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-[#0f172a]/30 hover:bg-gray-50/50 transition-all group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gray-50 text-gray-400 group-hover:text-[#0f172a] flex items-center justify-center transition-colors">
                    <HiOutlinePlus size={16} />
                  </div>
                  <span className="text-sm font-bold text-[#0f172a] group-hover:text-[#0f172a] transition-colors">Add New Equipment</span>
                </div>
                <HiOutlineArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0f172a] transition-colors" />
              </Link>
              
              <Link href="/admin/products" className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-[#0f172a]/30 hover:bg-gray-50/50 transition-all group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gray-50 text-gray-400 group-hover:text-[#0f172a] flex items-center justify-center transition-colors">
                    <HiOutlineCube size={16} />
                  </div>
                  <span className="text-sm font-bold text-[#0f172a] group-hover:text-[#0f172a] transition-colors">Manage Inventory</span>
                </div>
                <HiOutlineArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0f172a] transition-colors" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
