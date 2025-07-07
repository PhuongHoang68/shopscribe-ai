import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';

export default function Home() {
  return (
    <>
    <div className="w-full flex flex-col gap-10">
    <img
        src="/Hero1.png"
        alt="Etsy Hero Banner"
        className="w-full max-h-85 object-cover rounded-lg mb-10"
      />

      <main className="flex flex-col gap-10 items-center sm:items-start">


        <h1 style={{fontSize: "50px", fontWeight: "lighter"}}>ShopScribe-AI</h1>
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <Link href="/shop">
          <li>
            Build the Etsy shop of your dreams  
            <EastOutlinedIcon style={{marginLeft :"5px"}} fontSize="small" />
            {/* <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.js
            </code> */}
          </li>
          </Link>
          <Link href="/product">
          <li className="tracking-[-.01em]">
            Create product listings instantly
            <EastOutlinedIcon style={{marginLeft :"5px"}} fontSize="small" />
          </li>
          </Link>
        </ol>

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
