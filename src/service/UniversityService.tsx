import apiclient from "@/config/ApiCall"

export const getUniversities=async()=>{
 
    const response=await apiclient.get("/university")
    return response.data
}