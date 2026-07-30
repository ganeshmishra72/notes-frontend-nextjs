"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
 
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useResetPassword } from "@/hooks/Authhooks";
 

export default function ResetPasswordPage() {

  const router = useRouter();

  const { mutate, isPending } = useResetPassword();

  const formik = useFormik({

    initialValues: {

      token: "",

      newPassword: "",

    },

    onSubmit: (values) => {

      mutate(values, {

        onSuccess: () => {

          router.push("/login");

        },

      });

    },

  });

  return (

    <div className="flex justify-center items-center min-h-screen">

      <motion.form
        onSubmit={formik.handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center"
      >
        <ShieldCheck size={50} className="text-blue-600" />

        <h2 className="text-3xl font-bold text-slate-800 mt-6 text-center">
         Reset Password
        </h2>

        

        <input
          type="text"
          name="token"
          value={formik.values.token}
          onChange={formik.handleChange}
          placeholder="Enter Code"
          className="w-full mt-8 h-12 text-center tracking-widest text-lg text-black border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          placeholder="Enter new Password"
          className="w-full mt-8 h-12 text-center tracking-widest text-lg text-black border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

       <motion.button
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
      Reset Password
      <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
    </motion.span>
  </div>
</motion.button>
 
      </motion.form>

    </div>

  );

}