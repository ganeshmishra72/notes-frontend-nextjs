import apiclient from "@/config/ApiCall"

export const getBranche=async()=>{
    const response=await apiclient.get("/branch")
    return response.data
}

export const createBranch=async(registerData:any)=>{
    const response=await apiclient.post("/branch",registerData)
    return response.data;
}

export const updateBranch=async(branchId:string,updateBranchData:any)=>{
 

const response = await apiclient.put(
  `/branch/update/${branchId}`,
  updateBranchData
);
    return response.data
}

export const deleteBranch=async(branchId:string)=>{
    const response=await apiclient.delete(`/branch/delete/${branchId}`)
    return response.data
}