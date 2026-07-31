"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiOutlineArrowLeft, HiOutlinePhotograph } from 'react-icons/hi';
import toast from 'react-hot-toast';

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/webp', 0.8);
        resolve(dataUrl);
      };
    };
  });
};

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Equipment',
    photo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    
    // Strict sanitization based on security rules
    if (name === 'name') {
      // Only allow English letters, international letters, spaces, hyphens, periods, apostrophes. No numbers or special symbols.
      value = value.replace(/[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s\-\.']/g, '');
      if (value.length > 100) value = value.substring(0, 100);
    } else if (name === 'description') {
      // Strip dangerous characters: < > & " % ` ~ ! @ # $ ^ * + = [ ] { } | \ / ? ; :
      value = value.replace(/[<>&"%`~!@#$^*+=\[\]{}|\\/?;:]/g, '');
      if (value.length > 2000) value = value.substring(0, 2000);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image must be less than 10MB');
        return;
      }
      try {
        const compressedBase64 = await compressImage(file);
        setFormData({ ...formData, photo: compressedBase64 });
      } catch (error) {
        toast.error('Failed to process image');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.name.length < 3) return toast.error('Name must be at least 3 characters');
      if (Number(formData.price) < 0) return toast.error('Price cannot be negative');
      if (!formData.photo) return toast.error('Please upload a product image');

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

  const inputClasses = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B58E7]/20 focus:border-[#3B58E7] transition-all text-sm text-[#0f172a] shadow-sm";
  const labelClasses = "block text-[13px] font-bold text-[#0f172a] mb-2 tracking-wide uppercase";

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-0">
      {/* Header */}
      <div className="mb-3">
        <Link href="/admin/products" className="inline-flex items-center text-[#3B58E7] hover:text-[#2B44C1] text-sm font-bold mb-3 transition-colors">
          <HiOutlineArrowLeft className="w-4 h-4 mr-2" strokeWidth={2} />
          Back to Catalog
        </Link>
        <h2 className="text-3xl font-black text-[#0f172a] tracking-tight">Add New Product</h2>
      </div>

      {/* Main Card (No redundant header, uncompressed spacing) */}
      <div className="bg-white rounded-2xl shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="px-4 sm:px-8 py-5 sm:py-6">
          <form id="product-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Text Inputs */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <label className={labelClasses}>Product Name <span className="text-[#ff003c]">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    minLength={2}
                    maxLength={100}
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses} 
                    placeholder="e.g., Advanced MRI Machine" 
                  />
                </div>

                <div>
                  <label className={labelClasses}>Description <span className="text-[#ff003c]">*</span></label>
                  <textarea 
                    name="description"
                    required
                    maxLength={2000}
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className={`${inputClasses} min-h-[100px] resize-y py-3`}
                    placeholder="Detailed specifications and product features..." 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Price (₹) <span className="text-[#ff003c]">*</span></label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input 
                        type="number" 
                        name="price"
                        required
                        min="0"
                        max="999999999"
                        step="any"
                        value={formData.price}
                        onChange={handleChange}
                        className={`${inputClasses} pl-9`} 
                        placeholder="0.00" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={labelClasses}>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none font-medium cursor-pointer custom-select`}
                    >
                      <option value="Surgical">Surgical</option>
                      <option value="Endoscopy">Endoscopy</option>
                      <option value="Imaging">Imaging</option>
                      <option value="Equipment">Equipment</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column: Image Upload */}
              <div className="lg:col-span-1">
                <label className={labelClasses}>Product Image <span className="text-[#ff003c]">*</span></label>
                <label htmlFor="file-upload" className="mt-2 w-full h-[calc(100%-28px)] min-h-[220px] flex flex-col justify-center items-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer relative group overflow-hidden bg-gray-50/30">
                  <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                  
                  {formData.photo ? (
                    <div className="absolute inset-0 w-full h-full bg-white z-10 p-2">
                      <div className="relative w-full h-full rounded-xl overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center bg-gray-100">
                        {/* Blurred background to fill dead space */}
                        <img src={formData.photo} alt="" className="absolute inset-0 h-full w-full object-cover blur-xl opacity-60 scale-110" />
                        
                        {/* Actual uncropped image */}
                        <img src={formData.photo} alt="Preview" className="relative h-full w-full object-contain z-10" />
                        
                        <div className="absolute inset-0 z-20 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                          <div className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                            <HiOutlinePhotograph size={20} className="text-[#3B58E7]" />
                            Replace Image
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="mx-auto w-16 h-16 bg-blue-100/50 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                        <HiOutlinePhotograph size={32} />
                      </div>
                      <div>
                        <span className="font-bold text-blue-600 text-lg block mb-1">Click to upload</span>
                        <span className="text-gray-500 text-sm font-medium">or drag and drop</span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>

            </div>
            
            <div className="pt-5 mt-5 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4">
              <Link href="/admin/products" className="w-full sm:w-auto">
                <button type="button" className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-all text-sm shadow-sm">
                  Cancel
                </button>
              </Link>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-tr from-[#3B58E7] to-[#253da8] hover:from-[#2B44C1] hover:to-[#1e328a] transition-all shadow-md hover:shadow-lg text-sm flex items-center justify-center min-w-[140px] disabled:opacity-70 whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  'Publish Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
