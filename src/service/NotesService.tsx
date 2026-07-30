import apiclient from "@/config/ApiCall"

export const filterNotes=async(notesFilterData:any)=>{
    const response=await apiclient.post("/notes/filter",notesFilterData)
    return response.data
}

export const getNotes=async()=>{
  const response = await apiclient.get("/notes")
  return response.data
}

export const createNotes=async(notesData:FormData)=>{
  const response=await apiclient.post("/notes",notesData)
  return response.data
}

export const deleteNotes=async(notesId:string)=>{
  const response=await apiclient.delete(`/notes/${notesId}`)
  return response.data
}

export const updateStatus=async(notesId:string,status:any)=>{
  
   const response=await apiclient.patch(`/notes/status/${notesId}`,status,{
      headers:{
         "Content-Type":"application/json"
      }
   })
   return response.data
}