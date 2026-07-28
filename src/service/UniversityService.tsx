import apiclient from "@/config/ApiCall"
import UpdateUniversity from "@/model/UniversityData"

export const getUniversities=async()=>{
 
    const response=await apiclient.get("/university")
    return response.data
}

export const createUniversities=async(registerData:any)=>{
    const response=await apiclient.post("/university",registerData)
    return response.data;
}

export const updateUniversity=async(universityId:string,updateUniversityData:any,file:File)=>{

     const { logoUrl, ...registerResponse } = updateUniversityData; 
   const formData = new FormData();

formData.append(
  "registerResponse",
  JSON.stringify(registerResponse)
);

if (file) {
  formData.append("file", file);
}

const response = await apiclient.put(
  `/university/update/${universityId}`,
  formData 
);
    return response.data
}

export const deleteUniversity=async(universityId:string)=>{
    const response=await apiclient.delete(`/university/delete/${universityId}`)
    return response.data
}