"use client";

import { useState } from "react";
 
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
 
// import CategoryTabs from "@/components/notes/CategoryTabs";
// import Pagination from "@/components/notes/Pagination";
import Layout from "../Home/Layout";
import NoteCard from "./NoteCard";
import CategoryTabs from "./Category";
import Pagination from "./Pagination";
import { getAllBranche, getALLSemester, getAllSubject, getAllUniversity } from "@/util/UniversityService";
import { useNotesFilter } from "@/hooks/Noteshooks";

const Notes = () => {
  const [filter, setFilter] = useState({
    universityId: "",
    semesterId: "",
    subjectId: "",
    courseId: "",
    branchId: "",
    keyWord: "",
});

const handelReset=()=>{
  setFilter({
     universityId: "",
    semesterId: "",
    subjectId: "",
    courseId: "",
    branchId: "",
    keyWord: "",
  })
}


const {data}=getAllUniversity()
const {data:semester}=getALLSemester()
const {data:subject}=getAllSubject()
const {data:bracnh}=getAllBranche()
const {mutate}=useNotesFilter()

const handelSearch=()=>{
 mutate(filter)
  
}

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pt-32 pb-20">

        {/* Hero */}

        <section className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-medium">
              📚 Study Resources
            </span>

            <h1 className="text-5xl font-bold mt-6 text-gray-700">
              Find Your Study Notes
            </h1>

            <p className="mt-5 text-slate-600 max-w-3xl mx-auto text-lg">
              Search from thousands of Notes, Question Papers,
              Books, PPTs and Assignments uploaded by
              students and faculty.
            </p>

          </div>

        </section>

        {/* Search */}

        <section className="max-w-7xl mx-auto px-6 mt-14">

          <div className="bg-white rounded-3xl border shadow-sm p-8">

            <div className="grid lg:grid-cols-5 gap-5">

              {/* Search */}

              <div className="lg:col-span-2 relative">

                <Search
                  size={20}
                  className="absolute left-4 top-4 text-slate-400"
                />

                <input
                  value={filter.keyWord}
                  onChange={(e) =>
                    setFilter({...filter,keyWord:e.target.value})
                  }
                  placeholder="Search Notes..."
                  className="w-full h-12 border rounded-xl pl-12 outline-none focus:ring-2 focus:ring-blue-500 border-slate-300 text-gray-700"
                />

              </div>

              <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700" value={filter.universityId} onChange={(e)=>setFilter({...filter,universityId:e.target.value})}>
                 <option >Select University</option>
                {data?.map((item:any)=>(
                  <option key={item.id} value={item.id}>{item.universityName}</option>
                ))}
              </select>

              <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700" value={filter.semesterId} onChange={(e)=>setFilter({...filter,semesterId:e.target.value})}>
                <option >Select Semester</option>
                {semester?.map((item:any)=>(
                  <option key={item.id} value={item.id}>{item.semesterName}</option>
                ))}
              </select>

              <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700" value={filter.subjectId} onChange={(e)=>setFilter({...filter,subjectId:e.target.value})}>
                <option >Select Subject</option>
                {subject?.map((item:any)=>(
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>

            </div>

            <div className="grid lg:grid-cols-6 gap-5 mt-5">

              <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700" value={filter.branchId} onChange={(e)=>setFilter({...filter,branchId:e.target.value})}>
                <option >Select Branch</option>
                {bracnh?.map((item:any)=>(
                  <option key={item.id} value={item.id}>{item.branchName}</option>
                ))}
              </select>

              {/* <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700">
                <option>Unit</option>
              </select>

              <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700">
                <option>Language</option>
              </select>

              <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700">
                <option>File Type</option>
              </select> */}

              <button onClick={()=>handelSearch()} className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold hover:opacity-90 transition">
                Search
              </button>

              <button onClick={()=>handelReset()} className="h-12 rounded-xl border flex justify-center items-center gap-2 hover:bg-slate-100 text-red-600">

                <RotateCcw size={18} />

                Reset

              </button>

            </div>

          </div>

        </section>

        {/* Categories */}

        <section className="max-w-7xl mx-auto px-6 mt-10">

          <CategoryTabs />

        </section>

        {/* Results */}

        <section className="max-w-7xl mx-auto px-6 mt-12">

          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">

            <div>

              <h2 className="text-2xl font-bold text-gray-600">
                Available Notes
              </h2>

              <p className="text-slate-500">
                Showing 1-10 of 2450 Resources
              </p>

            </div>

            <div className="flex gap-4">

              <button className="border rounded-xl px-5 h-11 flex items-center gap-2 text-blue-600">

                <SlidersHorizontal size={18} />

                Filters

              </button>

              <select className="border rounded-xl px-5 text-gray-600">

                <option>Newest</option>

                <option>Most Downloaded</option>

                <option>Highest Rated</option>

              </select>

            </div>

          </div>

          {/* Cards */}

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            <NoteCard />

            <NoteCard />

            <NoteCard />

            <NoteCard />

            <NoteCard />

            <NoteCard />

          </div>

          <div className="mt-16">

            <Pagination />

          </div>

        </section>

      </div>
    </Layout>
  );
};

export default Notes;