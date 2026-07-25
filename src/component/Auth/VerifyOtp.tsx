"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { verifyotp } from "@/service/AuthService";
 

const VerifyOtp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [isPending, setIsPending] = useState(false);
  
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code  ) {
      toast.error("Enter a valid OTP");
      return;
    }
    try {
      setIsPending(true);
       
        await verifyotp({ email, code });
      toast.success(  "Email verified successfully");
      router.push("/login");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setIsPending(false);
    }
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-100 to-slate-100 flex items-center justify-center px-6 py-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center"
      >
        <ShieldCheck size={50} className="text-blue-600" />

        <h2 className="text-3xl font-bold text-slate-800 mt-6 text-center">
          Verify Your Email
        </h2>

        <p className="text-slate-500 mt-3 text-center">
          Enter the OTP sent to{" "}
          <span className="font-medium text-slate-700">{email}</span>
        </p>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter OTP"
          className="w-full mt-8 h-12 text-center tracking-widest text-lg text-black border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="mt-6 text-slate-500 text-sm">
          Code Is Vaild for 10 minutes
           
        </p>
      </motion.form>
    </div>
  );
};

export default VerifyOtp;