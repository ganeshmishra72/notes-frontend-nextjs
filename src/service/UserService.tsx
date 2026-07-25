import apiclient from "@/config/ApiCall"

export const getProfile=async()=>{
   const response=await apiclient.get("/users/me")
   return response.data
}