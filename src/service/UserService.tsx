import apiclient from "@/config/ApiCall"

export const getProfile=async()=>{
   const response=await apiclient.get("/users/me")
   return response.data
}

export const updateProfileImage=async(email:string,file:File)=>{

   const formData=new FormData()
   formData.append("file",file)
   const response=await apiclient.post(`/users/update-image/${email}`,formData,{
      headers:{'Content-Type':"multipart/form-data "}
   })
   return response.data
}


export const updateProfile=async({ email, data }: { email: string; data: any })=>{
    const response=await apiclient.put(`/users/update/${email}`,data)
    return  response.data
}

export const deleteProfile=async(email:string)=>{
  const response=await apiclient.put(`/users/delete/${email}`)
    return  response.data  
}

// admin
export const getAllUsers=async()=>{
   const response=await apiclient.get("/users")
   return response.data
}



export const updateStatus=async(email:string,enable:boolean)=>{
  
   const response=await apiclient.patch(`/users/status/${email}`,enable,{
      headers:{
         "Content-Type":"application/json"
      }
   })
   return response.data
}