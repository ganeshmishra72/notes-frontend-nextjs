"use client";

import useSidebarStore from "@/store/AdminSlideBarStore";
import { Bell, Menu, Moon, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";


export default function Topbar() {
  const pathname = usePathname();

  const {
    toggleCollapse,
    toggleMobile,
    mobileOpen
  } = useSidebarStore();

  const pageName =
    pathname.split("/").pop()?.replace("-", " ") || "Dashboard";

  return (
    <header className="sticky top-0 z-40 p-2 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl">

      <div className="flex h-full items-center justify-between px-6">

        {/* LEFT */}

        <div className="flex items-center gap-5">

          {/* Mobile */}

         

          {/* Desktop */}

          <button
            onClick={toggleCollapse}
            className="hidden rounded-xl p-2 hover:bg-slate-100 lg:block text-blue-600"
          >
            <Menu size={22} />
          </button>

          <div>

            <h1 className="text-2xl font-bold capitalize text-slate-900">
              {pageName}
            </h1>

            <div className="mt-1 flex items-center text-sm text-slate-500">

              Dashboard

              <ChevronRight
                size={15}
                className="mx-1"
              />

              <span className="capitalize">
                {pageName}
              </span>

            </div>

          </div>

        </div>

        <button
            onClick={toggleMobile}
            className="rounded-xl p-2 hover:bg-slate-100 lg:hidden text-blue-600 "
          >
           {
              mobileOpen ? <IoClose size={22} /> :<Menu size={22} />
           }
          </button>
        {/* RIGHT */}

        <div className="hidden md:flex items-center gap-3">

          {/* Theme */}

          <button className="rounded-xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100 text-gray-600">

            <Moon size={18} />

          </button>

          {/* Notification */}

          <button className="relative rounded-xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100 text-gray-600">

            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

          </button>

          {/* Profile */}

          <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:shadow-md">

           <div
        
        className="
          w-10
          h-10
          rounded-full
          bg-slate-100
          hover:bg-blue-100
          transition
          flex
          items-center
          justify-center
          text-blue-400
          font-semibold
          cursor-pointer
        "
      >
        <span>G</span>
      </div>
            <div className="hidden text-left lg:block">

              <h4 className="font-semibold text-slate-800">
                Ganesh Mishra
              </h4>

              <p className="text-xs text-slate-500">
                Super Admin
              </p>

            </div>

          </button>

        </div>

      </div>

    </header>
  );
}