import { deleteProfile, updateProfile, updateProfileImage } from "@/service/UserService";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function uploadImage() {
    return useMutation({
        mutationFn: ({ email, file }: { email: string; file: File }) => updateProfileImage(email, file),
        onSuccess: (value) => {
            console.log(value);
            toast.success("Successfully Uplaod Image")

        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Update  Failed Or Network Down";
                console.log(message);

                toast.error(message)
            }
        }

    })
}



export function updateuserData() {
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (value) => {
            console.log(value);
            toast.success("Update Profile")
        }
        ,
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Update  Failed Or Network Down";
                toast.error(message)
            }
        }
    })
}

export function delteUserData() {
    return useMutation({
        mutationFn: deleteProfile,
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Delted  Failed Or Network Down";
                toast.error(message)
            }
        }
    })
}