// domain.com/verfytoken/asdrftgfhybvforcvcfet      // Better for server component
// domain.com/verfytoken?token=asdrfoiujytgfhybvf  // Better for client component


import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export async function sendEmail({email, emailType, userId}:any){

  try {
    //create hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(),10);  // Mostly userId is string already but possibility is user might send bson as well
    // await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry : Date.now() + 3600000}, {new: true, runValidators: true})
   if(emailType === "VERIFY"){
         await User.findByIdAndUpdate(userId, 
            {
                verifyToken: hashedToken, 
                verifyTokenExpiry : Date.now() + 3600000
            }
        )
   }else if(emailType === "RESET"){
    await User.findByIdAndUpdate(userId, 
        {
          forgotPasswordToken: hashedToken, 
          forgotPasswordTokenExpiry : Date.now() + 3600000
        }
        )
   }
   var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2824d81aaa8b0b",
      pass: "<Password>"
      // TODO add these credentialsto .env file
    }
  });

  const mailOptions = {
    from: 'hitesh@gmail.com',
    to: email,
    subject : emailType === "VERIFY" ? "verify your email": "reset your password",
    html:`<p> Click <a href = "${process.env.DOMAIN}/verifyemail?token = ${hashedToken}">here</a> 
              to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
              or copy and paste the link below on your browser
              </br>
              ${process.env.DOMAIN}/verifyemail?token = ${hashedToken}
              </p>`
  }
   const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
      
  } catch (error:any) {
    throw new Error(error.message)
  }

}
