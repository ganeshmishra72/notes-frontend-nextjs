"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";

export default function OAuthFailure() {

    const params = useSearchParams();

    const error = params.get("error");

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white rounded-2xl shadow-xl p-10 w-[450px]">

                <div className="flex justify-center">

                    <XCircle
                        className="text-red-500"
                        size={70}
                    />

                </div>

                <h2 className="text-center text-3xl font-bold mt-6 text-red-700">

                    Google Login Failed

                </h2>

                <p className="text-center mt-5 text-gray-600">

                    {error ?? "Authentication failed."}

                </p>

                <Link

                    href="/login"

                    className="mt-8 block bg-blue-600 text-white text-center rounded-xl py-3"

                >

                    Back to Login

                </Link>

            </div>

        </div>

    );
}