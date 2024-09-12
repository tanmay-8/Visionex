import React, { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import MyAlert from "./MyAlert";
import { setCode as setOtp,setVerified ,setStep} from "@/lib/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";


const VerifyMail = () => {
    const email = useAppSelector((state) => state.auth.email);
    const dispatch = useAppDispatch();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [code, setCode] = useState("");
    const toLogin = () => {
        router.push("/auth/login");
    };

    const verify = async (e) => { 
        if(code.length<6){
            setErr("Please enter a valid code");
            return;
        }
        setLoading(true);
        e.preventDefault();
        try {
            console.log(code)
            const res = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "/api/auth/verifyOtp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email:email,
                        otp:code
                     }),
                }
            );
            const data = await res.json();
            if (!data.success) {
                console.log(data);
                setErr(data.message);
                setLoading(false);
                return;
            }else{
                setErr("");
                dispatch(setOtp(code));
                dispatch(setVerified(true));
                dispatch(setStep(2));
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };
    return (
        <div className="w-full max-w-[700px] px-2 md:px-10 py-10 md:py-20 rounded-3xl space-y-10">
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
                    <InputOTP
                        value={code}
                        maxLength={6}
                        className="w-full"
                        onChange={(value) => {
                            setCode(value);
                            // console.log(code)
                        }}
                    >
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
                {err && (
                    <div className="pt-6 w-full text-center text-base text-red-500">
                        {err}
                    </div>
                )}
                <div className="mt-8 mb-6 flex flex-col gap-y-4">
                    <button
                        className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-main rounded-xl text-white font-bold text-lg"
                        onClick={verify}
                    >
                        Verify
                    </button>
                </div>
                {loading && (
                    <MyAlert
                        title={"Wait"}
                        description={"Signing you up.."}
                        type={"Loading"}
                    />
                )}
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
