import apiclient from "@/config/ApiCall"

export const getUniversities=async()=>{
 
    const response=await apiclient.get("/university")
    return response.data
}

export const createUniversities=async(registerData:any)=>{
    const response=await apiclient.post("/university",registerData)
    return response.data;
}