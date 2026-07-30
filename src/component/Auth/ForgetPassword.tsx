"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useForgotPassword } from "@/hooks/Authhooks";

export default function ForgotPasswordPage() {

  const router = useRouter();

  const { mutate, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: (values) => {

      mutate(values.email, {

        onSuccess: () => {
          router.push("/reset-password");
        },

      });

    },

  });

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-blue-100 to-slate-100 flex items-center justify-center px-6 py-10">

       <motion.form
        onSubmit={formik.handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center"
      >
        <ShieldCheck size={50} className="text-blue-600" />

        <h2 className="text-3xl font-bold text-slate-800 mt-6 text-center">
          Enter  Your Email
        </h2>

        

        <input
           
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter Email"
          className="w-full mt-8 h-12 text-center tracking-widest text-lg text-black border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

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
      Send Verification Email
      <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
    </motion.span>
  </div>
</motion.button>
 
      </motion.form>

    </div>
  );

}