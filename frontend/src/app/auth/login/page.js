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
            <div className="bg-light-bg-sec dark:bg-dark-bg-sec w-fit min-h-[750px] rounded-xl shadow-md  md:flex p-4 md:min-w-[500px] ">
                <LoginForm />   
            </div>
        </div>
    );
};

export default Login;
