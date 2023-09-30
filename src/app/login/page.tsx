'use client';

import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function signupPage(){
     const router = useRouter();
      const[user, setUser] = useState({
        email:"",
        password:"",
      });

      const[buttonDisabled, setButtonDisabled] =useState(false);
      const[loading, setLoading] = useState(false)

    const onLogin = async()=>{
      try {
        // console.log("inside Login");
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("Login success...", response.data);
        toast.success("Login success")
        //redirect to the login page
        router.push("/profile")

      } catch (err : any) {
        console.log("Login failed...", err.message)
        toast.error(err.message)
      }finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
      if(user.email.length > 0 && user.password.length > 0){
       setButtonDisabled(false)
      }  
      else{
       setButtonDisabled(true)
     }
   },[user])
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" :"Login"}</h1>
            <br />
            <label htmlFor="username">email</label>
            <input className="p-2 border border-gray-300 focus-border-gray-900 rounded-lg mb-4 focus:outline-none" type="text" id="email" value={user.email} onChange={(e)=>{setUser({...user, email: e.target.value})}} placeholder="email"/>
            <label htmlFor="username">password</label>
            <input className="p-2 border border-gray-300 focus-border-gray-900 rounded-lg mb-4 focus:outline-none" type="password" id="password" value={user.password} onChange={(e)=>{setUser({...user, password: e.target.value})}} placeholder="password"/>
           <button disabled={buttonDisabled} onClick={onLogin} className="p-2 border border-gray-300 focus-border-gray-900 rounded-lg mb-4 focus:outline-none">Login Here</button>
           <Link href="/signup" >Visit signup page</Link>
        </div>
    )
}