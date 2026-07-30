import { updateBaord } from "@/service/BaordService";
import { createBranch, deleteBranch, updateBranch } from "@/service/BrancheService";
import { createCourse, deleteCourse } from "@/service/CourseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createBranch,
        onSuccess: (values) => {
            console.log(values);
            toast.success("Branch Create")
            queryClient.invalidateQueries({
                queryKey: ["branches"],
            });


        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Branch Creation Failed Or Network Down";
                toast.error(message)
            }
        }
    })
}

const useUpdateBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ branchId, updateBranchData }: { branchId: string, updateBranchData: any }) => updateBranch(branchId, updateBranchData),
        onSuccess: () => {
            toast.success("Update The Details")
            queryClient.invalidateQueries({
                queryKey: ["branches"],
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

const useDeleteBranch = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBranch,
        onSuccess: () => {
            toast.success("Delete The Branch")
            queryClient.invalidateQueries({
                queryKey: ["branches"],
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
export { useBranch, useDeleteBranch, useUpdateBranch }