import apiclient from "@/config/ApiCall"

export const getSubject=async()=>{
    const response=await apiclient.get("/subject")
    return response.data
}


export const createSubject=async(subjectData:any)=>{
    const response=await apiclient.post("/subject",subjectData)
    return response.data
}

export const updateSubject=async(subjectId:string,updateSubjectData:any)=>{
 

const response = await apiclient.put(
  `/subject/update/${subjectId}`,
  updateSubjectData
);
    return response.data
}

export const deleteSubject=async(subjectId:string)=>{
    const response=await apiclient.delete(`/subject/delete/${subjectId}`)
    return response.data
}