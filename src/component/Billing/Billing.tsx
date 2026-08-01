"use client";

import { useState } from "react";
import {
  Coins,
  Zap,
  Check,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Clock,
} from "lucide-react";
import Layout from "../Home/Layout";
import Authstore from "@/store/AuthStore";
 
type Cycle = "monthly" | "yearly";

const plans = [
  {
    name: "Starter",
    tagline: "For occasional revision",
    monthly: 0,
    yearly: 0,
    credits: "50 credits / month",
    popular: false,
    features: [
      "50 AI credits every month",
      "Chat with any single note",
      "Basic summaries & explanations",
      "Community support",
    ],
  },
  {
    name: "Pro",
    tagline: "For regular exam prep",
    monthly: 199,
    yearly: 1999,
    credits: "1,000 credits / month",
    popular: true,
    features: [
      "1,000 AI credits every month",
      "Unlimited note-scoped chats",
      "General Q&A, MCQ generation",
      "Priority response speed",
      "Email support",
    ],
  },
  {
    name: "Team",
    tagline: "For study groups & CRs",
    monthly: 499,
    yearly: 4999,
    credits: "5,000 credits / month",
    popular: false,
    features: [
      "5,000 shared AI credits",
      "Everything in Pro",
      "Up to 10 members",
      "Usage dashboard for the group",
      "Priority support",
    ],
  },
];

const usageStats = [
  { icon: MessageSquare, label: "Questions asked", value: "128" },
  { icon: TrendingUp, label: "Credits used this month", value: "342" },
  { icon: Clock, label: "Next refill", value: "12 Aug" },
];

export default function BillingPage() {
  const credits = Authstore(Store=>Store.credits)
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pt-32 pb-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-medium">
              <Sparkles size={16} />
              Billing & Credits
            </span>

            <h1 className="text-5xl font-bold mt-6 text-gray-700">
              Power Your AI Study Assistant
            </h1>

            <p className="mt-5 text-slate-600 max-w-2xl mx-auto text-lg">
              Every question, summary and MCQ costs a credit. Top up or
              upgrade any time — unused credits roll over while your plan is
              active.
            </p>
          </div>
        </section>

        {/* Balance card */}
        <section className="max-w-7xl mx-auto px-6 mt-14">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 p-8 shadow-xl">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-5 text-white">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                  <Coins size={28} />
                </div>
                <div>
                  <p className="text-sm text-blue-100">Current balance</p>
                  <h2 className="text-4xl font-bold mt-1">
                    {credits ?? 0}{" "}
                    <span className="text-lg font-medium text-blue-100">
                      credits
                    </span>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
                {usageStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/10 backdrop-blur px-5 py-4 text-white min-w-[130px]"
                  >
                    <stat.icon size={16} className="text-blue-100" />
                    <p className="mt-2 text-lg font-semibold">{stat.value}</p>
                    <p className="text-xs text-blue-100">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Billing cycle toggle */}
        <section className="max-w-7xl mx-auto px-6 mt-16">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-700">
              Choose your plan
            </h2>
            <p className="mt-3 text-slate-500">
              Upgrade any time. Downgrade takes effect next cycle.
            </p>

            <div className="mt-6 inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
              <button
                onClick={() => setCycle("monthly")}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  cycle === "monthly"
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setCycle("yearly")}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${
                  cycle === "yearly"
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Yearly
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    cycle === "yearly"
                      ? "bg-white/20 text-white"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  Save ~16%
                </span>
              </button>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {plans.map((plan) => {
              const price = cycle === "monthly" ? plan.monthly : plan.yearly;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-lg ${
                    plan.popular
                      ? "border-blue-500 ring-2 ring-blue-500/20"
                      : "border-slate-200"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-1 text-xs font-semibold text-white shadow">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-xl font-bold text-slate-800">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-4xl font-bold text-gray-700">
                      {price === 0 ? "Free" : `₹${price}`}
                    </span>
                    {price !== 0 && (
                      <span className="text-slate-400 mb-1">
                        /{cycle === "monthly" ? "mo" : "yr"}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-blue-600">
                    <Zap size={14} />
                    {plan.credits}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-blue-600"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`mt-8 w-full rounded-xl py-3 font-semibold transition ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:opacity-90"
                        : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {price === 0 ? "Current Plan" : "Upgrade"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ / note */}
        <section className="max-w-7xl mx-auto px-6 mt-16">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-800">
              What counts as a credit?
            </h3>
            <p className="mt-2 text-slate-500 max-w-2xl mx-auto text-sm leading-6">
              Every question you send the AI assistant — note-scoped or
              general — uses one credit. Failed responses due to a server
              error are automatically refunded to your balance.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}