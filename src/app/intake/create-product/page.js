'use client'
import { useState, useTransition, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ProductPage() {
  const [result, setResult] = useState('');
  const [isPending, startTransition] = useTransition();
  const [tone, setTone] = useState('');
  const [style, setStyle] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(true);  // Controls form visibility
  const [showResult, setShowResult] = useState(false); // Controls result visibility (after form submit)
  const [error, setError] = useState(null);

  // Handle dropdown changes
  const handleTone = (event) => setTone(event.target.value);
  const handleStyle = (event) => setStyle(event.target.value);
  const handlePriceRange = (event) => setPriceRange(event.target.value);

  // Parse the result into sections (same logic as shop)
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

  // Handle form submission (API call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      product: formData.get('product'),
      targetAudience: formData.get('target audience'),
      tone,
      style,
      priceRange
    };

    startTransition(async () => {
      setError(null); // Clear previous errors
      setResult(''); // Clear previous result

      try {
        // Make API call
        const res = await fetch('/intake/create-product/api/create-product', { // Make sure the endpoint is correct
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log("Fetch completed", data.result);

        if (data.result && data.result.trim() !== '') {
          setResult(data.result);
          localStorage.setItem("Product GPT response", data.result);

          // Automatically hide the form and show the result
          setIsFormOpen(false);
          setShowResult(true); // result is visible
        } else {
          setError('No result returned from API');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('An error occurred while fetching the result.');
      }
    });
  };

  // Effect to load result from localStorage when page loads
  useEffect(() => {
    const stored = localStorage.getItem("Product GPT response");
    if (stored) {
      setResult(stored);
    }
  }, []);

  return (
    <div className="antialiased" style={{ paddingBottom: "40px" }}>
      {/* Hide Form Button */}
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="mb-4 text-blue-600 hover:underline"
      >
        {isFormOpen ? 'Hide Form' : 'Show Form'}
      </button>

      {/* Form */}
      {isFormOpen && (
        <>
          <h1 className="text-2xl font-semibold">Create New Product Listing</h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block font-medium">What are you selling?</label>
              <input name="product" className="shadow-lg w-full border px-3 py-2" required />
            </div>

            <div>
              <label className="block font-medium">Who is your Target Audience?</label>
              <input name="target audience" className="shadow-lg w-full border px-3 py-2" required />
            </div>

            <div>
              <label className="block font-medium">Product Branding Settings:</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* drop-down for Tone */}
                <Box className="shadow-lg" sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-tone">Tone of Writing</InputLabel>
                    <Select
                      labelId="select-tone"
                      id="simple-select"
                      value={tone}
                      label="Tone"
                      onChange={handleTone}
                    >
                      <MenuItem value="friendly">Friendly</MenuItem>
                      <MenuItem value="luxury">Luxury</MenuItem>
                      <MenuItem value="playful">Playful</MenuItem>
                      <MenuItem value="calm">Calm</MenuItem>
                      <MenuItem value="professional">Professional</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {/* drop-down for Style */}
                <Box className="shadow-lg" sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-style">Aesthetics</InputLabel>
                    <Select
                      labelId="select-style"
                      id="simple-select"
                      value={style}
                      label="Style"
                      onChange={handleStyle}
                    >
                      <MenuItem value="boho">Boho</MenuItem>
                      <MenuItem value="minimalist">Minimalist</MenuItem>
                      <MenuItem value="glam">Glam</MenuItem>
                      <MenuItem value="mystical">Mystical</MenuItem>
                      <MenuItem value="functional">Functional</MenuItem>
                      <MenuItem value="beachy">Beachy</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {/* drop-down for Price Range */}
                <Box className="shadow-lg" sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-price-range">Price positioning</InputLabel>
                    <Select
                      labelId="select-price-range"
                      id="simple-select"
                      value={priceRange}
                      label="Price Range"
                      onChange={handlePriceRange}
                    >
                      <MenuItem value="budget">Budget</MenuItem>
                      <MenuItem value="mid-tier">Mid-Tier</MenuItem>
                      <MenuItem value="luxury">Luxury</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 shadow-sm text-white mt-3 py-2 font-medium rounded-full hover:from-blue-600 hover:via-blue-400 hover:to-blue-200 hover:shadow-lg"
              disabled={isPending}
            >
              {isPending ? 'Generating...' : 'Generate My Product Listing'}
            </button>
          </form>
        </>
      )}

      {/* View Recent Result Button */}
      {result && !showResult && (
        <button
          onClick={() => setShowResult(true)} // Only show result if user clicks
          className="mb-4 pt-4 text-blue-600 hover:underline"
        >
          View Recent Result
        </button>
      )}

      {/* Show result */}
      {showResult && result && (
        <div className="mt-6 p-4 border bg-gray-50 space-y-4">
          <h2 className="text-xl font-semibold mb-4">🛍️ Your Etsy Product Listing</h2>
          {Object.entries(parseSections(result)).map(([section, content]) => (
            <div key={section}>
              <h3 className="font-bold mb-1">{section}</h3>
              <p className="whitespace-pre-wrap">{content}</p>
            </div>
          ))}
          {/* Navigation buttons */}
          <p style={{ paddingTop: "40px", fontWeight: "bold" }}>Ready to generate your AI mock-ups?</p>
          <div className="flex gap-4 justify-between items-center sm:flex-row" style={{ paddingTop: "4px" }}>
            <a
              href="https://placeit.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="rounded-full border border-solid border-black/[.08] dark:border-black/[.145] transition-colors flex bg-background items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-11 px-4 w-full md:w-[158px]">
                PlaceIt
              </button>
            </a>
            {/* <a
              href="https://www.etsy.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="rounded-full border border-solid border-transparent transition-colors flex items-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-11 px-4" target="_blank" rel="noopener noreferrer">
                Go To Etsy
              </button>
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
}
