import { chatAi } from "@/service/AIService"
import { useMutation } from "@tanstack/react-query"
import axios from "axios";

export const useChatAi = () => {
    return useMutation({
        mutationFn: chatAi,
        onSuccess: (value) => {
            console.log(value);

        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    " Chatai Failed Or Network Down";

            }
        }
    })
}