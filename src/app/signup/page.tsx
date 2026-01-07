"use client";
import Link from "next/link";
import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from 'axios'
import { FaArrowLeftLong } from "react-icons/fa6";

export default function SignupPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    }) 
    const router = useRouter();
    const [buttonDisabled,setButtonDisabled] = React.useState(true)
     const [loading,setLoading] = React.useState(false)
    const onSignup = async () => {
     try{
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data)
      router.push("/login");

     }catch(error){
  console.log("Signup failed", error)
     }finally{
       setLoading(false)
     }
    }
    useEffect(()=>{
if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0 ){
setButtonDisabled(false)
}else{
  setButtonDisabled(true)
}
    },[user])
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

                <div className="mb-8   ">
                    <h1 className="text-3xl text-start font-bold">Register</h1>
                    <p className="text-sm font-medium text-gray-600">
                Join today for faster  and exclusive deals.
              </p>
                </div>
                <div className="flex flex-col  ">
                    <div className=" flex flex-col items-center  justify-center h-full w-full space-y-8">

                        <div className="w-full ">

                            <input type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="border-gray-100 border-2 bg-gray-50 px-2 py-2 w-full rounded-md" placeholder="User Name " />
                        </div>
                        <div className="w-full ">

                            <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}  className="border-gray-100 border-2 bg-gray-50 px-2 py-2 w-full rounded-md"  placeholder="Email"/>
                        </div>
                        <div className="w-full ">

                            <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}  className="border-gray-100 border-2 bg-gray-50 px-2 py-2 w-full rounded-md" placeholder="Password"/>
                        </div>

                    <button disabled={buttonDisabled} onClick={onSignup}  className=" bg-linear-to-r from-[#2d3d32] via-[#3f5a48] to-[#55795f] text-white w-full py-2 rounded ">
                        {buttonDisabled ? "No sign up" :" sign up"}
                    </button>
                    </div>
                    <p className="mt-3 ">
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                    Login
                  </Link>
                </p>
                </div>
            </div>
        </div>
        </div>
    )
}