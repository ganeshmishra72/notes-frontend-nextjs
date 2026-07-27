"use client";

import useSidebarStore from "@/store/AdminSlideBarStore";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

 
// import Topbar from "@/components/admin/Topbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collapsed=useSidebarStore(
    s=>s.collapsed
  )
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className={`
transition-all
duration-300
${collapsed ? "lg:ml-24" : "lg:ml-72"}
`}>

        <Topbar  />

        <main className="px-8 py-8">
          {children}
        </main>

      </div>

    </div>
  );
}