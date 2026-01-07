"use client";
import Link from "next/link";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios'
import { FaArrowLeftLong } from "react-icons/fa6";

export default function LoginPage(){
    const [user,setUser ] = React.useState({
        email:"",
        password:"",
     })
  const router = useRouter();
    const [buttonDisabled,setButtonDisabled] = React.useState(true)
     const [loading,setLoading] = React.useState(false)
    const onLogin = async()=>{
        try{
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data)
      router.push("/profile");

     }catch(error){
  console.log("login failed", error)
     }finally{
       setLoading(false)
     }
    }
    return(
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

                <div className="mb-8   ">
                    <h1 className="text-3xl text-start font-bold">Welcome back,</h1>
                </div>
                <div className="flex flex-col  ">
                    <div className=" flex flex-col items-center  justify-center h-full w-full space-y-8">

                       
                        <div className="w-full ">

                            <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}  className="border-gray-100 border-2 bg-gray-50 px-2 py-2 w-full rounded-md"  placeholder="Email"/>
                        </div>
                        <div className="w-full ">

                            <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}  className="border-gray-100 border-2 bg-gray-50 px-2 py-2 w-full rounded-md" placeholder="Password"/>
                        </div>

                    <button onClick={onLogin}  className=" bg-linear-to-r from-[#2d3d32] via-[#3f5a48] to-[#55795f] text-white w-full py-2 rounded ">
                        Login
                    </button>
                    </div>
                    <p className="mt-3 ">
                  Dont have an account?{" "}
                  <Link href="/signup" className="underline">
                    Signup
                  </Link>
                </p>
                </div>
            </div>
        </div>
        </div>
    )
}