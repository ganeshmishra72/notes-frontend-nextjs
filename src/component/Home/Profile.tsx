"use client";

import { getProfile } from "@/service/UserService";
import Authstore from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  Download,
  Upload,
  Bookmark,
  Pencil,
  Settings,
  FileText,
  Award,
} from "lucide-react";
import Link from "next/link";
import { BsBackspace } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

const stats = [
  {
    title: "Downloads",
    value: "124",
    icon: Download,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Uploads",
    value: "18",
    icon: Upload,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Bookmarks",
    value: "42",
    icon: Bookmark,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Certificates",
    value: "03",
    icon: Award,
    color: "bg-purple-100 text-purple-600",
  },
];

const Profile = () => {
   const token: any = Authstore(sta => sta.refreshToken)
  const {data} =useQuery({
    queryFn:getProfile,
    queryKey:["profile"],
    enabled:!!token
  })

  console.log(data);
  
  
  return (
    <div className="min-h-screen bg-slate-50  pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Profile Header */}
        <Link href={"/"}className="text-gray-700 font-bold text-lg
         flex items-center gap-1 pb-6">
         <FaHome />Home
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-blue-600 to-sky-500 text-white p-8 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div className="flex items-center gap-6 flex-col lg:flex-row">

              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-xl">
                <User size={55} className="text-blue-600" />
              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  Ganesh Mishra
                </h1>

                <p className="mt-2 text-blue-100">
                  Computer Engineering Student
                </p>

                <div className="flex flex-wrap gap-3 mt-5">

                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                    SPPU
                  </span>

                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                    Semester 6
                  </span>

                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                    Active Learner
                  </span>

                </div>

              </div>

            </div>

            <button className="bg-white text-blue-600 rounded-xl px-6 py-3 font-semibold flex items-center gap-2 hover:scale-105 transition">
              <Pencil size={18} />
              Edit Profile
            </button>

          </div>
        </motion.div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 ">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                whileHover={{ y: -5 }}
                key={item.title}
                className="bg-white rounded-3xl p-6 shadow-sm border"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
                >
                  <Icon size={28} />
                </div>

                <h2 className="mt-6 text-3xl font-bold text-gray-700">
                  {item.value}
                </h2>

                <p className="text-slate-500">
                  {item.title}
                </p>
              </motion.div>
            );
          })}

        </div>

        {/* Main Section */}

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          {/* Personal Info */}

          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border">

            <h2 className="text-2xl font-bold mb-8 text-gray-700">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <InfoCard icon={<User />} label="Full Name" value="Ganesh Mishra" />

              <InfoCard icon={<Mail />} label="Email" value="ganesh@gmail.com" />

              <InfoCard icon={<Phone />} label="Phone" value="+91 9876543210" />

              <InfoCard
                icon={<Building2 />}
                label="University"
                value="Savitribai Phule Pune University"
              />

              <InfoCard
                icon={<GraduationCap />}
                label="Branch"
                value="Computer Engineering"
              />

              <InfoCard
                icon={<Calendar />}
                label="Semester"
                value="Semester 6"
              />

            </div>

          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-3xl p-8 shadow-sm border">

            <h2 className="text-2xl font-bold mb-8 text-gray-700">
              Quick Actions
            </h2>

            <div className="space-y-4">

              <ActionButton
                icon={<Upload />}
                title="Upload Notes"
              />

              <ActionButton
                icon={<Download />}
                title="My Downloads"
              />

              <ActionButton
                icon={<Bookmark />}
                title="Saved Notes"
              />

              <ActionButton
                icon={<FileText />}
                title="My Uploads"
              />

              <ActionButton
                icon={<Settings />}
                title="Account Settings"
              />

            </div>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="bg-white rounded-3xl p-8 shadow-sm border mt-10">

          <h2 className="text-2xl font-bold mb-8 text-gray-700">
            Recent Activity
          </h2>

          <div className="space-y-5">

            <Activity
              title="Downloaded Java Programming Notes"
              time="2 hours ago"
            />

            <Activity
              title="Bookmarked Operating System Notes"
              time="Yesterday"
            />

            <Activity
              title="Downloaded DBMS Question Bank"
              time="2 days ago"
            />

            <Activity
              title="Uploaded CN Lab Manual"
              time="Last Week"
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border p-5 bg-slate-50">
      <div className="text-blue-600">{icon}</div>
      <p className="text-sm text-slate-500 mt-2">{label}</p>
      <h3 className="font-semibold text-lg text-slate-800">{value}</h3>
    </div>
  );
}

function ActionButton({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <button className="w-full rounded-2xl border p-4 flex items-center gap-4 hover:bg-blue-50 hover:border-blue-500 transition">
      <div className="text-blue-600">{icon}</div>
      <span className="font-medium text-slate-700">{title}</span>
    </button>
  );
}

function Activity({
  title,
  time,
}: {
  title: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between border rounded-2xl p-5 hover:bg-slate-50 transition">
      <div>
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{time}</p>
      </div>

      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
    </div>
  );
}