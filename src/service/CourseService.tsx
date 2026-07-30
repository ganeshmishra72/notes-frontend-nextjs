import apiclient from "@/config/ApiCall"

export const getCourse=async()=>{
    const response=await apiclient.get("/course")
    return response.data
}

export const createCourse=async(registerData:any)=>{
    const response=await apiclient.post("/course",registerData)
    return response.data;
}

export const updateCourse=async(courseId:string,updateCourseData:any)=>{
 

const response = await apiclient.put(
  `/course/update/${courseId}`,
  updateCourseData
);
    return response.data
}

export const deleteCourse=async(courseId:string)=>{
    const response=await apiclient.delete(`/course/delete/${courseId}`)
    return response.data
}