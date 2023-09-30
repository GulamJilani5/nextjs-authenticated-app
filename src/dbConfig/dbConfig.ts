import { resolveAny } from "dns";
import mongoose from "mongoose";

// no need to install dotenv in nextjs for env variable accessibility
// import dotenv from "dotenv";
// dotenv.config({path: '@/env'})
// const {MONGOOSE_URL_NEXT,MONGOOSE_URL_NODE, TOKEN_SECRET} = process.env;    //correct way to access
// console.log('connection string', process.env.MONGOOSE_URL_NEXT)
export async function connectDb(){
    try {
        
        // mongoose.connect(MONGOOSE_URL_NEXT!);
        mongoose.connect(process.env.MONGOOSE_URL_NEXT!);
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log('mongoDB db connection successful!!');
        })
        connection.on('error', (err)=>{
           console.log('MongoDB connection error', err)
           process.exit();  
        })
    } catch (error) {
        console.log('ERROR', error)
    }
}