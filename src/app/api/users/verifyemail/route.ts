import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest) {

    try {
      const reqBody = await request.json();
      const {token} = reqBody;
      console.log('token...', token)
      const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt: Date.now()}})
    console.log('user inside verify', user)                               
    if(!user){
         return NextResponse.json({
             error: 'Invalid Token',
             status:400,
    })}  
   
     user.isVerified = true;
     user.verifyToken = undefined;
     user.verifyTokenExpiry = undefined;
     await user.save();

     
     return NextResponse.json({
        message: 'Email verified successfully',
        succss:true,

     })

    }catch (error:any) {
       return NextResponse.json({
        error: error.nessage,
        status: 500,
      }) 
    }
}