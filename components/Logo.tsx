import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Image from "next/image"
import Link from "next/link"

const headingFont = localFont({
  src: "../public/fonts/CalSans.woff2",
});

export const Logo = () => {
  return (
    <Link href={"/"}>
<div className="hover:opacity-75 transition md:items-center gap-x-2 hidden md:flex">
    <Image
    src={"/logo.svg"}
    alt="logo"
    height={30}
    width={30}
    />
 <p className={cn("text-lg text-neutral-700 ",
    headingFont.className
 )}>
    WorkNest
 </p>
</div>
    </Link>
  )
}
