import {connectDb} from "@/dbConfig/dbConfig";

import User from "@/models/userModel";
// const User = require("@/models/userModel");
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


connectDb();

export async function POST(request : NextRequest) {
    try {
    const reqBody = await request.json();
    console.log('reqBody ', reqBody);
    //** IN EXPRESS we use req.body

    const {email, password} = reqBody; // We are destructuring because we know field name due to userModel Schema

    //Check if user allready exist
    // console.log('...............')
    // const options = { maxTimeMS: 20000 }; // Set timeout to 20 seconds
      // const user = await User.findOne({email}, null, options); // If we don't use await then this will return query. Here it will return document(record) based on email id.
      const user = await User.findOne({email}); // If we don't use await then this will return query. Here it will return document(record) based on email id.
      console.log('login user... ',user)  //
      if(!user){
        return NextResponse.json({
            error: 'User does not exist',
            status:400,
        })
      }
    //Check if password exist
      const isValidPassword = await bcryptjs.compare(password, user.password)

      if(!isValidPassword){
        return NextResponse.json({
          error: 'Invalid password',
          status: 500,
      })
      }
    //Create Token data
     const tokenData = {
        id : user._id,
        username: user.username,
        email: user.email
     }

    //Create Token
      const {TOKEN_SECRET} = process.env; 
      const token = await jwt.sign(tokenData, TOKEN_SECRET!, {expiresIn:'1d'})

      const response =  NextResponse.json({
        message: 'login successfully',
        success: true,
    })
   response.cookies.set("token", token, {httpOnly: true,});
   return response;

    } catch (error:any) {
        return NextResponse.json({
            message: error.message,
            status: 500,
        })
    }
    
}