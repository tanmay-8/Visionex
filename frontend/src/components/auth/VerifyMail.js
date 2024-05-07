import React, { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

const VerifyMail = () => {
    const router = useRouter();
    const [code ,setCode] = useState("")
    const toLogin = ()=>{
        router.push("/auth/login")
    }
    return (
        <div className="w-full md:w-1/2 max-w-[700px] px-2 md:px-10 py-10 md:py-20 rounded-3xl space-y-10">
            <div>
                <h1 className="text-3xl md:text-5xl font-semibold">
                    Verify Email
                </h1>
                <p className="font-medium md:text-lg text-gray-500 mt-4">
                    Verification code has been sent to your email.
                </p>
            </div>
            <div className="mt-8">
                <div className="flex flex-col py-6">
                    <InputOTP onChange={
                        (e)=>{
                            setCode(e.target.value)
                            console.log(code)
                        }
                    } maxLength={6} className="w-full">
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />

                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-main rounded-xl text-white font-bold text-lg">
                        Verify
                    </button>
                </div>
                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">
                        Already have an account?
                    </p>
                    <button
                        onClick={toLogin}
                        className="ml-2 font-medium text-base text-main"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyMail;
