"use client";
import Link from "next/link";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";

export default function ProfilePage() {
   const router = useRouter();
   const logout = async () =>{
    try{
      await axios.get('/api/users/logout');
      router.push("/login")
    }catch(error:any){ 
   console.log(error.messsage)
    }
   }
    return (
              <div className="h-screen">
<div className=" py-2 px-2 ">
          <Link href="/">
            <div className="inline-flex items-center space-x-2 flex-shrink ">
              <FaArrowLeftLong className="text-sm" />
              <span className="text-sm font-semibold ">Back Home</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center  justify-center h-full   ">
            <div className="w-[80%] md:w-[40%] lg:w-[30%] xl:w-[20%]  flex flex-col   ">

              <div>
                PROFILE PAGE
              </div>
            </div>
            <button onClick={logout} className="bg-green-800 px-2 py-2 rounded-md ">Logout</button>
        </div>
        </div>
    )
}