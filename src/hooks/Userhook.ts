import { deleteProfile, updateProfile, updateProfileImage, updateStatus } from "@/service/UserService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProfile,
        onSuccess: () => {
            toast.success("User Deleted Successfully")
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
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
export function useUpdateUserStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ email, enable }: { email: string, enable: boolean }) => updateStatus(email, enable),
        onSuccess: (value) => {
            console.log(value);
            toast.success("Update Status")
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Status Chnage  Failed Or Network Down";
                toast.error(message)
            }
        }
    })
}

