/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useTransition, useEffect } from "react";

export default function ShopPage() {
  const [result, setResult] = useState('');
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(true);
  const [close, setClose] = useState(false);
  const [error, setError] = useState(null);

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
  
  // function handleSubmit(formData) {
  //   // localStorage.removeItem("Shop GPT response")
  //   startTransition(async () => {
  //     const outPut = await createShop(formData);
  //     setResult(outPut);
  //     if (outPut) {
  //       localStorage.setItem("Shop GPT response", outPut)
  //     }
  //     setOpen(false)
  //   })
    
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      product: formData.get('product'),
      targetAudience: formData.get('target audience'),
      pricePoint: formData.get('price point'),
      tangible: formData.get('tangible'),
      brandVibe: formData.get('brand vibe'),
    };
    console.log("starting fetch");
    startTransition(async () => {
      setError(null); // Clear previous errors
      setResult(''); // Clear previous result
      try {
        const res = await fetch('/intake/create-shop/api/create-shop', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log("fetch completed", data.result);

        // Check if valid response received
        if (data.result && data.result.trim() !== '') {
          setResult(data.result);
          localStorage.setItem("Shop GPT response", data.result);

          // Only hide the form once the result is set
          setOpen(false);
        } else {
          setError('No result returned from API');
        }

    
    // try {
    //   console.log("Submitting to /intake/create-shop/api/create-shop...");
    //   const res = await fetch('/intake/create-shop/api/create-shop', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload),
    //   });
    //   const data = await res.json();
    // console.log("fetch completed", data.result);

    // // Ensure valid response
    // if (data.result && data.result.trim() !== '') {
    //   setResult(data.result);

    //   // Delay hiding the form by a small amount of time to allow React to process state
    //   setTimeout(() => {
    //     setOpen(false); // Hide the form
    //     localStorage.setItem("Shop GPT response", data.result);
    //   }, 100); // 100ms delay
    // } else {
    //   setResult('Something went wrong or no result returned');
    //   console.error('No valid result returned from API');
    // }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  });
};
  
  
  useEffect(() => {
    console.log("result", result);
  }, [result])

    //loading result from loclStorage if page reloads
    useEffect(() => {
      const stored = localStorage.getItem("Shop GPT response")
      if (stored) {
        setResult(stored)
        setClose(true)
      }
    }, [])
  return (
    // <div className="max-w-xl mx-auto py-10 space-y-6">

    <div className= "antialiased" style={{paddingBottom: "40px"}} >
            <button
        onClick={() => setOpen(!open)}
        className="mb-4 text-blue-600 hover:underline"
      >
        {open ? 'Hide Form' : 'Edit Inputs'}
      </button>

      {open && (
      <><h1 className="text-2xl font-semibold">Start Your Etsy Shop</h1>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block font-medium">What are your main Products? (2-3 subsets) </label>
            <input name="product" className="w-full shadow-lg border px-3 py-2" required />
          </div>

          <div>
            <label className="block font-medium">Who is your Target Audience?</label>
            <input name="target audience" className="w-full shadow-lg border px-3 py-2" required />
          </div>

          <div>
            <label className="block font-medium">What is your products' Price Point? (e.g., Budget, Mid-tier, Luxury)</label>
            <input name="price point" className="w-full shadow-lg border px-3 py-2" required />
          </div>

          <div>
            <label className="block font-medium">Tangible or Digital Products?</label>
            <input name="tangible" className="w-full border shadow-lg px-3 py-2" required />
          </div>

          <div>
            <label className="block font-medium">What is your Brand Positioning? (e.g., Essentials, Alt, Gift Galores, Unique)</label>
            <input name="brand vibe" className="w-full shadow-lg border px-3 py-2" required />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 shadow-sm text-white mt-3 py-2 font-medium rounded-full hover:from-blue-600 hover:via-blue-400 hover:to-blue-200 hover:shadow-lg"
            disabled={isPending}
          >
            {isPending ? 'Generating...' : 'Create My Etsy Shop'}
          </button>
        </form>
        <button
            onClick={() => setClose(!close)}
            className="mb-4 pt-4 text-blue-600 hover:underline"
          >
              {close ? 'View Recent Result' : 'Hide Result'}
            </button>
        </>
      )}
          

      {result && !close && (
  <div className="mt-6 p-4 border bg-gray-50 space-y-4">
    <h2 className="text-xl font-semibold mb-4">🛍️ Your Etsy Shop Blueprint</h2>
    {Object.entries(parseSections(result)).map(([section, content]) => (
      <div key={section}>
        <h3 className="font-bold mb-1">{section}</h3>
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    ))}
                <p style={{ fontFamily: "__nextjs-Geist Mono", paddingTop: "40px" }}>Ready to generate your banner and icon?</p>
            <div className="flex gap-4 justify-between items-center sm:flex-row" style={{ paddingTop: "5px" }}>
              <a
                href="https://ideogram.ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="rounded-full border border-solid border-black/[.08] dark:border-black/[.145] transition-colors flex bg-background items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-11 px-4 w-full md:w-[158px]">
                  Ideogram
                </button>
              </a>
              <a
                href="https://www.canva.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
              <button className="rounded-full border border-solid border-transparent transition-colors flex items-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-11 px-4"
            target="_blank"
            rel="noopener noreferrer">Canva
                </button>
                </a>
            </div>
  </div>
)}
      </div>
      
  )
}