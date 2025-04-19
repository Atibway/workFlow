import { ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Classic heading font
const headingFont = localFont({
  src: "../../public/fonts/CalSans.woff2",
});

// Modern readable font
const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 to-white">
      <div className={cn("flex items-center justify-center flex-col", headingFont.className)}>
        <div className="mb-4 items-center flex border shadow-sm p-4 bg-indigo-100 text-indigo-800 rounded-full uppercase tracking-widest">
          <ClipboardCheck className="h-6 w-6 mr-2" />
          UCU BBUC Project Hub
        </div>

        <h1 className="text-3xl md:text-6xl text-center text-gray-800 mb-4">
          Manage Academic Projects with Purpose
        </h1>

        <div className="text-3xl md:text-6xl bg-gradient-to-r from-purple-700 to-indigo-600 text-white px-4 py-2 rounded-md pb-4 w-fit">
          The Organized Way at UCU BBUC
        </div>
      </div>

      <div className={cn(
        "text-sm md:text-xl text-gray-600 mt-6 max-w-xs md:max-w-2xl text-center mx-auto",
        textFont.className
      )}>
        Welcome to your academic project command center. Built for students and staff at Bishop Barham University College,
        this system helps you plan, collaborate, and complete projects with clarity and accountability—rooted in Christ,
        guided by excellence.
      </div>

      <Button className="mt-8" size={"lg"} asChild>
        <Link href={"/sign-up"}>
          Get Started with UCU BBUC Projects
        </Link>
      </Button>
    </div>
  );
}
