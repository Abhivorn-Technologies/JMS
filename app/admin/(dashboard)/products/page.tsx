"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineSearch } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products?search=${search}&page=${page}&limit=10`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search]); // Simple debouncing could be added here

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Product deleted successfully');
        fetchProducts(); // Refresh list
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to delete product');
      }
    } catch (error) {
      toast.error('An error occurred while deleting');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-forest">Product Management</h2>
        <Link href="/admin/products/add">
          <Button>+ Add New Product</Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Created At</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No products found.</td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center shrink-0">
                          {product.photo ? (
                            <img src={product.photo} alt={product.name} className="max-h-full object-contain p-1" />
                          ) : (
                            <span className="text-[10px] text-gray-400">No Img</span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-forest line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-400 line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-forest font-medium">${product.price.toFixed(2)}</td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/admin/products/edit/${product._id}`}>
                          <button className="p-2 text-gray-400 hover:text-primary bg-white rounded-lg border border-gray-100 shadow-sm transition">
                            <HiOutlinePencil size={18} />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-gray-400 hover:text-red-500 bg-white rounded-lg border border-gray-100 shadow-sm transition"
                        >
                          <HiOutlineTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
            <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="text-sm px-3 py-1"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                className="text-sm px-3 py-1"
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
