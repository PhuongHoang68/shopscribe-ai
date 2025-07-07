'use client'
import { useState, useTransition, useEffect } from "react";
import { createShop } from "./actions";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      if (outPut) {
        localStorage.setItem("Shop GPT response", outPut)
      }
      console.log("Shop saved to localStorage", outPut)
    })
  }

  //loading result from localStorage if page reloads
  useEffect(() => {
    const stored = localStorage.getItem("Shop GPT response")
    if (stored) {
      setResult(stored)
    }
  }, [])

  return (
    // <div className="max-w-xl mx-auto py-10 space-y-6">
    <>
    <div className= "antialiased mx-auto py-12 space-y-6">
    <div className="flex justify-between items-center w-full mb-6">
  {/* Left-aligned Breadcrumbs */}
  <div onClick={handleClick}>
    <Breadcrumbs aria-label="breadcrumb">
      <StyledBreadcrumb
        component={Link}
        href="/"
        label="Home"
        icon={<HomeIcon fontSize="small" />}
      />
      <StyledBreadcrumb component="a" href="#" label="Shop" />
    </Breadcrumbs>
  </div>

  {/* Right-aligned UserButton */}
  <div>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </div>
</div>

    <div className="rounded-lg" style={{padding: "120px"}}>
      <h1 className="text-2xl font-semibold" style={{fontFamily: "__nextjs-Geist Mono"}}>Start Your Etsy Shop</h1>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>What are your main product(s)?</label>
          <input style={{marginBottom: "10px"}} name="product" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>Who is your main Target Audience?</label>
          <input style={{marginBottom: "10px"}} name="target audience" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>What is your Price Positioning? (e.g., budget, mid-tier, luxury)</label>
          <input style={{marginBottom: "10px"}} name="price point" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>Are your products Tangible or Digital?</label>
          <input style={{marginBottom: "10px"}} name="tangible" className="w-full border px-3 py-2" required />
        </div>

        <div>
          <label className="block font-medium" style={{fontFamily: "__nextjs-Geist Mono"}}>Your brand personality. (e.g., whimsical, minimalist, luxurious)</label>
          <input style={{marginBottom: "50px"}} name="brand vibe" className="w-full border px-3 py-2" required />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 font-medium"
          style={{fontFamily: "__nextjs-Geist Mono", marginBottom :"10px"}}
          disabled={isPending}
        >
          {isPending ? 'Generating...' : 'Create My Etsy Shop'}
        </button>
      </form>
      </div>


      {/* parsing results  */}
      {result && (
  <div className="mt-6 p-4 border bg-gray-50 space-y-4" style={{padding: "40px", marginTop: "56px", marginBottom:"40px", fontFamily: "__nextjs-Geist Mono"}}>
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
    <a 
      href="https://ideogram.ai/t/explore"
      target="_blank"
      rel="noopener noreferrer"
      >
    <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
      Ideogram
    </button>
    </a>
    <a 
    href="https://www.canva.com/"
    target="_blank"
    rel="noopener noreferrer"
    >
    <button className="rounded-full border border-solid border-black/[.08] dark:border-black/[.145] transition-colors flex bg-background items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]">
      Canva
    </button>
    </a>
    <Link href="/product">
    <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-end bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            style={{marginLeft: "584px"}}
            target="_blank"
            rel="noopener noreferrer">My Product Listings
    </button>
    </Link>
    </div>
  </div>
)
}

      </div>
      {/* footer */}
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
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
      </footer> */}
      </>
  )
}