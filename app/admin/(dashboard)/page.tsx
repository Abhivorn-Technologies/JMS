import { HiOutlineCube, HiOutlineUserGroup, HiOutlineCurrencyDollar } from 'react-icons/hi';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  await dbConnect();
  
  const totalProducts = await Product.countDocuments();
  const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5).lean();

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-14 h-14 bg-primary-light/30 rounded-xl flex items-center justify-center text-primary">
            <HiOutlineCube size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Products</p>
            <h3 className="text-3xl font-bold text-forest">{totalProducts}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <HiOutlineUserGroup size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Users</p>
            <h3 className="text-3xl font-bold text-forest">1</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
            <HiOutlineCurrencyDollar size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Revenue</p>
            <h3 className="text-3xl font-bold text-forest">---</h3>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-forest">Recent Products</h3>
            <Link href="/admin/products" className="text-primary text-sm font-medium hover:underline">
              View All
            </Link>
          </div>
          
          {recentProducts.length === 0 ? (
            <p className="text-gray-500 py-4">No products found. Add some to get started.</p>
          ) : (
            <div className="space-y-4">
              {recentProducts.map((p: any) => (
                <div key={p._id.toString()} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                      {p.photo ? (
                        <img src={p.photo} alt={p.name} className="max-h-full object-contain p-1" />
                      ) : (
                        <span className="text-xs text-gray-400">Img</span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-forest line-clamp-1">{p.name}</p>
                      <p className="text-primary text-sm font-medium">${p.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <Link href={`/admin/products/edit/${p._id.toString()}`} className="text-gray-400 hover:text-primary transition">
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-forest mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <Link href="/admin/products/add" className="flex items-center p-4 bg-primary-light/20 hover:bg-primary-light/40 rounded-xl transition text-forest font-medium">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm text-primary">+</span>
              Add New Product
            </Link>
            <Link href="/" target="_blank" className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition text-forest font-medium">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm text-gray-500">🌍</span>
              View Live Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
