import { deleteBranch, updateBranch } from "@/service/BrancheService";
import { createSemester, deleteSemester, updateSemester } from "@/service/SemesterService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useSemester = () => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createSemester,
        onSuccess: (values) => {
            console.log(values);
            toast.success("Semester Create")
            queryClient.invalidateQueries({
                queryKey: ["semester"],
            });


        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Semester Creation Failed Or Network Down";
                toast.error(message)
            }
        }
    })
}

const useUpdateSemester = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ semesterId, updateSemesterData }: { semesterId: string, updateSemesterData: any }) => updateSemester(semesterId, updateSemesterData),
        onSuccess: () => {
            toast.success("Update The Details")
            queryClient.invalidateQueries({
                queryKey: ["semester"],
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

const useDeleteSemester = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteSemester,
        onSuccess: () => {
            toast.success("Delete The semester")
            queryClient.invalidateQueries({
                queryKey: ["semester"],
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
export { useDeleteSemester, useSemester, useUpdateSemester }