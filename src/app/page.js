export default function Home() {
  return (
    <div className="relative min-h-[88vh] font-[family-name:var(--font-geist-sans)] overflow-hidden">
  {/* Optimized background image */}
  <img
    src="/newheroimage.png"
    alt="Hero background"
    className="absolute inset-0 w-full h-[85vh] object-cover z-0"
    fetchPriority="high"
  />

  {/* Foreground content */}
  <main className="relative z-10 flex flex-col gap-[32px] items-start pl-[6%] pt-[13%] text-white">
        <h1 style={{fontSize: "50px", fontWeight: "normal"}}>ShopScribe-AI</h1>
        <ol style={{fontWeight: "light"}} className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>
            Build the Etsy shop of your dreams
          </li>
          <li className="tracking-[-.01em]">
            Create product listings instantly.
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