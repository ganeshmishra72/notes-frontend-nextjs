
"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";

const notes = [
  {
    id: 1,
    title: "Operating System Notes",
    university: "SPPU",
    owner: "Ganesh Mishra",
    downloads: 1520,
    views: 4321,
    type: "PDF",
  },
  {
    id: 2,
    title: "DBMS Notes",
    university: "Mumbai University",
    owner: "Rahul Sharma",
    downloads: 980,
    views: 2980,
    type: "PDF",
  },
  {
    id: 3,
    title: "Java Notes",
    university: "GTU",
    owner: "Priya Patel",
    downloads: 770,
    views: 1830,
    type: "PDF",
  },
  {
    id: 4,
    title: "Computer Networks",
    university: "AKTU",
    owner: "Amit Singh",
    downloads: 690,
    views: 1610,
    type: "PDF",
  },
];

export default function RecentNotes() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b p-6">
        <div>
          <h2 className="text-2xl font-bold">
            Recent Notes
          </h2>

          <p className="text-slate-500 mt-1">
            Latest uploaded study materials
          </p>
        </div>

        <button className="text-blue-600 font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left">
                Note
              </th>

              <th className="text-left">
                University
              </th>

              <th className="text-left">
                Owner
              </th>

              <th className="text-center">
                Downloads
              </th>

              <th className="text-center">
                Views
              </th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {notes.map((note) => (

              <tr
                key={note.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">

                      <FileText className="text-red-500" />

                    </div>

                    <div>

                      <h4 className="font-semibold">
                        {note.title}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {note.type}
                      </p>

                    </div>

                  </div>

                </td>

                <td>{note.university}</td>

                <td>{note.owner}</td>

                <td className="text-center">
                  {note.downloads}
                </td>

                <td className="text-center">
                  {note.views}
                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition">

                      <Eye className="mx-auto" size={18} />

                    </button>

                    <button className="w-9 h-9 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition">

                      <Download className="mx-auto" size={18} />

                    </button>

                    <button className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-800 hover:text-white transition">

                      <ExternalLink className="mx-auto" size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </motion.div>
  );
}