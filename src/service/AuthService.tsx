import apiclient from "@/config/ApiCall"
import LoginData from "@/model/LoginData";
import SignupData from "@/model/SingupData";
import VerfiyData from "@/model/VerfiyData";

export const login=async(loginData:LoginData)=>{
  const response=await apiclient.post("/auth/login",loginData);
  return  response.data;
}

export const register=async(signupData:SignupData)=>{
  const response=await apiclient.post("/auth/register",signupData)
  return response.data;
}


export const verifyotp=async(verfiyData:VerfiyData)=>{
  const response=await apiclient.post("/auth/verify-email",verfiyData);
  return response.data;
}

export const logout=async()=>{
  const response=await apiclient.post("/auth/logout")
  
  return response.data
}

export const forgotPassword = async (email: string) => {
  const response = await apiclient.post(
    "/auth/forget-password",
    email,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );

  return response.data;
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  const response = await apiclient.post(
    "/auth/reset-password",
    data
  );

  return response.data;
};