import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export  default function VerifyEmailPage(){
    const [token, setToken ] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const verifyUserEmail=async ()=>{
        try{
         await axios.post('/api/users/verifyemail');
         setVerified(true)
        }catch(error:any){
            setError(true)
        }
    }

    useEffect(()=>{
const urlToken = window.location.search.split("=")[1];
setToken(urlToken || "")
    },[])
    useEffect(()=>{
        if(token.length > 0){
        verifyUserEmail();
        }
    },[token])

    return(
        <div>
            <h1>
                Verify email
            </h1>
            <p>
                {token ? `${token} `:"no token"}
            </p>
            {
                verified && (
                    <>
                    <h2>
                        Email verified 
                    </h2>
                    <Link href='/login'>
                    Login
                    </Link>
                    </>
                )
            }
            {
                error && (
                    <p>
                        error
                    </p>
                )
            }
        </div>
    )
}