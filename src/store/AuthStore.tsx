import LoginResponseData from "@/model/LoginResponseData";
import { create } from "zustand";
import { persist } from "zustand/middleware";


type StoreType = {
    accessToken: null | string,
    // username:null | string,
    email: null | string,
    name: string | null,
    refreshToken: string | null,
    role: string | null,
    login: (logindata: LoginResponseData) => void,
    logout: (slient?: boolean) => void

}

const Authstore = create<StoreType>()(persist((set) => ({

    accessToken: null,
    email: null,
    refreshToken: null,
    name: null,
    role: null,
    login: (login) => {
        set({
            accessToken: login.access_token,
            email: login.email,
            refreshToken: login.refersh_token,
            name: login.name,
            role: login.role,
        })
    },
    logout: (slient = false) => {
        set({
            accessToken: null,
            email: null,
            refreshToken: null,
            name: null,
            role: null,
        })
    },

}), { name: "auth-storag", }))

export default Authstore