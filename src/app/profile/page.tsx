"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/users/userData");
      setUser(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="h-screen">
      <div className="py-2 px-2">
        <Link href="/">
          <div className="inline-flex items-center space-x-2">
            <FaArrowLeftLong className="text-sm" />
            <span className="text-sm font-semibold">Back Home</span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-[80%] md:w-[40%] lg:w-[30%] xl:w-[20%]">
          <div>PROFILE PAGE</div>

          {/* Safe rendering */}
          <h1>{user?.name}</h1>
        </div>

        <button
          onClick={logout}
          className="bg-green-800 px-2 py-2 rounded-md text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
