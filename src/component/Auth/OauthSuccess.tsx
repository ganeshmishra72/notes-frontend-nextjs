"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Authstore from "@/store/AuthStore";

export default function OAuthSuccess() {

    const router = useRouter();

    const params = useSearchParams();

    const login = Authstore((s) => s.login);

    useEffect(() => {

        const accessToken = params.get("accessToken");

        const email = params.get("email");

        const name = params.get("name");

        const role = params.get("role");

        if (!accessToken) {

            router.replace("/login");

            return;
        }

        login({
            access_token: accessToken,
            refersh_token: null,
            email: email!,
            name: name!,
            role: role!,
            credits: 0, 
        });

        router.replace("/");

    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            Signing you in...
        </div>
    );
}
