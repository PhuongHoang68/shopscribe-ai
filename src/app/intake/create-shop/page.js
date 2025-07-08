'use client'
import { useState, useTransition } from "react";
import { createShop } from "./actions";


export default function ShopPage() {
  const [result, setResult] = useState('');
  const [isPending, startTransition] = useTransition();

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
    <div>
      <h1 className="text-2xl font-semibold">Start Your Etsy Shop</h1>

      <form action={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium">Product</label>
          <input name="product" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium">Target Audience</label>
          <input name="target audience" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium">Price Point</label>
          <input name="price point" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium">Tangible or Digital</label>
          <input name="tangible" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium">Brand Vibe</label>
          <input name="brand vibe" className="w-full border px-3 py-2" required />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 font-medium"
          disabled={isPending}
        >
          {isPending ? 'Generating...' : 'Create My Etsy Shop'}
        </button>
      </form>

      {result && (
  <div className="mt-6 p-4 border bg-gray-50 space-y-4">
    <h2 className="text-xl font-semibold mb-4">🛍️ Your Etsy Shop Blueprint</h2>
    {Object.entries(parseSections(result)).map(([section, content]) => (
      <div key={section}>
        <h3 className="font-bold mb-1">{section}</h3>
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    ))}
  </div>
)}
      </div>
  )
}