import { createBoards, deleteBoard, updateBaord } from "@/service/BaordService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createBoards,
        onSuccess: (values) => {
            console.log(values);
            toast.success("Board Create")
            queryClient.invalidateQueries({
                queryKey: ["boards"],
            });


        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Board Creation Failed Or Network Down";
                toast.error(message)
            }
        }
    })
}

const useUpdateBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ boardId, updateBoardData }: { boardId: string, updateBoardData: any }) => updateBaord(boardId, updateBoardData),
        onSuccess: () => {
            toast.success("Update The Details")
            queryClient.invalidateQueries({
                queryKey: ["boards"],
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

const useDeleteBoard = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBoard,
        onSuccess: () => {
            toast.success("Delete The Board")
            queryClient.invalidateQueries({
                queryKey: ["boards"],
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
export { useBoard, useDeleteBoard, useUpdateBoard }