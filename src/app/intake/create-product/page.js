
'use client'
import { useState, useTransition, useEffect } from "react";
import { createProduct } from "./actions";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { emphasize, styled } from '@mui/material/styles';
// import Chip from '@mui/material/Chip';


export default function ProductPage() {
  const [result, setResult] = useState('');
  const [isPending, startTransition] = useTransition();
  const [tone, setTone] = useState('');
  const [style, setStyle] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [open, setOpen] = useState(true);
  const [close, setClose] = useState(false);

  //drop-downs
  const handleTone = (event) => {
    setTone(event.target.value)
  };

  const handleStyle = (event) => {
    setStyle(event.target.value)
  };

  const handlePriceRange = (event) => {
    setPriceRange(event.target.value);
  }
  //


  //result formating (sections and titles)
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
  //


  
  //api call 
  function handleSubmit(formData) {
    const product = formData.get('product')
    const targetAudience = formData.get('target audience')
    const fullPayload = {
        product,
        targetAudience, 
        tone,
        style,
        priceRange
    }

    startTransition(async () => {
      const outPut = await createProduct(fullPayload);
      setResult(outPut);
      if (outPut) {
        localStorage.setItem("Product GPT response", outPut)
      }
      console.log("Product saved to localStorage", outPut)
      setOpen(false)
    })
  }
  //



  //loading result from loclStorage if page reloads
  useEffect(() => {
    const stored = localStorage.getItem("Product GPT response")
    if (stored) {
      setResult(stored)
      setClose(true)
    }
  }, [])


  return (
    // <div className="max-w-xl mx-auto py-10 space-y-6">
    <>
    {/* <div className= "antialiased mx-auto py-12 space-y-6"> */}
    <div className= "antialiased" style={{paddingBottom: "40px"}}>
    {/* <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {/* <Link href="/product"> */}
        {/* <StyledBreadcrumb
          component={Link}
          href="/"
          label="Home"
          icon={<HomeIcon fontSize="small" />} */}
        
        {/* </Link> */}
        {/* <StyledBreadcrumb component="a" href="#" label="Product" />
        {/* <StyledBreadcrumb
          label="Accessories"
          deleteIcon={<ExpandMoreIcon />}
          onDelete={handleClick}
        /> */}
      {/* </Breadcrumbs> */}
    {/*</div> */} 
    <button
        onClick={() => setOpen(!open)}
        className="mb-4 text-blue-600 hover:underline"
      >
        {open ? 'Hide Form' : 'Edit Inputs'}
      </button>
      {open && (
        <>
      <h1 className="text-2xl font-semibold">Create New Product Listing</h1>

      <form action={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium">What are you selling?</label>
          <input name="product" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium">Who is your Target Audience?</label>
          <input name="target audience" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium">Product Branding Settings:</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* drop-down for Tone */}
          <Box sx={{ minWidth: 120 }}>
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
    {/* drop-dow for style */}
    <Box sx={{ minWidth: 120 }}>
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
    {/* drop-down for price range */}
    <Box sx={{ minWidth: 120 }}>
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
          className="w-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 shadow-sm text-white mt-3 py-2 font-medium rounded-full hover:from-blue-600 hover:via-blue-400 hover:to-blue-200 hover:shadow-lg"
          disabled={isPending}
        >
          {isPending ? 'Generating...' : 'Generate My Product Listing'}
        </button>
      </form>
      <button
            onClick={() => setClose(!close)}
            className="mb-4 pt-5 text-blue-600 hover:underline"
          >
              {close ? 'View Recent Result' : 'Hide Result'}
            </button></>
      )}
      {/* parsing results  */}
      {result && !close && (
  <><div className="mt-6 p-4 border bg-gray-50 space-y-4" style={{ padding: "40px", marginTop: "56px", fontFamily: "__nextjs-Geist Mono" }}>
            <h2 className="text-xl font-semibold mb-4">🛍️ Your Etsy Product Listing</h2>
            {Object.entries(parseSections(result)).map(([section, content]) => (
              <div key={section}>
                <h3 className="font-bold mb-1">{section}</h3>
                <p className="whitespace-pre-wrap">{content}</p>
              </div>
            ))}


            {/* navigation to ideogram, canva, or product page */}
            <p style={{ fontFamily: "__nextjs-Geist Mono", paddingTop: "40px" }}>Ready to generate your AI mock-ups?</p>
            <div className="flex gap-4 pb-5 items-center sm:flex-row" style={{ paddingTop: "5px" }}>
              <a
                href="https://placeit.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="rounded-full border border-solid border-black/[.08] dark:border-black/[.145] transition-colors flex bg-background items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-11 px-4 w-full md:w-[158px]">
                  Place It
                </button>
              </a>
              {/* <Link href="/shop">
              <button className="rounded-full border border-solid border-transparent transition-colors flex items-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-11 px-4"
            target="_blank"
            rel="noopener noreferrer">Go To Shop Creation
                </button>
              </Link> */}
            </div>
          </div>
            </>
)
}

      </div>
      {/* footer */}
      </>
  )
}