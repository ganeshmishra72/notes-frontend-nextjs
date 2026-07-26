import Profile from '@/component/Home/Profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  //  const cookiestore=await cookies()
  //   const token=cookiestore.get("refreshToken")?.value
  //   if(!token){
  //     <div className='w-full flex items-center justify-center bg-white text-black'>
  //              NO
  //     </div>
  //     return redirect("/")
  //   }
  return (
    <Profile/>
  )
}

export default page
