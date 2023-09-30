 import type { NextRequest } from 'next/server'
import  jwt from 'jsonwebtoken';


 export function getDataFromToken(request: NextRequest) {
            try{

                const encodedtoken = request.cookies.get('token')?.value || '';
                const decodedToken:any = jwt.verify(encodedtoken, process.env.TOKEN_SECRET!);
                return decodedToken.id;
            }catch (error:any) {
                throw new Error(error.message);
            }


    }