import { createNotes, deleteNotes, filterNotes, updateStatus } from "@/service/NotesService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import toast from "react-hot-toast";

export const useNotesFilter = () => {
    return useMutation({
        mutationFn: filterNotes,
        onSuccess: (value) => {
            console.log(value);

        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    " Failed Or Network Down";
                toast.error(message)
            }
        }
    })
}

export const useCreateNotes = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createNotes,

        onSuccess: () => {
            toast.success("Notes uploaded successfully.");

            queryClient.invalidateQueries({
                queryKey: ["notes"],

            });
        },

        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    " Failed Or Network Down";
                toast.error(message)
            }
        }
    });
}

export const useDeleteNotes = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteNotes,

        onSuccess: () => {
            toast.success("Notes Deleted successfully.");

            queryClient.invalidateQueries({
                queryKey: ["notes"],

            });
        },

        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    " Failed Or Network Down";
                toast.error(message)
            }
        }
    });
}


export function useUpdateNotesStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ notesId, status }: { notesId: string, status: any }) => updateStatus(notesId, status),
        onSuccess: (value) => {
            console.log(value);
            toast.success("Update Status")
            queryClient.invalidateQueries({
                queryKey: ["notes"],
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