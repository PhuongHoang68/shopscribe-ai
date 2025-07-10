"use client"
import { useState, useEffect } from 'react';
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs';
import Link from 'next/link';
  
export default function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
    return (
        // <div style={{padding: "0 10px 0 10px", marginBottom: "6px"}}className="flex justify-end items-center gap-4 h-16">
        
        <div style={{ 
          textShadow: '5px 7px 9px #a0a0a06e', fontWeight: "900"}} className="mt-2 header text-2xl font-black tracking-tight text-gray-900 font-[var(--font-geist-sans)]">
            <Link href="/">ShopScribe-AI</Link>
            <div>
        <SignedOut>
          <SignUpButton className="sign-up px-5 py-2.5 text-sm font-semibold text-gray-900 bg-white border border-blue-600 rounded-full shadow-md hover:shadow-lg transition" style={{fontWeight: "bold"}}fallbackRedirectUrl="/shop"/>
          <SignInButton className="sign-in px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition" style={{fontWeight: "bold"}} fallbackRedirectUrl="/shop"/>
        </SignedOut>
        <SignedIn>
          {isClient && <UserButton />}
        </SignedIn>
        </div>
        </div>
    )
}