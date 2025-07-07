import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Home() {
  return (
    <>
    <div className="w-full flex flex-col gap-24" style={{marginBottom: "70px"}}>
    <img
        src="/Hero1.png"
        alt="Etsy Hero Banner"
        className="w-full max-h-85 object-cover rounded-lg mb-10"
      />

      <main className="flex flex-col gap-10 items-center sm:items-start">
          {/* <header className="w-full flex justify-center mt-6">
  <div style={{fontSize: "50px", fontWeight: "lighter"}}>
    ShopScribe AI
  </div>
</header> */}
  <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-5 max-w-6xl w-full">

    {/* Top Left - App Name */}
    <div className="flex flex-col justify-center" style={{textAlign: "center"}}>
      {/* <h1 >Build Your Dream Shop</h1>
      <div className="text-gray-700 text-base leading-relaxed">
    <p>Craft SEO-friendly product listings in seconds</p>
    <p>Generate unique shop branding that stands out</p>
    <p>Save time and focus on growing your business</p>
  </div> */}
  {/* <img 
  src="/graphic2.png"
  alt="Graphic 2"
  className="w-full h-full object-cover rounded-lg"
  /> */}
    <div style={{fontSize: "70px", fontWeight: "light"}}>
    ShopScribe AI
    {/* <div className="text-gray-700 text-base leading-relaxed">
    <p>Craft SEO-friendly product listings in seconds</p>
    <p>Generate unique shop branding that stands out</p>
    <p>Save time and focus on growing your business</p>
  </div> */}
  </div>
  <span>Build your dream shop</span>
    </div>

    {/* Top Right - Graphic 1 */}
    <div
  className="rounded-2xl shadow-lg p-6 flex flex-col justify-between items-start min-h-[190px] border border-gray-200"
  style={{ backgroundColor: "#F4F0ED" }}
>
  <div className="w-full flex justify-between items-start">
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Returning User</h3>
      <p className="text-sm text-gray-600 mt-1">Sign in to access your workspace</p>
    </div>
    {/* <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
      <span className="text-white font-semibold">→</span>
    </div> */}
  </div>

  {/* Uncomment when SignInButton is connected */}
  {/* <SignInButton> */}
  <div className="md:grid-cols-2">
  <SignedOut>
                <SignInButton className="mt-6 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all text-sm font-medium" style={{marginRight: "30px"}} fallbackRedirectUrl="/shop" />
              </SignedOut>

              <SignedOut>
                <SignUpButton className="mt-6 px-6 py-2 bg-white text-black rounded-full hover:bg-gray-800 transition-all text-sm font-medium" fallbackRedirectUrl="/shop" />
              </SignedOut>
  </div>
  {/* </SignInButton> */}
</div>


  </div>





        {/* <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <Link href="/shop">
          <li>
            Build the Etsy shop of your dreams  
            <EastOutlinedIcon style={{marginLeft :"5px"}} fontSize="small" />
            {/* <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.js
            </code> */}
          {/* </li>
          </Link>
          <Link href="/product">
          <li className="tracking-[-.01em]">
            Create product listings instantly
            <EastOutlinedIcon style={{marginLeft :"5px"}} fontSize="small" />
          </li>
          </Link> */}
        {/* </ol> */} 

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a> */}
        </div>
      </main>
      </div>
    </>
  );
}
