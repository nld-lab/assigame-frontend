import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
