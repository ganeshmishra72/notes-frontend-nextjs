"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Save,
  ShieldCheck,
  Moon,
  Sun,
  Laptop,
  AlertTriangle,
  Globe,
  Server,
} from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("system");

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your profile, security and application preferences.
        </p>
      </div>

      {/* Profile */}

      <section className="rounded-3xl bg-white border p-8 shadow-sm">

        <div className="flex items-center gap-3 mb-8">

          <User className="text-blue-600" />

          <h2 className="text-2xl font-semibold">
            Profile
          </h2>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <Input
            icon={<User size={18} />}
            label="Full Name"
            placeholder="Ganesh Mishra"
          />

          <Input
            icon={<Mail size={18} />}
            label="Email"
            placeholder="admin@example.com"
          />

          <Input
            icon={<Phone size={18} />}
            label="Phone"
            placeholder="+91 9876543210"
          />

          <Input
            icon={<Globe size={18} />}
            label="Website"
            placeholder="https://example.com"
          />

        </div>

        <div className="mt-8">

          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition">

            <Save size={18} />

            Save Profile

          </button>

        </div>

      </section>

      {/* Security */}

      <section className="rounded-3xl bg-white border p-8 shadow-sm">

        <div className="flex items-center gap-3 mb-8">

          <ShieldCheck className="text-green-600" />

          <h2 className="text-2xl font-semibold">
            Security
          </h2>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <Input
            icon={<Lock size={18} />}
            type="password"
            label="Current Password"
            placeholder="********"
          />

          <Input
            icon={<Lock size={18} />}
            type="password"
            label="New Password"
            placeholder="********"
          />

          <Input
            icon={<Lock size={18} />}
            type="password"
            label="Confirm Password"
            placeholder="********"
          />

        </div>

        <button className="mt-8 rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition">
          Update Password
        </button>

      </section>

      {/* Appearance */}

      <section className="rounded-3xl bg-white border p-8 shadow-sm">

        <div className="flex items-center gap-3 mb-8">

          <Sun className="text-yellow-500" />

          <h2 className="text-2xl font-semibold">
            Appearance
          </h2>

        </div>

        <div className="flex flex-wrap gap-4">

          <ThemeButton
            active={theme === "light"}
            onClick={() => setTheme("light")}
            icon={<Sun />}
            title="Light"
          />

          <ThemeButton
            active={theme === "dark"}
            onClick={() => setTheme("dark")}
            icon={<Moon />}
            title="Dark"
          />

          <ThemeButton
            active={theme === "system"}
            onClick={() => setTheme("system")}
            icon={<Laptop />}
            title="System"
          />

        </div>

      </section>

      {/* System Info */}

      <section className="rounded-3xl bg-white border p-8 shadow-sm">

        <div className="flex items-center gap-3 mb-8">

          <Server className="text-indigo-600" />

          <h2 className="text-2xl font-semibold">
            System Information
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <Info title="Application" value="NotesHub Admin" />

          <Info title="Version" value="v1.0.0" />

          <Info title="Environment" value="Production" />

          <Info title="API Status" value="🟢 Online" />

        </div>

      </section>

      {/* Danger Zone */}

      <section className="rounded-3xl border border-red-200 bg-red-50 p-8">

        <div className="flex items-center gap-3 mb-4">

          <AlertTriangle className="text-red-600" />

          <h2 className="text-2xl font-semibold text-red-700">
            Danger Zone
          </h2>

        </div>

        <p className="text-slate-600">
          Logging out will end your current admin session.
        </p>

        <button className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700 transition">
          Logout
        </button>

      </section>

    </div>
  );
}

interface InputProps {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
}

function Input({
  label,
  placeholder,
  icon,
  type = "text",
}: InputProps) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-slate-600">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-4">

        <div className="text-slate-400">
          {icon}
        </div>

        <input
          type={type}
          placeholder={placeholder}
          className="h-12 w-full bg-transparent outline-none"
        />

      </div>

    </div>
  );
}

interface ThemeButtonProps {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function ThemeButton({
  title,
  icon,
  active,
  onClick,
}: ThemeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border px-6 py-4 transition ${
        active
          ? "border-blue-600 bg-blue-50 text-blue-600"
          : "hover:bg-slate-50"
      }`}
    >
      {icon}
      {title}
    </button>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-semibold">
        {value}
      </h3>
    </div>
  );
}