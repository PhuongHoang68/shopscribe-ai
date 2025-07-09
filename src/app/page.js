export default function Home() {
  return (
    <div style={{minHeight: "88vh"}} className="relative min-h-[88vh] grid-rows-[20px_1fr_20px] items-start justify-items-start font-[family-name:var(--font-geist-sans)]">
      <div className="hero-background row-span-full"></div>
      <main style={{color: "white"}} className="flex flex-col gap-[32px] row-start-2 items-start sm:items-start content-on-hero pl-[6%] pt-[13%]">
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