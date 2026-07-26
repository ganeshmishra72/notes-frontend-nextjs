"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/Authhooks";
 

const Login = () => {
  const router=useRouter();
   const { mutate,isPending,isError,error}= useLogin();
  const [showPassword, setShowPassword] = useState(false);
    
  const formik=useFormik({
    initialValues:{email:"",password:""},
     validate: (values) => {
    const errors :any= {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Enter a valid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  },
    onSubmit:(values)=>{
      mutate(values,{
        onSuccess:()=>{
          router.push("/")
          router.refresh();
        }
      })
    }
  })

  const apiError=error as any
 const emailNotVerified =
  
  apiError?.response?.data?.error ===
    "Email is Not Verified Please Verify Your Email";


  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-blue-100 to-slate-100 flex items-center justify-center px-6 py-10 overflow-hidden relative">

      {/* Background Blur */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-sky-300/30 blur-3xl animate-pulse"></div>

      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl animate-pulse"></div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT SECTION */}

        <motion.div
        
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="hidden lg:flex flex-col justify-center bg-linear-to-br from-blue-600 to-sky-500 text-white p-16 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full"></div>

          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full"></div>

          <BookOpen size={65} />

          <h1 className="text-5xl font-bold mt-8 leading-tight">
            Welcome Back
          </h1>

          <p className="mt-6 text-blue-100 text-lg leading-8">
            Continue your learning journey with thousands of Notes,
            Assignments, PYQs, Handwritten Notes and Study Materials.
          </p>

          <div className="mt-12 space-y-4">

            <div className="flex items-center gap-3">
              ✅ High Quality Notes
            </div>

            <div className="flex items-center gap-3">
              ✅ Previous Year Papers
            </div>

            <div className="flex items-center gap-3">
              ✅ Completely Free Resources
            </div>

          </div>
        </motion.div>

        {/* RIGHT SECTION */}

        <motion.form
          onSubmit={formik.handleSubmit}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="p-10 lg:p-14 flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold text-slate-800">
            Login
          </h2>

          <p className="text-slate-500 mt-3">
            Login to access your study resources.
          </p>

          {/* GOOGLE */}

          <button
            className="mt-8 w-full border text-black border-slate-300 rounded-xl h-12 flex items-center justify-center gap-3 hover:bg-slate-50 transition font-medium   "
             onClick={() => {
    window.location.href =
      "http://localhost:8082/oauth2/authorization/google";
  }}
          >
             <FcGoogle className="text-2xl" />

            Continue with Google
          </button>

          <div className="flex items-center my-8">

            <div className="flex-1 h-px bg-slate-300"></div>

            <span className="px-4 text-slate-500 text-sm">
              OR
            </span>

            <div className="flex-1 h-px bg-slate-300"></div>

          </div>

          {/* EMAIL */}

          <label className="text-sm font-medium mb-2 text-black">
            Email
          </label>

          <div className="relative">

            <Mail
              className="absolute left-4 top-3.5 text-slate-400"
              size={20}
            />

            <input
            onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full text-black h-12 border rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />{formik.touched.email && formik.errors.email && (
  <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
)}

          </div>

          {/* PASSWORD */}

          <label className="text-sm font-medium mt-6 mb-2 text-black">
            Password
          </label>

          <div className="relative">

            <Lock
              className="absolute left-4 top-3.5 text-slate-400"
              size={20}
            />

            <input
            onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                onBlur={formik.handleBlur}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full h-12 text-black border rounded-xl pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500 transition"
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

          <div className="flex justify-end mt-3">

            <Link
              href="/forgot-password"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          {/* LOGIN */}
                {
                  emailNotVerified ?
                  <div>
                     <p className="text-center mt-8 text-slate-600">

            Email Not verfiy  ?

            <Link
              href="/verify-otp"
              className="text-blue-600 font-semibold ml-2 hover:underline"
            >
              Verfiy-Email
            </Link>

          </p>
                  </div>
                  :
                  <div> 
                   <motion.button
           disabled={isPending || !(formik.isValid && formik.dirty)}

        
        type="submit"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  className="group mt-8 w-full h-12 rounded-xl bg-linear-to-r from-blue-600 to-sky-500 text-white font-semibold overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
>
  <div className="flex items-center justify-center gap-2 h-full">
    <motion.span
      className="flex items-center gap-2"
      whileHover={{ x: 5 }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 18,
      }}
    >
      Login
      <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
    </motion.span>
  </div>
</motion.button>
 <p className="text-center mt-8 text-slate-600">

            Don't have an account?

            <Link
              href="/register"
              className="text-blue-600 font-semibold ml-2 hover:underline"
            >
              Register
            </Link>

          </p>
          </div>
                }
       

         

        </motion.form>

      </div>
    </div>
  );
};

export default Login;