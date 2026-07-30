import apiclient from "@/config/ApiCall"

export const getAllBaord=async()=>{
    const response=await apiclient.get("/board")
    return response.data
}

export const createBoards=async(registerData:any)=>{
    const response=await apiclient.post("/board",registerData)
    return response.data;
}

export const updateBaord=async(boardId:string,updateBoardData:any)=>{
 

const response = await apiclient.put(
  `/board/update/${boardId}`,
  updateBoardData
);
    return response.data
}

export const deleteBoard=async(boardId:string)=>{
    const response=await apiclient.delete(`/board/delete/${boardId}`)
    return response.data
}