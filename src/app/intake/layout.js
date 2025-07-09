'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from '../../components/footer';

export default function IntakeLayout({ children }) {
  const path = usePathname();
  const isShop = path?.endsWith('/create-shop');
  const isProduct = path?.endsWith('/create-product');

  return (
<div className="relative min-h-[88vh] overflow-hidden"> 
<img
    src="/intakebackground.png"
    alt="Background"
    className="absolute inset-0 w-full h-[85vh] object-cover z-0"
    fetchPriority="high"
  />
    <div className="relative z-10 flex items-start">
    <div
      className="w-[600px] mx-4 mt-8 rounded-xl shadow-lg overflow-auto bg-white"
      style={{ height: '650px' }}
    >
      <nav className="tabs-bar relative px-4 pt-4 h-[52px]">
      {/* <div className="intake-background row-span-full"></div>
      <div className="flex items-start content-on-hero">
    <div className="w-[600px] mx-4 mt-8 rounded-xl shadow-lg overflow-auto bg-white" style={{height: "650px"}}>
    <nav className="tabs-bar relative px-4 pt-4 h-[52px]">  */}
        {[
          { label: 'Product', href: '/intake/create-product', active: isProduct },
          { label: 'Shop', href: '/intake/create-shop', active: isShop },
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
    <Footer></Footer>
    </div>
  );
}
