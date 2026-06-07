import { ModeToggle } from "@/components/Toogle-mode";
import type { PropsWithChildren } from "react";


export default function Layout({children}: PropsWithChildren) {
  return (
    <div className="text-foreground flex flex-col">
        <header className="p-4 border-b fixed w-full flex items-center justify-end shadow-md">
            <ModeToggle />
        </header>
        <main className="flex items-center justify-center h-screen">
            {children}
        </main>
    </div>
  )
}
