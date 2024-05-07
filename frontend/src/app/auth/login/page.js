"use client";
import LoginForm from "@/components/auth/LoginForm";
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
    const isLogged  = useAppSelector(state=>state.user.isLogged);
    console.log(isLogged);
    const router = useRouter();
    useEffect(()=>{
        if(isLogged){
            router.push("/");
        }
    },[isLogged])
    return (
        <div className="absolute top-0 left-0 w-full md:p-12 p-6 flex justify-center items-center bg-light-bg dark:bg-dark-bg min-h-full">
            <div className="bg-light-bg-sec dark:bg-dark-bg-sec w-full min-h-[750px] rounded-xl shadow-md lg:w-10/12 md:flex p-4 ">
                <LoginForm />   
                <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8 rounded-xl bg-blue-700"></div>
            </div>
        </div>
    );
};

export default Login;
