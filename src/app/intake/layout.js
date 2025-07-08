'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function IntakeLayout({ children }) {
  const path = usePathname();
  const isShop = path?.endsWith('/create-shop');
  const isProduct = path?.endsWith('/create-product');

  return (
<div className="relative min-h-[85vh]">
      <div className="intake-background row-span-full"></div>
      <div className="flex items-start content-on-hero">
    <div className="w-[600px] mx-4 mt-8 rounded-xl shadow-lg overflow-hidden" style={{height: "650px"}}>
    {/* <nav className='tabs-bar border-b border-[#ECECEC] px-4 pt-4'> */}
    <nav className="tabs-bar relative px-4 pt-4 h-[52px]">

      

        {[
          { label: 'Shop', href: '/intake/create-shop', active: isShop },
          { label: 'Product', href: '/intake/create-product', active: isProduct }
        ]
        .map(tab => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`w-[100px] px-6 text-sm font-medium transition-all ${
              tab.active
              ? 'flex items-center justify-center bg-white border border-b-0 py-3 border-[#ECECEC] text-blue-600 rounded-t-xl z-10 '
              : 'flex items-center justify-center bg-[#FAFAFA] text-gray-400 py-2 hover:bg-[#F0F0F0] hover:text-blue-500 rounded-t-md'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 bg-white rounded-t-md" style={{height: "600px"}}>
      {/* <div className='content-box'> */}
        {children}
      </div>
    </div>
    </div>
    </div>
  );
}
