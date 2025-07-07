// import Form from 'next/form'
// import { createShop } from './actions'
'use client'
import { useState, useTransition, useEffect } from "react";
import { createProduct } from "./actions";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from "next/link";
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';


export default function Page() {
  const [result, setResult] = useState('');
  const [isPending, startTransition] = useTransition();
  const [tone, setTone] = useState('');
  const [style, setStyle] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    return {
      backgroundColor: theme.palette.grey[100],
      height: theme.spacing(3),
      color: (theme.vars || theme).palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(theme.palette.grey[100], 0.06),
        ...theme.applyStyles('dark', {
          backgroundColor: emphasize(theme.palette.grey[800], 0.06),
        }),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(theme.palette.grey[100], 0.12),
        ...theme.applyStyles('dark', {
          backgroundColor: emphasize(theme.palette.grey[800], 0.12),
        }),
      },
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    };
  });

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const handleTone = (event) => {
    setTone(event.target.value)
  };

  const handleStyle = (event) => {
    setStyle(event.target.value)
  };

  const handlePriceRange = (event) => {
    setPriceRange(event.target.value);
  }

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
    })
  }

  return (
    // <div className="max-w-xl mx-auto py-10 space-y-6">
    <>
    <div className= "antialiased mx-auto py-12 space-y-6" style={{maxWidth: "1200px"}}>
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {/* <Link href="/product"> */}
        <StyledBreadcrumb
          component={Link}
          href="/"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        {/* </Link> */}
        <StyledBreadcrumb component="a" href="#" label="Product" />
        {/* <StyledBreadcrumb
          label="Accessories"
          deleteIcon={<ExpandMoreIcon />}
          onDelete={handleClick}
        /> */}
      </Breadcrumbs>
    </div>
      <h1 className="text-2xl font-semibold" style={{fontFamily: "__nextjs-Geist Mono"}}>Create My Product Listings</h1>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>What are you selling?</label>
          <input name="product" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>Who are your target audience?</label>
          <input name="target audience" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>Product Branding Settings:</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* drop-down for Tone */}
          <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-tone">Tone/personality of the writings</InputLabel>
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
        <InputLabel id="select-style">Aesthetics/visuals of product</InputLabel>
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
          <MenuItem value="coastal">Coastal</MenuItem>
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
          className="w-full bg-black text-white py-2 font-medium"
          style={{fontFamily: "__nextjs-Geist Mono"}}
          disabled={isPending}
        >
          {isPending ? 'Generating...' : 'Generate My Product Listing'}
        </button>
      </form>


      {/* parsing results  */}
      {result && (
  <div className="mt-6 p-4 border bg-gray-50 space-y-4" style={{padding: "40px", marginTop: "56px", fontFamily: "__nextjs-Geist Mono"}}>
    <h2 className="text-xl font-semibold mb-4">🛍️ Your Etsy Product Listing</h2>
    {Object.entries(parseSections(result)).map(([section, content]) => (
      <div key={section}>
        <h3 className="font-bold mb-1">{section}</h3>
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    ))}


    {/* navigation to ideogram, canva, or product page */}
    <p style={{fontFamily: "__nextjs-Geist Mono", paddingTop: "95px"}}>Ready to generate your AI mock-ups?</p>
    <div className="flex gap-4 items-center flex-col sm:flex-row" style={{paddingTop: "5px"}}>
    <a 
    href="https://placeit.net/"
    target="_blank"
    rel="noopener noreferrer"
    >
    <button className="rounded-full border border-solid border-black/[.08] dark:border-black/[.145] transition-colors flex bg-background items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]">
      Place It
    </button>
    </a>
    <Link href="/shop">
    <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-end bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            style={{marginLeft: "584px"}}
            target="_blank"
            rel="noopener noreferrer">Go To Shop Creation
    </button>
    </Link>
    </div>
  </div>
)
}

      </div>
      {/* footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:peyton.hoang@gmail.com"
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