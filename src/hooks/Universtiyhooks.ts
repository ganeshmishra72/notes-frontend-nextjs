import { createUniversities } from "@/service/UniversityService"
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

export default useUniversity