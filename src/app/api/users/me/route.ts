import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import {NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request:NextRequest) {
    try {
       const userId = await getDataFromToken(request)
       const user = await User.findById(userId).select("-password");
    // const user = await User.findOne({id : userId}).select("-password");

     return NextResponse.json({
        message: "User Found",
        data : user,
     })

    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            status:400,
       })     
    }
}