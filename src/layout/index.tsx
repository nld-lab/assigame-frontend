import Navbar from "@/components/navbar";
import type { PropsWithChildren } from "react";


export default function Layout({children}: PropsWithChildren) {
  return (
    <div className="text-foreground flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col w-full">
            {children}
        </main>
    </div>
  )
}
