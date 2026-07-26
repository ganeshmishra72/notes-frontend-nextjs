"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  BookOpen,
  FileQuestion,
  Presentation,
  ClipboardList,
  FlaskConical,
  FolderKanban,
} from "lucide-react";

const categories = [
  {
    id: "all",
    name: "All Resources",
    icon: FolderKanban,
    count: "25,420",
  },
  {
    id: "notes",
    name: "Notes",
    icon: FileText,
    count: "12,540",
  },
  {
    id: "question",
    name: "Question Papers",
    icon: FileQuestion,
    count: "4,120",
  },
  {
    id: "books",
    name: "Books",
    icon: BookOpen,
    count: "2,480",
  },
  {
    id: "ppt",
    name: "PPT",
    icon: Presentation,
    count: "1,860",
  },
  {
    id: "assignment",
    name: "Assignments",
    icon: ClipboardList,
    count: "3,100",
  },
  {
    id: "lab",
    name: "Lab Manual",
    icon: FlaskConical,
    count: "1,320",
  },
];

const CategoryTabs = () => {
  const [active, setActive] = useState("all");

  return (
    <section>

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Browse Categories
          </h2>

          <p className="text-slate-500 mt-1">
            Choose a resource type to filter study materials.
          </p>

        </div>

      </div>

      <div className="overflow-x-auto scrollbar-hide">

        <div className="flex gap-4 min-w-max pb-2">

          {categories.map((category) => {

            const Icon = category.icon;
            const isActive = active === category.id;

            return (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
                onClick={() => setActive(category.id)}
                className={`relative overflow-hidden rounded-2xl border px-5 py-4 transition-all min-w-[210px]
                ${
                  isActive
                    ? "border-blue-600 bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500"
                  />
                )}

                <div className="relative flex items-center gap-4">

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center
                    ${
                      isActive
                        ? "bg-white/20"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <Icon size={24} />
                  </div>

                  <div className="text-left">

                    <h3 className="font-semibold">
                      {category.name}
                    </h3>

                    <p
                      className={`text-sm ${
                        isActive
                          ? "text-blue-100"
                          : "text-slate-500"
                      }`}
                    >
                      {category.count} Resources
                    </p>

                  </div>

                </div>

              </motion.button>
            );
          })}
        </div>

      </div>

    </section>
  );
};

export default CategoryTabs;