"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Shield,
  UserCheck,
} from "lucide-react";

const users = [
  {
    id: 1,
    name: "Ganesh Mishra",
    email: "ganesh@gmail.com",
    role: "Admin",
    joined: "Today",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    role: "Student",
    joined: "Yesterday",
  },
  {
    id: 3,
    name: "Priya Patel",
    email: "priya@gmail.com",
    role: "Faculty",
    joined: "2 days ago",
  },
  {
    id: 4,
    name: "Amit Singh",
    email: "amit@gmail.com",
    role: "Student",
    joined: "4 days ago",
  },
];

export default function RecentUsers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b p-6">

        <div>

          <h2 className="text-2xl font-bold">
            Recent Users
          </h2>

          <p className="text-slate-500 mt-1">
            Newly registered users
          </p>

        </div>

        <button className="text-blue-600 font-medium hover:underline">
          View All
        </button>

      </div>

      <div className="divide-y">

        {users.map((user) => (

          <div
            key={user.id}
            className="flex items-center justify-between p-5 hover:bg-slate-50 transition"
          >

            <div className="flex items-center gap-4">

              <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center text-xl font-bold">
                {user.name.charAt(0)}
              </div>

              <div>

                <h3 className="font-semibold">
                  {user.name}
                </h3>

                <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">

                  <Mail size={14} />

                  {user.email}

                </div>

              </div>

            </div>

            <div className="text-right">

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                  user.role === "Admin"
                    ? "bg-purple-100 text-purple-700"
                    : user.role === "Faculty"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                <Shield size={14} />
                {user.role}
              </span>

              <p className="mt-2 text-sm text-slate-500">
                <UserCheck
                  size={14}
                  className="inline mr-1"
                />
                Joined {user.joined}
              </p>

            </div>

          </div>

        ))}

      </div>

    </motion.div>
  );
}