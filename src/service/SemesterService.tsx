import apiclient from "@/config/ApiCall"

export const getSemester=async()=>{
    const response=await apiclient.get("/semester")
    return response.data
}

export const createSemester=async(semesterData:any)=>{
    const response=await apiclient.post("/semester",semesterData)
    return response.data
}

export const updateSemester=async(semesterId:string,updateSemesterData:any)=>{
 

const response = await apiclient.put(
  `/semester/update/${semesterId}`,
  updateSemesterData
);
    return response.data
}

export const deleteSemester=async(semesterId:string)=>{
    const response=await apiclient.delete(`/semester/delete/${semesterId}`)
    return response.data
}