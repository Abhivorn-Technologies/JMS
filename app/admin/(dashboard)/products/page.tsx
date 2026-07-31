"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineSearch, HiOutlineCollection } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const categories = ['All', 'Surgical', 'Endoscopy', 'Imaging', 'Equipment'];
  const limit = 5;

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products?search=${search}&page=${page}&limit=${limit}&category=${category}`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.total);
      }
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category]);

  const executeDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Product deleted successfully');
        fetchProducts(); 
        setDeleteConfirmId(null);
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to delete product');
      }
    } catch (error) {
      toast.error('An error occurred while deleting');
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Title Area matching the image */}
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <HiOutlineCollection className="w-8 h-8 text-[#3B58E7]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#0f172a] tracking-tight">Product Management</h2>
            <p className="text-gray-500 text-sm mt-0.5">Browse and manage all medical equipment catalog and inventory.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Green active badge from image */}
          <div className="whitespace-nowrap bg-[#3B58E7]/10 text-[#3B58E7] border border-[#3B58E7]/20 px-3 sm:px-4 py-1.5 rounded-full text-[13px] sm:text-sm font-bold flex items-center shadow-sm">
            <span className="shrink-0 w-2 h-2 rounded-full bg-[#3B58E7] mr-1.5 sm:mr-2"></span>
            {totalProducts} Products Listed
          </div>
          <Link href="/admin/products/add" className="shrink-0">
            <button className="whitespace-nowrap flex items-center justify-center space-x-1.5 sm:space-x-2 bg-[#3B58E7] hover:bg-[#2B44C1] text-white px-4 sm:px-5 py-2 rounded-lg font-bold transition-all shadow-md text-[13px] sm:text-sm">
              <span className="text-lg leading-none shrink-0">+</span>
              <span>New Product</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Main Card Area matching the reference exactly */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 overflow-hidden mt-6">
        
        {/* Search & Filter Row */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
          <div className="relative w-full max-w-sm">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B58E7]/20 focus:border-[#3B58E7] transition-all text-sm text-gray-700 shadow-sm"
            />
          </div>
          
          <div className="w-full sm:w-auto">
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="w-full sm:w-48 py-2.5 px-4 rounded-full border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B58E7]/20 focus:border-[#3B58E7] shadow-sm appearance-none cursor-pointer font-medium custom-select custom-select-small"
            >
              <option value="All">All Categories</option>
              {categories.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Area (Desktop Only) & Mobile Cards */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-16 min-h-[40vh]">
              {/* Cool Pulsing Circle Animation */}
              <div className="relative flex items-center justify-center w-16 h-16 mb-6">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#3B58E7] rounded-full border-t-transparent animate-spin"></div>
                <div className="w-8 h-8 bg-[#3B58E7]/10 rounded-full animate-pulse"></div>
              </div>

              {/* Bouncing Text Animation */}
              <div className="flex items-end space-x-1 font-bold text-gray-400 tracking-widest uppercase text-sm">
                <span>Loading Records</span>
                <div className="flex space-x-1 mb-0.5 ml-1">
                  <span className="w-1.5 h-1.5 bg-[#3B58E7] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#3B58E7] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#3B58E7] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                        <HiOutlineSearch size={32} />
                      </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-1">No records found</h3>
                <p className="text-gray-500 text-sm">Adjust your search or category filter.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <table className="hidden md:table w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white text-[#0f172a] text-[11px] uppercase tracking-wider border-b border-gray-100 font-bold">
                    <th className="px-6 py-4">PRODUCT TITLE</th>
                    <th className="px-6 py-4">PRICE</th>
                    <th className="px-6 py-4">CATEGORY</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4 text-right">OPTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((product: any, index: number) => (
                  <tr key={product._id} className="bg-white hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-start space-x-4">
                        <span className="text-gray-400 text-sm mt-0.5 w-4 font-medium">{((page - 1) * limit) + index + 1}</span>
                        <div>
                          <p className="font-bold text-[#0f172a] text-sm">{product.name}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1 max-w-[250px]">page:{product.name.toLowerCase().replace(/ /g, '-')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-[#0f172a]">
                      ₹{product.price?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-600 font-medium">{product.category || 'None'}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border border-[#3B58E7]/30 text-[#3B58E7] bg-transparent">
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        Active
                      </span>
                    </td>

                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end space-x-2">
                          <Link href={`/admin/products/edit/${product._id}`}>
                            <button className="w-8 h-8 flex items-center justify-center text-[#3B58E7] bg-transparent rounded hover:bg-[#3B58E7]/10 transition-all border border-[#3B58E7]/30">
                              <HiOutlinePencil size={15} />
                            </button>
                          </Link>
                          <button 
                            onClick={() => setDeleteConfirmId(product._id)}
                            className="w-8 h-8 flex items-center justify-center text-[#ff003c] bg-transparent rounded hover:bg-[#ff003c]/10 transition-all border border-[#ff003c]/30"
                          >
                            <HiOutlineTrash size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Card View (Premium Professional UI) */}
              <div className="md:hidden flex flex-col divide-y divide-gray-100">
                {products.map((product: any) => (
                  <div key={product._id} className="p-5 hover:bg-gray-50 transition-colors flex flex-col">
                    <div className="flex items-start space-x-4 mb-4">
                      {/* Premium large thumbnail with blurred backdrop */}
                      <div className="w-24 h-24 shrink-0 rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden relative bg-gray-50/50">
                        {product.photo ? (
                          <>
                            <img src={product.photo} alt="" className="absolute inset-0 h-full w-full object-cover blur-md opacity-50 scale-110" />
                            <img src={product.photo} alt={product.name} className="relative h-full w-full object-contain p-1 z-10" />
                          </>
                        ) : (
                          <HiOutlineCube className="text-gray-300 w-8 h-8" />
                        )}
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#3B58E7]/10 text-[#3B58E7] mb-2 uppercase tracking-wider">
                          {product.category || 'Uncategorized'}
                        </span>
                        <h3 className="font-bold text-[#0f172a] text-[15px] leading-snug mb-1.5 line-clamp-2">
                          {product.name}
                        </h3>
                        <span className="font-black text-[#0f172a] text-lg block">
                          ₹{product.price?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <Link href={`/admin/products/edit/${product._id}`} className="w-full">
                        <button className="w-full flex items-center justify-center space-x-2 text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 py-2.5 rounded-xl transition-all border-2 border-gray-200 shadow-sm">
                          <HiOutlinePencil size={16} />
                          <span>Edit</span>
                        </button>
                      </Link>
                      <button 
                        onClick={() => setDeleteConfirmId(product._id)}
                        className="w-full flex items-center justify-center space-x-2 text-sm font-bold text-[#ff003c] bg-[#ff003c]/5 hover:bg-[#ff003c]/10 py-2.5 rounded-xl transition-all border-2 border-[#ff003c]/20 shadow-sm"
                      >
                        <HiOutlineTrash size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Exact Pagination Footer matching Image 4 */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center bg-white text-sm">
          <span className="text-gray-500 font-medium mb-4 sm:mb-0">
            Showing {totalProducts === 0 ? 0 : ((page - 1) * limit) + 1} to {Math.min(page * limit, totalProducts)} of {totalProducts} records ({limit} per page)
          </span>
          
          {totalPages > 1 && (
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#3B58E7] transition-colors disabled:opacity-50"
              >
                &lt;
              </button>
              
              {/* Simple array of pages for demo */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded text-sm font-bold transition-colors ${
                    page === p 
                    ? 'bg-[#3B58E7] text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
              
              {totalPages > 5 && (
                <>
                  <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
                  <button
                    onClick={() => setPage(totalPages)}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm font-bold transition-colors ${
                      page === totalPages 
                      ? 'bg-[#3B58E7] text-white' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#3B58E7] transition-colors disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 transform scale-100 transition-transform">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a]">Delete Product</h3>
            </div>
            
            <p className="text-center text-gray-500 text-sm mb-8 leading-relaxed">
              Are you sure you want to delete this product? This action cannot be undone and will remove it from the website permanently.
            </p>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-700 font-bold hover:bg-gray-50 transition-colors border-2 border-gray-100 text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => executeDelete(deleteConfirmId)}
                className="flex-1 px-4 py-3 rounded-xl bg-[#ff003c] text-white font-bold hover:bg-red-700 transition-colors shadow-sm text-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
