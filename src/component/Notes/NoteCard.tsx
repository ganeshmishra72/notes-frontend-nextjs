"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Download,
  Eye,
  FileText,
  BookOpen,
  Building2,
  Calendar,
  HardDrive,
  Languages,
  Star,
  User,
  Bookmark,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const NoteCard = () => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl overflow-hidden"
    >
      {/* Header */}

 

      <div className="relative bg-gradient-to-r from-blue-600 to-sky-500 p-6">

        <div className="absolute right-5 top-5 flex gap-2">

          <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 transition flex items-center justify-center">
            <Heart size={18} className="text-white" />
          </button>

          <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 transition flex items-center justify-center">
            <Bookmark size={18} className="text-white" />
          </button>

        </div>

        <div className="flex items-center gap-5">

          {/* PDF */}

          <div className="h-20 w-20 rounded-2xl bg-white flex items-center justify-center shadow-lg">

            <FileText
              className="text-red-500"
              size={42}
            />

          </div>

          <div className="text-white">

            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
              PDF
            </span>

            <h2 className="mt-3 text-2xl font-bold">
              Operating System Notes
            </h2>

            <p className="mt-1 text-blue-100">
              Unit 3 • Memory Management
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        {/* Rating */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-1">

            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                size={17}
                fill="#facc15"
                className="text-yellow-400"
              />
            ))}

            <span className="ml-2 text-sm text-slate-500">
              4.9 (240 Reviews)
            </span>

          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Verified
          </span>

        </div>

        {/* Metadata */}

        <div className="mt-8 grid grid-cols-2 gap-5 text-sm">

          <Info
            icon={<Building2 size={18} />}
            title="University"
            value="SPPU"
          />

          <Info
            icon={<BookOpen size={18} />}
            title="Subject"
            value="Operating System"
          />

          <Info
            icon={<Languages size={18} />}
            title="Language"
            value="English"
          />

          <Info
            icon={<Calendar size={18} />}
            title="Semester"
            value="Semester 5"
          />

          <Info
            icon={<HardDrive size={18} />}
            title="File Size"
            value="4.2 MB"
          />

          <Info
            icon={<User size={18} />}
            title="Uploaded By"
            value="Ganesh Mishra"
          />

        </div>

        {/* Statistics */}

        <div className="mt-8 rounded-2xl bg-slate-50 p-4">

          <div className="grid grid-cols-3 text-center">

            <div>

              <h3 className="text-xl font-bold text-slate-800">
                85
              </h3>

              <p className="text-sm text-slate-500">
                Pages
              </p>

            </div>

            <div>

              <h3 className="text-xl font-bold text-slate-800">
                8.5K
              </h3>

              <p className="text-sm text-slate-500">
                Views
              </p>

            </div>

            <div>

              <h3 className="text-xl font-bold text-slate-800">
                2.4K
              </h3>

              <p className="text-sm text-slate-500">
                Downloads
              </p>

            </div>

          </div>

        </div>

        {/* Description */}

        <p className="mt-8 text-slate-600 leading-7">
          Complete handwritten Operating System notes
          covering Processes, CPU Scheduling, Deadlocks,
          Memory Management, Virtual Memory and File
          Systems.
        </p>

        {/* Footer */}

        <div className="mt-8 flex flex-col sm:flex-row gap-4">

          <Link
            href="/notes/1"
            className="flex-1 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-blue-700 font-semibold flex items-center justify-center gap-2 hover:bg-blue-100 transition"
          >
            <Eye size={18} />
            Preview
          </Link>

          <button className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-5 py-3 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
            <Download size={18} />
            Download
          </button>

        </div>

        {/* Details */}

        <Link
          href="/notes/1"
          className="mt-5 flex items-center justify-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
        >
          View Full Details
          <ArrowRight size={18} />
        </Link>

      </div>
      <button
  // onClick={() => openChat({ noteId: note.id, noteTitle: note.title })}
  className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition"
>
  <Sparkles size={14} />
  Ask AI
</button>
    </motion.div>
  );
};

interface InfoProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function Info({
  icon,
  title,
  value,
}: InfoProps) {
  return (
    <div className="flex gap-3">

      <div className="mt-1 text-blue-600">
        {icon}
      </div>

      <div>

        <p className="text-xs text-slate-500">
          {title}
        </p>

        <h4 className="font-semibold text-slate-800">
          {value}
        </h4>

      </div>

    </div>
  );
}

export default NoteCard;