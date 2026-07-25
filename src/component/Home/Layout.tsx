import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
 

interface WebsiteLayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: WebsiteLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      <Navbar />

   
      <main className="flex-1">
        {children}
      </main>

     
      <Footer />
    </div>
  );
}