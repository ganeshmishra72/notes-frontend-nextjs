import apiclient from "@/config/ApiCall"

export const chatAi=async(chatrequest:any)=>{
  const response=await apiclient.post("/ai/chatai",chatrequest);
  return response.data;
}