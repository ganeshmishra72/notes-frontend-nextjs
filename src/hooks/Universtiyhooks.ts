import UpdateUniversity from "@/model/UniversityData";
import { createUniversities, deleteUniversity, updateUniversity } from "@/service/UniversityService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import toast from "react-hot-toast";

const useUniversity = () => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createUniversities,
        onSuccess: (values) => {
            console.log(values);
            toast.success("University Create")
            queryClient.invalidateQueries({
                queryKey: ["university"],
            });


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
    })
}

const useUpdateUniversity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ universityId, updateUniversityData, file }: { universityId: string, updateUniversityData: any, file: File }) => updateUniversity(universityId, updateUniversityData, file),
        onSuccess: () => {
            toast.success("Update The Details")
            queryClient.invalidateQueries({
                queryKey: ["university"],
            });
        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Update Failed Or Network Down";
                toast.error(message)
            }
        }
    })
}

const useDeleteUniversity = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUniversity,
        onSuccess: () => {
            toast.success("Delete The University")
            queryClient.invalidateQueries({
                queryKey: ["university"],
            });
        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Delete Failed Or Network Down";
                toast.error(message)
            }
        }
    })
}
export { useUniversity, useUpdateUniversity, useDeleteUniversity }