"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
   
} from "lucide-react";

import Layout from "./Layout";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <Layout>
      <main className="bg-slate-50 pt-32">

        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden">

          <div className="absolute -top-20 left-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />

          <div className="max-w-7xl mx-auto px-6 text-center">

            <motion.span
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-blue-100 text-blue-700 px-4 py-2 font-medium"
            >
              📩 Contact NotesHub
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-5xl font-bold text-slate-900"
            >
              We'd Love to Hear
              <span className="text-blue-600"> From You</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-slate-600 text-lg leading-8"
            >
              Have questions, suggestions, or found an issue?
              Contact our team and we'll get back to you as soon as possible.
            </motion.p>

          </div>

        </section>

        {/* ================= CONTENT ================= */}

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-10">

            {/* LEFT */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >

              <ContactCard
                icon={<Mail />}
                title="Email"
                value="raghvendra0550@gmail.com"
              />

              <ContactCard
                icon={<Phone />}
                title="Phone"
                value="+91 86003 27769"
              />

              <ContactCard
                icon={<MapPin />}
                title="Location"
                value="Maharashtra, India"
              />

              <ContactCard
                icon={<Clock />}
                title="Working Hours"
                value="Mon - Sat (9:00 AM - 6:00 PM)"
              />

              <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-3xl p-6 text-white">

                <h3 className="text-xl font-bold">
                  Need Study Resources?
                </h3>

                <p className="mt-3 text-blue-100 leading-7">
                  We continuously upload Notes,
                  Previous Year Papers,
                  Assignments,
                  Lab Manuals,
                  and Study Materials.
                </p>

              </div>

            </motion.div>

            {/* RIGHT */}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white rounded-3xl shadow-lg border p-8"
            >

              <h2 className="text-3xl font-bold text-slate-900 ">
                Send a Message
              </h2>

              <p className="text-slate-500 mt-2">
                Fill out the form below and we'll respond shortly.
              </p>

              <form className="mt-8 space-y-6">

                <div className="grid md:grid-cols-2 gap-5">

                  <input
                    type="text"
                    placeholder="Your Name"
                    className="h-12 rounded-xl border px-4 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="h-12 rounded-xl border px-4 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />

                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full h-12 rounded-xl border px-4 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700"
                />

                <button
                  type="submit"
                  className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-8 py-3 font-semibold text-white transition hover:scale-105"
                >
                  Send Message

                  <Send
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />

                </button>

              </form>

            </motion.div>

          </div>

        </section>

        {/* ================= SUPPORT ================= */}

        <section className="pb-24">

          <div className="max-w-7xl mx-auto px-6">

            <div className="rounded-3xl bg-white border shadow-sm p-10 text-center">

              <h2 className="text-3xl font-bold text-slate-900">
                Connect With Us
              </h2>

              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                Follow us for updates about newly uploaded Notes,
                University Resources, Previous Year Papers and announcements.
              </p>

              <div className="flex justify-center gap-6 mt-8 text-gray-700">

                <SocialButton>
                  <FaGithub />
                </SocialButton>

                <SocialButton>
                  <FaLinkedin />
                </SocialButton>

              </div>

            </div>

          </div>

        </section>

      </main>
    </Layout>
  );
};

export default Contact;

function ContactCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white border p-6 shadow-sm hover:shadow-lg transition">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          {icon}
        </div>

        <div>

          <h3 className="font-semibold text-slate-900">
            {title}
          </h3>

          <p className="text-slate-500">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

function SocialButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow hover:bg-blue-600 hover:text-white transition">
      {children}
    </button>
  );
}