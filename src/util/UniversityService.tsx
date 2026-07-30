import { getBranche } from "@/service/BrancheService"
import { getCourse } from "@/service/CourseService"
import { getSemester } from "@/service/SemesterService"
import { getSubject } from "@/service/SubjectService"
import { getUniversities } from "@/service/UniversityService"
import Authstore from "@/store/AuthStore"
import { useQuery } from "@tanstack/react-query"

export const  getAllUniversity=()=>{
   const token=Authstore(s=>s.accessToken)
    const  {data,isError,isLoading}=useQuery({
        queryKey:["university"],
        queryFn:getUniversities,
  enabled: !!token,
  retry: 1,
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: false,
    })

    return{
        data,isError,isLoading
    }
} 

export const getALLSemester=()=>{
    const token=Authstore(s=>s.accessToken)
    const  {data,isError,isLoading}=useQuery({
        queryKey:["semester"],
        queryFn:getSemester,
  enabled: !!token,
  retry: 1,
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: false,
    })

    return{
        data,isError,isLoading
    }
}


export const getAllSubject=()=>{
    const token=Authstore(s=>s.accessToken)
    const  {data,isError,isLoading}=useQuery({
        queryKey:["subject"],
        queryFn:getSubject,
  enabled: !!token,
  retry: 1,
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: false,
    })

    return{
        data,isError,isLoading
    }
}

export const getAllBranche=()=>{
    const token=Authstore(s=>s.accessToken)
    const  {data,isError,isLoading}=useQuery({
        queryKey:["branch"],
        queryFn:getBranche,
  enabled: !!token,
  retry: 1,
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: false,
    })

    return{
        data,isError,isLoading
    }
}

export const getAllCourses=()=>{
    const token=Authstore(s=>s.accessToken)
    const  {data,isError,isLoading}=useQuery({
        queryKey:["course"],
        queryFn:getCourse,
  enabled: !!token,
  retry: 1,
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: false,
    })

    return{
        data,isError,isLoading
    }
}