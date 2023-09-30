"use client";
import {useState} from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function profilePage(){

  const router = useRouter();
  const[data, setData] = useState("nothing");
  const logout = async ()=>{
  try {
    await axios.get('/api/users/logout')
    toast.success("logout successful")
    router.push('/login')
  } catch (error:any) {
     console.log(error.message);
     toast.error(error.message);
  }
  }
  // ** We can use useEffect() to get user data instead of onClick button. whenever user login we can display his information on the page rather than he manually click on GetUser Details button
  const getUserDetails = async ()=>{
    const res =  await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);   // res is basically coming from getDataFromtoekn helper method.
  }
  //<Link href={`/profile/${data}`}></Link>
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-3 rounded bg-green-500">{data === "nothing" ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link>} </h2>
            <hr />
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white fond-bold py-2 px-4 rounded">Logout</button>
            <button onClick={getUserDetails} className="bg-green-500 mt-4 hover:bg-green-700 text-white fond-bold py-2 px-4 rounded">GetUser Details</button>
        </div>
    )
}