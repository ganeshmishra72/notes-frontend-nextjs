import React from "react";
import Layout from "./Layout";
import { BookOpen, Search, Download, ShieldCheck } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <Layout>
      <main className="bg-slate-50">

        {/* ================= HERO SECTION ================= */}

        <section className="relative overflow-hidden pt-36 pb-24">

          {/* Background Blur */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-sky-300/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 blur-3xl rounded-full"></div>

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-16">

            {/* Left */}

            <div>

              <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium">
                📚 India's Smart Notes Platform
              </span>

              <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                Find the Right
                <span className="text-blue-600"> Study Notes </span>
                in Seconds.
              </h1>

              <p className="mt-6 text-lg text-slate-600 leading-8">
                Search and download Notes, Assignments,
                Previous Year Papers, Lab Manuals and Study
                Resources from your University, Branch,
                Semester and Subject.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">

                <Link
                  href="/notes"
                  className="px-7 py-3 rounded-full bg-linear-to-r from-blue-600 to-sky-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                  Browse Notes
                </Link>

                <Link
                  href="/register"
                  className="px-7 py-3 rounded-full border border-slate-300 hover:border-blue-600 hover:text-blue-600 transition text-gray-700"
                >
                  Get Started
                </Link>

              </div>

            </div>

            {/* Right */}

            <div className="flex justify-center">

              <div className="bg-white rounded-3xl shadow-2xl border p-8 w-full max-w-md">

                <BookOpen className="text-blue-600" size={55} />

                <h3 className="mt-6 text-2xl font-bold text-gray-700">
                  25,000+ Study Resources
                </h3>

                <p className="text-slate-600 mt-3">
                  Notes, PDFs, PYQs, Assignments and Lab
                  Manuals uploaded by students and faculty.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">

                  <div className="rounded-xl bg-slate-100 p-4 text-center">
                    <h2 className="font-bold text-blue-600 text-2xl ">
                      150+
                    </h2>
                    <p className="text-sm">Universities</p>
                  </div>

                  <div className="rounded-xl bg-slate-100 p-4 text-center">
                    <h2 className="font-bold text-blue-600 text-2xl">
                      500+
                    </h2>
                    <p className="text-sm">Subjects</p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ================= SEARCH CTA ================= */}

        <section className="pb-20">

          <div className="max-w-6xl mx-auto px-6">

            <div className="bg-linear-to-r from-blue-600 to-sky-500 rounded-3xl p-10 text-white">

              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

                <div>

                  <h2 className="text-3xl font-bold">
                    Looking for Notes?
                  </h2>

                  <p className="mt-3 text-blue-100">
                    Search notes by University, Branch,
                    Semester, Subject and Academic Year.
                  </p>

                </div>

                <Link
                  href="/notes"
                  className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition"
                >
                  <Search size={18} />
                  Search Notes
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* ================= FEATURES ================= */}

        <section className="pb-24">

          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center">

              <h2 className="text-4xl font-bold text-slate-900">
                Why Choose NotesHub?
              </h2>

              <p className="text-slate-600 mt-3">
                Everything you need to prepare for exams.
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-14 ">

              <FeatureCard
                icon={<BookOpen size={40} />}
                title="Verified Notes"
                desc="Access high-quality handwritten and faculty-approved notes."
                
              />

              <FeatureCard
                icon={<Download size={40} />}
                title="Instant Download"
                desc="Download PDFs, Assignments and Previous Year Papers anytime."
              />

              <FeatureCard
                icon={<ShieldCheck size={40} />}
                title="Trusted Platform"
                desc="Organized resources for Universities, Boards and Colleges."
              />

            </div>

          </div>

        </section>

        <section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">
      <h2 className="text-4xl font-bold text-gray-700">
        Popular Study Resources
      </h2>

      <p className="text-slate-500 mt-3 text-gray-700">
        Download notes uploaded by students and faculty.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {[
        {
          title: "Operating System Notes",
          university: "SPPU",
          semester: "Semester 5",
          subject: "Operating System",
          pages: "128 Pages",
        },
        {
          title: "DBMS Handwritten Notes",
          university: "Mumbai University",
          semester: "Semester 4",
          subject: "DBMS",
          pages: "95 Pages",
        },
        {
          title: "Java Programming Notes",
          university: "AKTU",
          semester: "Semester 3",
          subject: "Java",
          pages: "150 Pages",
        },
      ].map((note) => (
        <div
          key={note.title}
          className="rounded-3xl border bg-white p-6 shadow-sm hover:shadow-xl transition"
        >
          <div className="aspect-[4/5] rounded-2xl bg-linear-to-br from-blue-600 to-sky-400 flex items-center justify-center text-white text-5xl">
            📄
          </div>

          <h3 className="mt-5 text-xl font-bold text-gray-700">
            {note.title}
          </h3>

          <div className="mt-4 text-sm text-slate-500 space-y-2">
            <p>🎓 {note.university}</p>
            <p>📚 {note.semester}</p>
            <p>📖 {note.subject}</p>
            <p>📄 {note.pages}</p>
          </div>

          <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700 transition">
            Preview PDF
          </button>
        </div>
      ))}
    </div>
  </div>
</section>


      </main>
    </Layout>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureCard = ({ icon, title, desc }: FeatureProps) => {
  return (
    <div className="bg-white rounded-3xl border p-8 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2">

      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mt-6 text-gray-700">
        {title}
      </h3>

      <p className="mt-3 text-slate-600 leading-7">
        {desc}
      </p>

    </div>
  );
};

export default Home;