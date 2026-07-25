"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Download,
  Search,
  ShieldCheck,
  Users,
  FileText,
  ArrowRight,
  CheckCircle2,
  Target,
} from "lucide-react";
import Layout from "./Layout";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find notes instantly by University, Board, Branch, Semester, Subject and Academic Year.",
  },
  {
    icon: FileText,
    title: "Quality Resources",
    description:
      "Access handwritten notes, lecture notes, assignments, lab manuals and previous year papers.",
  },
  {
    icon: Download,
    title: "Instant Downloads",
    description:
      "Download PDFs quickly without wasting time searching across multiple websites.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Students and educators contribute quality study materials to help everyone learn better.",
  },
];

const steps = [
  "Choose your University or Board",
  "Select Branch & Semester",
  "Search your Subject",
  "Preview and Download Notes",
];

export default function About() {
  return (
    <Layout>
        <div className="bg-slate-50">

      {/* Hero */}

      <section className="pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-blue-700 font-medium">
              <BookOpen size={18} />
              About NotesHub
            </span>

            <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Making Study Resources
              <span className="text-blue-600"> Easy to Find</span>
            </h1>

            <p className="mt-8 max-w-3xl mx-auto text-lg text-slate-600 leading-8">
              NotesHub is a centralized Notes Provider platform that helps
              students quickly discover high-quality study resources including
              notes, assignments, previous year question papers, lab manuals,
              syllabi, and important questions—all organized in one place.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Mission */}

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center">
                <Target className="text-blue-600" size={40} />
              </div>

              <h2 className="mt-8 text-4xl font-bold text-gray-700">
                Our Mission
              </h2>

              <p className="mt-6 text-slate-600 leading-8">
                Students often spend hours searching across different websites,
                WhatsApp groups, Telegram channels and cloud drives just to find
                one set of notes.
              </p>

              <p className="mt-5 text-slate-600 leading-8">
                Our goal is to provide a single platform where students can
                search, preview and download academic resources within seconds.
              </p>

            </div>

            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-sky-500 text-white p-10 shadow-xl">

              <GraduationCap size={55} />

              <h3 className="text-3xl font-bold mt-6">
                Everything You Need
              </h3>

              <div className="space-y-5 mt-8">

                {[
                  "Study Notes",
                  "Assignments",
                  "Previous Year Papers",
                  "Lab Manuals",
                  "Question Banks",
                  "Important Questions",
                  "Syllabus",
                  "Project Reports",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} />
                    {item}
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Features */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <h2 className="text-4xl font-bold text-gray-700">
              What Our Platform Provides
            </h2>

            <p className="text-slate-600 mt-4">
              Built to make learning easier for every student.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 ">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  whileHover={{ y: -8 }}
                  className="rounded-3xl border bg-slate-50 p-8 hover:shadow-xl transition "
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <Icon className="text-blue-600" size={32} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-700">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-slate-600 leading-7">
                    {feature.description}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>

      </section>

      {/* How It Works */}

      <section className="py-24">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-gray-700">
            How It Works
          </h2>

          <p className="text-slate-600 mt-4">
            Find your study material in four simple steps.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-16">

            {steps.map((step, index) => (
              <div
                key={step}
                className="bg-white rounded-3xl p-8 shadow-sm border"
              >
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mx-auto">
                  {index + 1}
                </div>

                <p className="mt-6 font-semibold text-slate-700">
                  {step}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Why Choose */}

      <section className="py-24 bg-gradient-to-r from-blue-600 to-sky-500 text-white">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <ShieldCheck size={55} className="mx-auto" />

          <h2 className="text-4xl font-bold mt-6">
            Why Choose NotesHub?
          </h2>

          <p className="mt-6 text-blue-100 max-w-3xl mx-auto leading-8">
            We organize educational resources in a structured way so students
            can spend more time learning and less time searching. Our platform
            supports universities, boards, branches, semesters, academic years,
            and subjects, making navigation simple and efficient.
          </p>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24">

        <div className="max-w-5xl mx-auto px-6">

          <div className="rounded-3xl bg-white shadow-xl border p-12 text-center">

            <h2 className="text-4xl font-bold text-gray-700">
              Ready to Start Learning?
            </h2>

            <p className="text-slate-600 mt-4">
              Join thousands of students and explore organized study resources
              for your university, branch and semester.
            </p>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 mt-10 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-8 py-4 text-white font-semibold hover:scale-105 transition"
            >
              Create Free Account
              <ArrowRight size={20} />
            </Link>

          </div>

        </div>

      </section>

    </div>
    </Layout>
  );
}