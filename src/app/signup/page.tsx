'use client';

import Link from "next/link";
import React, { useState,useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function signupPage(){
  const router = useRouter();
      const[userInfo, setUserInfo] = useState({
        email:"",
        password:"",
        username:""
      });
const[buttonDisabled, setButtonDisabled] = useState(false);
const[loading, setLoading] = useState(false)

    const onSignup = async () => {
      try {
        // console.log("inside sighnup");
        setLoading(true);
        const response = await axios.post("/api/users/signup", userInfo);
        console.log("sighnup success...", response.data);

        // redirect to the login page
        router.push("/login")

      } catch (err : any) {
        console.log("Signup failed.....", err)
        toast.error(err.message)
      }finally{
        setLoading(false)
      }

    }
    useEffect(()=>{
       if(userInfo.email.length > 0 && userInfo.username.length > 0 &&userInfo.password.length > 0){
        setButtonDisabled(false)
       }  
       else{
        setButtonDisabled(true)
      }
    },[userInfo])
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <br />
            <label htmlFor="username">Username</label>
            <input className="p-2 border border-gray-300 focus-border-gray-900 rounded-lg mb-4 focus:outline-none text-black" type="text" id="username" value={userInfo.username} onChange={(e)=>{setUserInfo({...userInfo, username: e.target.value})}} placeholder="username"/>
            <label htmlFor="username">email</label>
            <input className="p-2 border border-gray-300 focus-border-gray-900 rounded-lg mb-4 focus:outline-none text-black" type="text" id="email" value={userInfo.email} onChange={(e)=>{setUserInfo({...userInfo, email: e.target.value})}} placeholder="email"/>
            <label htmlFor="username">password</label>
            <input className="p-2 border border-gray-300 focus-border-gray-900 rounded-lg mb-4 focus:outline-none text-black" type="password" id="password" value={userInfo.password} onChange={(e)=>{setUserInfo({...userInfo, password: e.target.value})}} placeholder="password"/>
           <button disabled={buttonDisabled} onClick={onSignup} className="p-2 border border-gray-300 focus-border-gray-900 rounded-lg mb-4 focus:outline-none">{buttonDisabled ? "No sighnup" : "Signup"}</button>
           <Link href="/login">Visit login page</Link>
        </div>
    )
}