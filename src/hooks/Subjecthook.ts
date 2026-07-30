import { createSubject, deleteSubject, updateSubject } from "@/service/SubjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useSubject = () => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createSubject,
        onSuccess: (values) => {
            console.log(values);
            toast.success("Subject Create")
            queryClient.invalidateQueries({
                queryKey: ["subject"],
            });


        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Subject Creation Failed Or Network Down";
                toast.error(message)
            }
        }
    })
}

const useUpdateSubject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ subjectId, updateSubjectData }: { subjectId: string, updateSubjectData: any }) => updateSubject(subjectId, updateSubjectData),
        onSuccess: () => {
            toast.success("Update The Details")
            queryClient.invalidateQueries({
                queryKey: ["subject"],
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

const useDeleteSubject = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteSubject,
        onSuccess: () => {
            toast.success("Delete The subject")
            queryClient.invalidateQueries({
                queryKey: ["subject"],
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
export { useDeleteSubject, useSubject, useUpdateSubject }