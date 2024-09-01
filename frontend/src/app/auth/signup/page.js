"use client";
import React, { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import CreateAccount from "@/components/auth/CreateAccount";
import VerifyMail from "@/components/auth/VerifyMail";
import BasicInfo from "@/components/auth/BasicInfo";
import { useAppSelector } from "@/lib/redux/hooks";

const Signup = () => {
    const step = useAppSelector((state) => state.auth.curStep);
    // const step = 2;

    return (
        <div className="absolute top-0 left-0 w-full md:p-12 p-6 flex justify-center items-center bg-light-bg dark:bg-dark-bg min-h-full">
            <div className="bg-light-bg-sec dark:bg-dark-bg-sec w-fit md:min-h-[750px] rounded-xl shadow-md min-w-[500px] md:flex p-4 ">
                {step === 0 ? (
                    <CreateAccount />
                ) : step === 1 ? (
                    <VerifyMail />
                ) : (
                    <BasicInfo />
                )}
            </div>
        </div>
    );
};

export default Signup;
