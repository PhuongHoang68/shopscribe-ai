'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function IntakeLayout({ children }) {
  const path = usePathname();
  const isShop = path?.endsWith('/create-shop');
  const isProduct = path?.endsWith('/create-product');

  return (
    // <div className="mx-auto mt-8 border rounded-lg shadow-lg">
<div className="relative min-h-[85vh]">
      <div className="intake-background row-span-full"></div>

      {/* <nav className="flex border-b content-on-hero pl-[6%] pt-[13%]"> */}
      <div className="flex items-start content-on-hero">
    <div className="w-[600px] mx-4 mt-8 mb-8 border rounded-lg shadow-lg bg-white" style={{height: "650px"}}>
      <nav className="flex border-b px-6 py-4">

        {[
          { label: 'Shop', href: '/intake/create-shop', active: isShop },
          { label: 'Product', href: '/intake/create-product', active: isProduct }
        ].map(tab => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 -mb-px font-medium ${
              tab.active
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="p-4" style={{height: "650px"}}>
        {children}
      </div>
    </div>
    </div>
    </div>
  );
}
