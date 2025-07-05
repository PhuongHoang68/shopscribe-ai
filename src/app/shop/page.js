// import Form from 'next/form'
// import { createShop } from './actions'
'use client'
import { useState, useTransition } from "react";
import { createShop } from "./actions";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

export default function Page() {
  const [result, setResult] = useState('');
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const textToCopy = "Start Here"

  // const handleCopy = async () => {
  //   try {
  //     await navigator.clipboard.writeText(textToCopy);
  //     setCopied(true)
  //     setTimeout(() => setCopied(false), 2000);
  //   } catch (err) {
  //     console.error("Copy failed", err)
  //   }
  // }

  function parseSections(text) {
    const sectionRegex = /^(\d+\.\s)?([A-Z][\w\s\-()]+):/gm;
    const matches = [...text.matchAll(sectionRegex)];
  
    if (!matches.length) {
      return { "Full Output": text };
    }
  
    const sections = {};
  
    for (let i = 0; i < matches.length; i++) {
      const title = matches[i][2].trim();
      const startIndex = matches[i].index + matches[i][0].length;
      const endIndex = i + 1 < matches.length ? matches[i + 1].index : text.length;
  
      const content = text.slice(startIndex, endIndex).trim();
      sections[title] = content;
    }
  
    return sections;
  }  
  
  function handleSubmit(formData) {
    startTransition(async () => {
      const outPut = await createShop(formData);
      setResult(outPut);
    })
    
  }

  return (
    // <div className="max-w-xl mx-auto py-10 space-y-6">
    <>
    <div className= "antialiased mx-auto py-12 space-y-6" style={{maxWidth: "1200px"}}>
      <h1 className="text-2xl font-semibold" style={{fontFamily: "__nextjs-Geist Mono"}}>Start Your Etsy Shop</h1>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>Product</label>
          <input name="product" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>Target Audience</label>
          <input name="target audience" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>Price Point</label>
          <input name="price point" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>Tangible or Digital</label>
          <input name="tangible" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>Brand Vibe</label>
          <input name="brand vibe" className="w-full border px-3 py-2" required />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 font-medium"
          style={{fontFamily: "__nextjs-Geist Mono"}}
          disabled={isPending}
        >
          {isPending ? 'Generating...' : 'Create My Etsy Shop'}
        </button>
      </form>


      {/* parsing results  */}
      {result && (
  <div className="mt-6 p-4 border bg-gray-50 space-y-4" style={{padding: "40px", marginTop: "56px", fontFamily: "__nextjs-Geist Mono"}}>
    <h2 className="text-xl font-semibold mb-4">🛍️ Your Etsy Shop Blueprint</h2>
    {Object.entries(parseSections(result)).map(([section, content]) => (
      <div key={section}>
        <h3 className="font-bold mb-1">{section}</h3>
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    ))}


    {/* navigation to ideogram, canva, or product page */}
    <p style={{fontFamily: "__nextjs-Geist Mono", paddingTop: "85px"}}>Once you have copied your Shop Banner Visual Description and Shop Icon Visual Description, follow the links below to AI-generate your shop banner & icon:</p>
    <div className="flex gap-4 items-center flex-col sm:flex-row" style={{paddingTop: "15px"}}>
    <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://ideogram.ai/t/explore"
            target="_blank"
            rel="noopener noreferrer">Ideogram
    </button>
    <button className="rounded-full border border-solid border-black/[.08] dark:border-black/[.145] transition-colors flex bg-background items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://www.canva.com/"
            target="_blank"
            rel="noopener noreferrer">Canva
    </button>
    <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-end bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/product"
            style={{marginLeft: "584px"}}
            target="_blank"
            rel="noopener noreferrer">My Product Listings
    </button>
    </div>
  </div>
)
}

      </div>
      {/* footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdEmail size={16} aria-hidden />
          Contact Us
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={16} aria-hidden />
          Check us out on IG
        </a>
      </footer>
      </>
  )
}