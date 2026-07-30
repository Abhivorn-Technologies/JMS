"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import toast from 'react-hot-toast';
import { use } from 'react';

export default function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    photo: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        
        if (res.ok) {
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price.toString(),
            photo: data.photo || ''
          });
        } else {
          toast.error('Product not found');
          router.push('/admin/products');
        }
      } catch (error) {
        toast.error('Failed to load product details');
      } finally {
        setIsFetching(false);
      }
    };
    
    fetchProduct();
  }, [params.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      const res = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Product updated successfully');
        router.push('/admin/products');
        router.refresh();
      } else {
        toast.error(data.message || 'Failed to update product');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="text-center py-20 text-gray-500">Loading product details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/products" className="text-primary hover:underline text-sm font-medium">
          ← Back to Products
        </Link>
        <h2 className="text-2xl font-bold text-forest mt-2">Edit Product</h2>
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
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-4">
            <Link href="/admin/products">
              <Button type="button" variant="ghost" className="px-6 py-3">Cancel</Button>
            </Link>
            <Button type="submit" isLoading={isLoading} className="px-8 py-3 shadow-lg">Update Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
