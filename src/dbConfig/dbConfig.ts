import mongoose from "mongoose";

// no need to install dotenv in nextjs for env variable accessibility
// import dotenv from "dotenv";
// dotenv.config({path: '@/env'})
// const {MONGOOSE_URL_NEXT,MONGOOSE_URL_NODE, TOKEN_SECRET} = process.env; 
// console.log('connection string', process.env.MONGOOSE_URL_NEXT)
export async function connect(){
    try {
        
        // ** WE SHOULD USE EXCLAMATION(!) MARK BECAUSE WE ARE USING TYPESCRIPT
        // mongoose.connect(MONGOOSE_URL_NEXT!);
        await mongoose.connect(process.env.MONGOOSE_URL_NEXT!);
        const connection = mongoose.connection;
        
        connection.on('connected', ()=>{
            console.log('mongoDB db connection successful!!');
        })
       
        connection.on('error', (err)=>{
           console.log('MongoDB connection error!!! ', err.message)
           process.exit();  
        })

    } catch (error) {
        console.log('ERROR', error)
    }
}