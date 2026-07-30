"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import toast from 'react-hot-toast';

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    photo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (formData.name.length < 3) return toast.error('Name must be at least 3 characters');
      if (Number(formData.price) < 0) return toast.error('Price cannot be negative');

      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Product added successfully');
        router.push('/admin/products');
        router.refresh();
      } else {
        toast.error(data.message || 'Failed to add product');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/products" className="text-primary hover:underline text-sm font-medium">
          ← Back to Products
        </Link>
        <h2 className="text-2xl font-bold text-forest mt-2">Add New Product</h2>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-forest mb-2">Product Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="name"
              required
              minLength={3}
              maxLength={150}
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" 
              placeholder="e.g., Advanced MRI Machine" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-forest mb-2">Description <span className="text-red-500">*</span></label>
            <textarea 
              name="description"
              required
              maxLength={5000}
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" 
              placeholder="Product details and specifications..." 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Price ($) <span className="text-red-500">*</span></label>
              <input 
                type="number" 
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" 
                placeholder="0.00" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Photo URL</label>
              <input 
                type="url" 
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" 
                placeholder="https://example.com/image.jpg" 
              />
              <p className="text-xs text-gray-400 mt-1">For MVP, provide an image URL.</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-4">
            <Link href="/admin/products">
              <Button type="button" variant="ghost" className="px-6 py-3">Cancel</Button>
            </Link>
            <Button type="submit" isLoading={isLoading} className="px-8 py-3 shadow-lg">Save Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
