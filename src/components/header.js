import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs';
export default function Header() {
    return (
        // <div style={{padding: "0 10px 0 10px", marginBottom: "6px"}}className="flex justify-end items-center gap-4 h-16">
        <div className="header font-[family-name:var(--font-geist-sans)]" style={{fontWeight: "bolder"}}>
            <h1>ShopScribe-AI</h1>
            <div>
        <SignedOut>
          <SignInButton className="sign-in" style={{color: "#0B6623"}} fallbackRedirectUrl="/shop"/>
          <SignUpButton className="sign-up" style={{color: "#0B6623"}} fallbackRedirectUrl="/shop"/>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        </div>
        </div>
    )
}