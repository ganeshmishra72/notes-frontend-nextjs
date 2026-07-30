"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Building2,
  FolderTree,
  LibraryBig,
  Layers3,
  Users,
  FileText,
  BarChart3,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  School2Icon,
} from "lucide-react";
import useSidebarStore from "@/store/AdminSlideBarStore";
import Authstore from "@/store/AuthStore";
import { useLogout } from "@/hooks/Authhooks";

const menus = [
  {
    title: "MAIN",
    items: [
      {
        icon: LayoutDashboard,
        name: "Dashboard",
        href: "/admin",
      },
    ],
  },

  {
    title: "ACADEMICS",
    items: [
      {
        icon: Building2,
        name: "Universities",
        href: "/admin/university",
      },
      {
        icon: GraduationCap,
        name: "Boards",
        href: "/admin/board",
      },
      {
        icon: FolderTree,
        name: "Courses",
        href: "/admin/courses",
      },
      {
        icon: Layers3,
        name: "Branches",
        href: "/admin/branche",
      },
      {
        icon: School2Icon,
        name: "Semester",
        href: "/admin/semester",
      },
      {
        icon: LibraryBig,
        name: "Subjects",
        href: "/admin/subject",
      },
    ],
  },

  {
    title: "CONTENT",
    items: [
      {
        icon: BookOpen,
        name: "Notes",
        href: "/admin/notes",
      },
      {
        icon: FileText,
        name: "Categories",
        href: "/admin/categories",
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        icon: Users,
        name: "Users",
        href: "/admin/user",
      },
      {
        icon: BarChart3,
        name: "Analytics",
        href: "/admin/analytics",
      },
      {
        icon: Shield,
        name: "Roles",
        href: "/admin/role",
      },
      {
        icon: Settings,
        name: "Settings",
        href: "/admin/setting",
      },
    ],
  },
];

export default function Sidebar() {

  const {
    collapsed,
    mobileOpen,
    closeMobile,
  } = useSidebarStore();

  const {mutate}=useLogout()
  const pathname = usePathname();

  const handelLogout=()=>{
     mutate(undefined)
  }
  return (
    <aside
      className={`
fixed top-0 left-0 z-50 h-screen
bg-slate-950
border-r border-slate-800
transition-all duration-300

${collapsed ? "lg:w-24" : "lg:w-72"}

${mobileOpen
          ? "translate-x-0 w-72"
          : "-translate-x-full lg:translate-x-0"
        }
`}
    >

      {/* Logo */}

      <div className="border-b border-slate-800 p-6">

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-2xl shadow-lg">
            📚
          </div>
          {
            !collapsed &&
            <div>

              <h2 className="font-bold text-xl text-white">
                NotesHub
              </h2>

              <p className="text-slate-400 text-sm">
                Admin Panel
              </p>

            </div>
          }

        </div>

      </div>

      {/* Menu */}

      <div className="overflow-y-auto h-[calc(100vh-120px)] px-4 py-5  no-scrollbar">

        {menus.map((section) => (

          <div
            key={section.title}
            className="mb-8"
          >

            {
              !collapsed &&
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 px-3">
                {section.title}
              </p>
            }

            <div className="space-y-2">

              {section.items.map((item) => {

                const Icon = item.icon;

                const active =
                  pathname === item.href;

                return (
                  <Link
                    href={item.href}
                    key={item.name}
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      className={`group flex items-center justify-between rounded-xl px-4 py-3 transition
                      ${active
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-slate-300 hover:bg-slate-800"
                        }`}
                    >

                      <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"
                        }`}>

                        <Icon size={20} />

                        {!collapsed && (
                          <span>{item.name}</span>
                        )}

                      </div>

                      <ChevronRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition"
                      />

                    </motion.div>
                  </Link>
                );
              })}
            </div>

          </div>
        ))}

      </div>

      {/* Bottom */}

      <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">

        <button onClick={()=>handelLogout()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 py-3 text-red-400 transition hover:bg-red-500 hover:text-white">

          {
            collapsed ?
              <LogOut size={18} /> :
              <div className="flex items-center justify-center  gap-2">
                <LogOut size={18} />
                <span>Logout</span>
              </div>
          }


        </button>

      </div>

    </aside>
  );
}