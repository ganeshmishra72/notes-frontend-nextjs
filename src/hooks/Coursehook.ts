import { updateBaord } from "@/service/BaordService";
import { createCourse, deleteCourse, updateCourse } from "@/service/CourseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createCourse,
        onSuccess: (values) => {
            console.log(values);
            toast.success("Course Create")
            queryClient.invalidateQueries({
                queryKey: ["courses"],
            });


        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Course Creation Failed Or Network Down";
                toast.error(message)
            }
        }
    })
}

const useUpdateCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ courseId, updateCourseData }: { courseId: string, updateCourseData: any }) => updateCourse(courseId, updateCourseData),
        onSuccess: () => {
            toast.success("Update The Details")
            queryClient.invalidateQueries({
                queryKey: ["courses"],
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

const useDeleteCourse = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCourse,
        onSuccess: () => {
            toast.success("Delete The Branch")
            queryClient.invalidateQueries({
                queryKey: ["courses"],
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
export { useCourse, useDeleteCourse, useUpdateCourse }