"use client";

import React, { useEffect, useState } from "react";
 
import {
  Search,
  MapPin,
  Globe,
  Mail,
  Phone,
  Building2,
  Calendar,
  BookOpen,
} from "lucide-react";
import Layout from "../Home/Layout";
import { useQuery } from "@tanstack/react-query";
import { getUniversities } from "@/service/UniversityService";
import Authstore from "@/store/AuthStore";

interface University {
  id: string;
  universityName: string;
  universityCOde: string;
  shortName: string;
  state: string;
  city: string;
  pincode: string;
  type: string;
  website: string;
  email: string;
  phoneNumber: string;
  logoUrl: string;
  establisYear: string;
}



const University = () => {
  const [search, setSearch] = useState("");
  const token=Authstore(s=>s.accessToken)
  const { data = [] } = useQuery({
  queryKey: ["university"],
  queryFn: getUniversities,
  enabled: !!token,
  retry: 1,
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: false,
});

const filtered = data.filter((u: University) =>
  u.universityName.toLowerCase().includes(search.toLowerCase()) ||
  u.shortName.toLowerCase().includes(search.toLowerCase()) ||
  u.city.toLowerCase().includes(search.toLowerCase()) ||
  u.state.toLowerCase().includes(search.toLowerCase())
);
 

  return (
    
    <Layout>
       
      <div className="bg-slate-50 min-h-screen pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}

          <div className="text-center mb-12">

            <h1 className="text-5xl font-bold text-slate-900">
              Explore Universities
            </h1>

            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Browse universities and download notes,
              assignments, previous year papers and
              study resources.
            </p>

          </div>

{/* ================= Statistics ================= */}

<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

  <StatCard
    title="Universities"
    value="150+"
    color="text-blue-600"
    />

  <StatCard
    title="Branches"
    value="800+"
    color="text-sky-600"
  />

  <StatCard
    title="Subjects"
    value="5,000+"
    color="text-indigo-600"
    />

  <StatCard
    title="Study Notes"
    value="25K+"
    color="text-emerald-600"
    />

</div>
    {/* Search */}
          {/* ================= Search + Filters ================= */}

<div className="bg-white rounded-3xl shadow-sm border p-6 mb-12">

  <div className="grid lg:grid-cols-4 gap-4">

    <div className="relative">

      <Search
        className="absolute left-4 top-4 text-slate-400"
        size={18}
      />

      <input
        placeholder="Search University..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-12 border  rounded-xl pl-11 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 border-slate-300"
      />

    </div>

    <select className="h-12 border rounded-xl px-4 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 border-slate-300">

      <option>All States</option>
      <option>Maharashtra</option>
      <option>Delhi</option>
      <option>Gujarat</option>
      <option>Karnataka</option>

    </select>

    <select className="h-12 border rounded-xl px-4 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 border-slate-300">

      <option>University Type</option>
      <option>Government</option>
      <option>Private</option>
      <option>Autonomous</option>

    </select>

    <button className="rounded-xl bg-gradient-to-r p-4 lg:p-0 from-blue-600 to-sky-500 text-white font-semibold hover:opacity-90 transition">
      Search
    </button>

  </div>

</div>

          {/* Cards */}

          <div className="grid lg:grid-cols-2 gap-8">

            {filtered.map((u:any) => (

              <div
                key={u.id}
                className="bg-white rounded-3xl border shadow-sm hover:shadow-xl transition p-6"
              >

                <div className="flex gap-5 flex-col md:flex-row">

                  <img
                    src={u.logoUrl}
                    alt={u.universityName}
                    className="w-24 h-24 rounded-2xl object-cover border"
                  />

                  <div className="flex-1">

                    <div className="flex justify-between items-start">

                      <div>

                        <h2 className="text-2xl font-bold text-gray-700">
                          {u.universityName}
                        </h2>

                        <p className="text-blue-600 font-semibold">
                          {u.shortName}
                        </p>

                      </div>

                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                        {u.type}
                      </span>

                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-6 text-slate-600 text-sm">

                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        {u.city}, {u.state}
                      </div>

                      <div className="flex items-center gap-2">
                        <Building2 size={18} />
                        {u.universityCOde}
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        Est. {u.establisYear}
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone size={18} />
                        {u.phoneNumber}
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail size={18} />
                        {u.email}
                      </div>

                      <div className="flex items-center gap-2">
                        <Globe size={18} />
                        <a
                          href={u.website}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Website
                        </a>
                      </div>

                    </div>

                    <div className="flex gap-4 mt-8">

                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-xl py-3 font-semibold hover:opacity-90 transition">
                        View Notes
                      </button>

                      <button className="flex items-center justify-center w-14 rounded-xl border hover:bg-blue-50 transition text-blue-600">
                        <BookOpen />
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">

              <BookOpen
                size={60}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-6 text-2xl font-bold">
                No University Found
              </h3>

              <p className="text-slate-500 mt-2">
                Try another search keyword.
              </p>

            </div>
          )}

        </div>

      </div>
    </Layout>
  );
};

export default University;

interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

function StatCard({
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition">

      <h2 className={`text-3xl font-bold ${color}`}>
        {value}
      </h2>

      <p className="text-slate-500 mt-2">
        {title}
      </p>

    </div>
  );
}