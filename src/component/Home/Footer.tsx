"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative mt-24">

      {/* Top Border Gradient */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

            {/* Brand */}

            <div>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center shadow-lg">

                  <BookOpen className="text-white" size={24} />

                </div>

                <div>

                  <h2 className="text-2xl font-bold text-slate-800">
                    NotesHub
                  </h2>

                  <p className="text-sm text-slate-500">
                    Learn Smarter
                  </p>

                </div>

              </div>

              <p className="mt-6 text-slate-600 leading-7">
                One place for all your study resources.
                Search and download Notes, Assignments,
                Previous Year Papers, Lab Manuals,
                Question Banks and much more.
              </p>

            </div>

            {/* Quick Links */}

            <div>

              <h3 className="text-lg font-semibold text-slate-800 mb-5">
                Quick Links
              </h3>

              <div className="space-y-3">

                <FooterLink href="/">
                  Home
                </FooterLink>

                <FooterLink href="/notes">
                  Notes
                </FooterLink>

                <FooterLink href="/universities">
                  Universities
                </FooterLink>

                <FooterLink href="/boards">
                  Boards
                </FooterLink>

                <FooterLink href="/about">
                  About Us
                </FooterLink>

              </div>

            </div>

            {/* Resources */}

            <div>

              <h3 className="text-lg font-semibold text-slate-800 mb-5">
                Resources
              </h3>

              <div className="space-y-3">

                <FooterLink href="#">
                  Previous Year Papers
                </FooterLink>

                <FooterLink href="#">
                  Assignments
                </FooterLink>

                <FooterLink href="#">
                  Lab Manuals
                </FooterLink>

                <FooterLink href="#">
                  Syllabus
                </FooterLink>

                <FooterLink href="#">
                  Important Questions
                </FooterLink>

              </div>

            </div>

            {/* Contact */}

            <div>

              <h3 className="text-lg font-semibold text-slate-800 mb-5">
                Contact
              </h3>

              <div className="space-y-5">

                <div className="flex gap-3">

                  <Mail className="text-blue-600 mt-1" size={18} />

                  <span className="text-slate-600">
                    support@noteshub.com
                  </span>

                </div>

                <div className="flex gap-3">

                  <Phone className="text-blue-600 mt-1" size={18} />

                  <span className="text-slate-600">
                    +91 98765 43210
                  </span>

                </div>

                <div className="flex gap-3">

                  <MapPin className="text-blue-600 mt-1" size={18} />

                  <span className="text-slate-600">
                    Maharashtra, India
                  </span>

                </div>

              </div>

              {/* Social */}

              <div className="flex gap-4 mt-8">

                <SocialIcon>
                  <FaGithub />
                </SocialIcon>

                <SocialIcon>
                  <FaLinkedin />
                </SocialIcon>

                <SocialIcon>
                  <FaInstagram />
                </SocialIcon>

                <SocialIcon>
                  <FaTwitter />
                </SocialIcon>

              </div>

            </div>

          </div>

          {/* Bottom */}

          <div className="border-t border-slate-200 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">

            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} NotesHub.
              All Rights Reserved.
            </p>

            <div className="flex gap-6 text-sm">

              <Link
                href="#"
                className="text-slate-500 hover:text-blue-600 transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="text-slate-500 hover:text-blue-600 transition"
              >
                Terms of Service
              </Link>

              <Link
                href="#"
                className="text-slate-500 hover:text-blue-600 transition"
              >
                Cookies
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div whileHover={{ x: 5 }}>
      <Link
        href={href}
        className="text-slate-600 hover:text-blue-600 transition"
      >
        {children}
      </Link>
    </motion.div>
  );
}

function SocialIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.a
      whileHover={{
        y: -5,
        scale: 1.1,
      }}
      href="#"
      className="w-11 h-11 rounded-full bg-white shadow-md border flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-500 transition"
    >
      {children}
    </motion.a>
  );
}