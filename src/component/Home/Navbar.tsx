"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  BookOpen
} from "lucide-react";
import Authstore from "@/store/AuthStore";
import { ImProfile } from "react-icons/im";
import { FaRegNoteSticky } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { useLogout } from "@/hooks/Authhooks";
import { logout } from "@/service/AuthService";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Notes",
    href: "/notes",
  },
  {
    name: "Universities",
    href: "/universities",
  },
  {
    name: "Boards",
    href: "/boards",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  
  const [mobileMenu, setMobileMenu] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
 
  const {mutate}=useLogout()
 
  const token=Authstore(store=>store.accessToken);
  const name=Authstore(name=>name.name)
  
  const handelLogout=()=>{
     mutate(undefined)
  }
  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full px-5">

      <nav
        className="mx-auto max-w-7xl rounded-full
    border
    border-white/40
    md:bg-gray-300/70
    bg-gray-400/70
    backdrop-blur-2xl
    shadow-[0_8px_40px_rgba(0,0,0,0.08)]
    transition-all
    duration-300
  "
      >

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <motion.div
              whileHover={{
                rotate: -10,
                scale: 1.08,
              }}
              className="
      w-10
      h-10
      rounded-full
      bg-gradient-to-r
      from-blue-600
      to-sky-500
      flex
      items-center
      justify-center
      shadow-lg
"
            >
              <BookOpen size={20} className="text-white" />
            </motion.div>

            <div>

              <h1 className="text-xl font-bold text-slate-800">
                NotesHub
              </h1>

              <p className="text-xs text-slate-500">
                Learn Smarter
              </p>

            </div>

          </Link>

          {/* Desktop Links */}

          <div className="hidden lg:flex items-center gap-8">

            {navLinks.map((item) => {

              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-slate-700 font-medium transition"
                >

                  <span
                    className={`hover:text-blue-600 transition ${active
                        ? "text-blue-600"
                        : ""
                      }`}
                  >
                    {item.name}
                  </span>

                  {active && (

                    <motion.div
                      layoutId="navbar"
                      className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-blue-600"
                    />

                  )}

                </Link>
              );
            })}

          </div>

          {/* RIGHT */}

             
          <div className="hidden lg:flex items-center gap-3">

            {
              token ?
               (
    <div className="relative" >
      <div
        onClick={() => setShowMenu((prev) => !prev)}
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
        <span>{name?.charAt(0).toUpperCase()}</span>
      </div>

      {showMenu && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-32
            bg-white
            rounded-xl
            shadow-lg
            border
            border-slate-100
            overflow-hidden
            z-50
          "
        >
          <Link
            href="/profile"
            onClick={() => setShowMenu(false)}
            className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition flex items-center gap-1"
          >
            <ImProfile />Profile
          </Link>

          <Link
            href="/notes"
            onClick={() => setShowMenu(false)}
            className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition flex items-center gap-1"
          >
           <FaRegNoteSticky /> Notes
          </Link>

          <button
            onClick={() => {
              setShowMenu(false);
              handelLogout();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition flex items-center gap-1"
          >
            <AiOutlineLogout />Logout
          </button>
        </div>
      )}
    </div>
  ) 
            :
             <div className="lg:flex items-center gap-3">
            <Link
              href="/login"
              className="
px-5
py-2
rounded-full
border
border-blue-600
hover:bg-blue-600
hover:text-white
text-blue-600
transition
"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="
px-6
py-2
rounded-full
bg-gradient-to-r
from-blue-600
to-sky-500
text-white
font-medium
shadow-lg
hover:scale-105
transition-all
"            >
              Sign Up
            </Link>
            </div>
}

           

          </div>

          {/* Mobile Button */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="lg:hidden text-black"
          >
            {mobileMenu ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>

        {/* MOBILE MENU */}

        <AnimatePresence>

          {mobileMenu && (

            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="lg:hidden border-t bg-white"
            >

              <div className="px-6 py-6 flex flex-col gap-5">

                {navLinks.map((item) => (

                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className={`font-medium ${pathname === item.href
                        ? "text-blue-600"
                        : "text-slate-700"
                      }`}
                  >
                    {item.name}
                  </Link>

                ))}

                <hr />

{
    !token &&

                <div className="w-full flex flex-col gap-3">
                <Link
                  href="/login"
                  className="border rounded-xl py-3 text-center border-blue-600
hover:bg-blue-600
hover:text-white
text-blue-600"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-xl py-3 text-center"
                >
                  Sign Up
                </Link>
                </div>
}

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </nav>

    </header>
  );
}