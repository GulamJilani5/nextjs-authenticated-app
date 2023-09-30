import {connectDb} from "@/dbConfig/dbConfig";

import User from "@/models/userModel";
// const User = require("@/models/userModel");
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connectDb();

export async function POST(request : NextRequest) {
    try {
    const reqBody = await request.json();
    console.log('reqBody ', reqBody);
    // ** IN EXPRESS we use req.body

    const {username, email, password} = reqBody; // We are destructuring because we know field name due to userModel schema

    //Check if user allready exist
    // console.log('...............')
      const user = await User.findOne({email}); // If we don't use await then this will return query
      console.log('user....',user)
      if(user){
        return NextResponse.json({
            message: 'User is already exist',
            status:400,
        })
       }
      //hash password
      const salt = await bcryptjs.genSalt(10) // Express, nextjs and mongoose generally use 10 round
      const hashedPassword =  await bcryptjs.hash(password, salt)

      const newUser = new User({
        username,
        email,
        password: hashedPassword
        // password,
      })
  //CREATING NEW USER IN THE DATABASE
    //Method 1
    // const savedUser = await newUser.save();
    // console.log('user... ', savedUser);

    //Method 2(I did it in express with mongoose)
    const savedUser = await User.create(newUser);

    return NextResponse.json({
        message: ' User created successfully',
        success: true,
        savedUser
    })

    } catch (error:any) {
        return NextResponse.json({
            message: error.message,
            status: 500,
        })
    }
    
}