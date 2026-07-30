import { forgotPassword, login, logout, resetPassword } from "@/service/AuthService"
import Authstore from "@/store/AuthStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const useLogin = () => {

    const loginStore = Authstore((store) => store.login);

    return useMutation({
        mutationFn: login,

        onSuccess: (data) => {
            console.log("Response", data);

            const decode: any = jwtDecode(data.accessToken);

            console.log("Decoded", decode);

            loginStore({
                access_token: data.accessToken,
                refersh_token: data.refreshToken,
                name: data.user.name,
                email: data.user.email,
                role: decode?.resource_access?.['oauth2-client-credentials']?.roles,
            });

            toast.success("Login Successful");
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    error ||
                    "Login Failed"

                toast.error(message)
            } else {
                toast.error("Something went wrong");
            }
        }
    });
}


const useLogout = () => {
    const queryClient = useQueryClient()
    const clearAuth = Authstore(state => state.logout);


    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            clearAuth();  // clear Zustand store
            queryClient.clear()
            toast.success('Successfully Logout')

        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Logout Failed Or Network Down";
                toast.error(message)
            }
        }
    });
}


export const useForgotPassword = () => {
    return useMutation({
        mutationFn: forgotPassword,

        onSuccess: (data) => {
            toast.success(data);
        },

        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Forget Password Failed Or Network Down";
                toast.error(message)
            }
        }
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: resetPassword,

        onSuccess: (data) => {
            console.log(data);

            toast.success("Successfully Change Password");
        },

        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Reset Password Failed Or Network Down";
                toast.error(message)
            }
        }
    });
};

export { useLogin, useLogout }