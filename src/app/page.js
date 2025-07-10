import Image from "next/image";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="relative min-h-[86vh] font-[family-name:var(--font-geist-sans)] overflow-hidden">
  {/* Optimized background image */}
  <Image
    src="/newheroimage.png"
    alt="Hero background"
    fill
    className="object-cover z-0"
    fetchPriority="high"
  />

  {/* Foreground content */}
  <main className="relative z-10 flex flex-col gap-[32px] items-start pl-[6%] pt-[13%] text-white">
        <h1 style={{fontSize: "50px", fontWeight: "normal"}}>ShopScribe-AI</h1>
        <ol style={{fontWeight: "normal", fontSize: "15px"}} className="list-inside list-decimal sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>
          <Link className="inline-flex items-center gap-2" href="/intake/create-shop">Build the Etsy shop of your dreams <FaRegArrowAltCircleRight size={16} aria-hidden /></Link>
          </li>
          <li className="tracking-[-.01em]">
          <Link className="inline-flex items-center gap-2" href="/intake/create-product">Create product listings instantly <FaRegArrowAltCircleRight size={16} aria-hidden /></Link>
          </li>
        </ol>

        {/* <div className="flex gap-4 items-center flex-col sm:flex-row">
        </div> */}
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
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
      </footer> */}
    </div>
  );
}