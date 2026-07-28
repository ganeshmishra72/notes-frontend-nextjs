"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard = ({
  title,
  value,
  change,
  icon,
  color,
}: DashboardCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl"
    >
      {/* Background Glow */}

      <div
        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10 blur-3xl ${color}`}
      />

      {/* Header */}

      <div className="flex items-center justify-between">

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${color}`}
        >
          {icon}
        </div>

        <div className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">

          <TrendingUp size={15} />

          {change}

        </div>

      </div>

      {/* Value */}

      <div className="mt-8">

        <h2 className="text-4xl font-bold text-slate-900">
          {value}
        </h2>

        <p className="mt-2 text-slate-500">
          {title}
        </p>

      </div>

      {/* Bottom Line */}

      <div
        className={`absolute bottom-0 left-0 h-1 w-full ${color}`}
      />
    </motion.div>
  );
};

export default DashboardCard;