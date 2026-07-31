"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HiOutlineHome, HiOutlineCube, HiOutlineLogout, HiMenuAlt2 } from 'react-icons/hi';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: HiOutlineHome },
    { name: 'Products', path: '/admin/products', icon: HiOutlineCube },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <span className="text-2xl font-bold font-serif text-[#0f172a]">JMS Admin</span>
        </div>
        
        <nav className="p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = item.path === '/admin' 
              ? pathname === '/admin' 
              : pathname.startsWith(item.path);
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition font-medium ${
                  isActive ? 'bg-[#3B58E7]/10 text-[#3B58E7]' : 'text-gray-600 hover:bg-gray-50 hover:text-[#3B58E7]'
                }`}
              >
                <Icon size={22} className={isActive ? 'text-[#3B58E7]' : 'text-gray-400'} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button 
            onClick={() => setShowLogoutDialog(true)}
            className="flex items-center justify-between w-full px-4 py-3 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 transition-colors shadow-sm group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#3B58E7]/10 text-[#3B58E7] flex items-center justify-center font-bold text-lg">
                A
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#0f172a]">Admin User</p>
                <p className="text-xs text-gray-500">JMS Medical</p>
              </div>
            </div>
            <HiOutlineLogout size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-forest mr-4"
            >
              <HiMenuAlt2 size={24} />
            </button>
            <h1 className="text-xl font-bold text-forest hidden sm:block">
              {menuItems.find(i => pathname.startsWith(i.path))?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-forest font-bold">
              AD
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-forest">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 transform scale-100 transition-transform">
            <h3 className="text-lg font-bold text-center text-[#0a192f] mb-2">Confirm Logout</h3>
            <p className="text-center text-gray-500 text-sm mb-6">
              Are you sure you want to log out of the Admin Dashboard?
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 text-gray-600 font-bold hover:bg-gray-100 transition-colors border border-gray-200 text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-sm text-sm"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
