const { prismaClient } = require("../lib/db");
const {sendOtpMail} = require("../utils/sendMail")
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

            // const sendOtpMail = 
            const info = await sendOtpMail(otp,email);
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

            if(!otpThere){
                return {
                    message:"Email not found",
                    success:false
                }
            }

            if((otpThere.createdAt.getTime()+(5*60*1000))<Date.now()){
                return {
                    message:"OTP Expired !",
                    success:false
                }
            }

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

    async resendOtp(email){
        try{
            const otpThere = await prismaClient.otp.findFirst({
                where:{
                    email:email
                }
            })

            if(!otpThere){
                return {
                    message:"Email not found",
                    success:false
                }
            }

            const otp = Math.floor(100000 + Math.random() * 900000);
            const info = await sendOtpMail(otp,email);
            const otpRecord = await prismaClient.otp.update({
                where:{
                    email:email
                },
                data:{
                    otp:otp.toString()
                }
            })

            return { otp: otpRecord, success: true };

        }catch(err){
            console.log(err);
            return { error: err, success: false };
        }
    }    

}

module.exports = {
    otpService : new OtpService()
}