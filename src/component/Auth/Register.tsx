"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import { register } from "@/service/AuthService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Register = () => {
  const routure=useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending,setIsPending]=useState(false)
 const formik = useFormik({
  initialValues: { name: "", email: "", password: "", confirmPassword: "" },
  validate: (values) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Full Name is Required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Enter a valid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  },
  onSubmit:async (values) => {
     try {
      setIsPending(true);
      const result = await register(values);
      toast.success(result?.message || "OTP sent to your email");
      routure.push(`/verify-otp?email=${encodeURIComponent(values.email)}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setIsPending(false);
    }
  },
});

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-100 to-slate-100 flex items-center justify-center px-6 py-10 overflow-hidden relative">
      {/* Background */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl animate-pulse" />

      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-sky-500 text-white p-16 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/10" />
          <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-white/10" />

          <BookOpen size={65} />

          <h1 className="text-5xl font-bold mt-8 leading-tight">
            Join NotesHub
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-8">
            Create your account and unlock thousands of Notes,
            Assignments, Previous Year Papers, PDFs, and Study
            Resources—all in one place.
          </p>

          <div className="mt-12 space-y-4">
            <div>📚 Access Premium Notes</div>
            <div>📄 Download PDFs Anytime</div>
            <div>🎯 Learn Faster & Smarter</div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}

        <motion.form
        onSubmit={formik.handleSubmit}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="p-10 lg:p-14 flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold text-slate-800">
            Create Account
          </h2>

          <p className="text-slate-500 mt-2">
            Start your learning journey today.
          </p>

          {/* Google */}

          <button className="mt-8 text-black w-full border border-slate-300 rounded-xl h-12 flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-blue-500 transition-all duration-300 font-medium">
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* Divider */}

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-slate-300" />
            <span className="px-4 text-sm text-slate-500">
              OR
            </span>
            <div className="flex-1 h-px bg-slate-300" />
          </div>

          {/* Name */}

          <label className="font-medium mb-2 text-sm text-black">
            Full Name
          </label>

          <div className="relative">
            <User
              size={20}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
              type="text"
              onBlur={formik.handleBlur}
              placeholder="Enter full name"
              className="w-full text-black h-12 border rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.name && formik.errors.name && (
  <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
)}
          </div>

          {/* Email */}

          <label className="font-medium mt-5 mb-2 text-sm text-black">
            Email
          </label>

          <div className="relative">
            <Mail
              size={20}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
              type="email"
              onBlur={formik.handleBlur}
              placeholder="Enter email"
              className="w-full text-black h-12 border rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.email && formik.errors.email && (
  <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
)}
          </div>

          {/* Password */}

          <label className="font-medium mt-5 mb-2 text-sm text-black">
            Password
          </label>

          <div className="relative">
            <Lock
              size={20}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              className="w-full text-black h-12 border rounded-xl pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
            />
{formik.touched.password && formik.errors.password && (
  <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
)}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-black"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

        {/* Confirm Password */}

<label className="font-medium mt-5 mb-2 text-sm text-black">
  Confirm Password
</label>

<div className="relative">
  <Lock
    size={20}
    className="absolute left-4 top-3.5 text-slate-400"
  />

  <input
    name="confirmPassword"
    value={formik.values.confirmPassword}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm password"
    className="w-full text-black h-12 border rounded-xl pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
  )}

  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-4 top-3 text-black"
  >
    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>
          
          {/* Register Button */}

          <motion.button
          type="submit"
           disabled={isPending && !(formik.isValid && formik.dirty)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-8 w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold shadow-lg hover:shadow-blue-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex justify-center items-center gap-2 h-full">
              <motion.span
                whileHover={{ x: 5 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 18,
                }}
                className="flex items-center gap-2"
              >
                Create Account

                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </motion.span>
            </div>
          </motion.button>

          {/* Login */}

          <p className="text-center mt-8 text-slate-600">
            Already have an account?

            <Link
              href="/login"
              className="text-blue-600 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Register;