const { prismaClient } = require("../lib/db");
const {sendMail} = require("../utils/sendMail")
require("dotenv").config();


class OtpService{
    async sendOtp(email){
        try{
            const alUser = await prismaClient.user.findFirst({
                where:{
                    email:email
                }
            })

            if(alUser){
                return {
                    message:"Email already exists",
                    success:false
                }
            }

            await prismaClient.otp.deleteMany({
                where:{
                    email:email
                }
            })
            // Generate new OTP
            const otp = Math.floor(100000 + Math.random() * 900000);

            // const sendMail = 
            const info = await sendMail(otp,email);
            const otpRecord = await prismaClient.otp.create({
                data:{
                    email: email,
                    otp: otp.toString()
                }
            })

            return { otp: otpRecord, success: true };

        }catch(err){
            console.log(err);
            return { error: err, success: false };
        }
    }

    async verifyOtp(otp,email){
        try{


            const otpThere = await prismaClient.otp.findFirst({
                where:{
                    email:email
                }
            })

            console.log(otp,email,otpThere)
            if(otpThere.otp===otp){
                return {
                    message:"Email Verified !",
                    success:true
                }
            }else{
                return {
                    message:"Invalid OTP !",
                    success:false
                }
            }
        }catch(err){
            console.log(err);
            return {
                error:err,success:false
            }
        }
    }

}

module.exports = {
    otpService : new OtpService()
}