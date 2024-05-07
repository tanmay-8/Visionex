"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { DatePicker } from "../ui/DatePicker";

const BasicInfo = () => {
    const router = useRouter();
    const toLogin = () => {
        router.push("/auth/login");
    };
    return (
        <div className="w-full md:w-1/2 max-w-[700px] px-2 md:px-10 py-10 md:py-20 rounded-3xl">
            <h1 className="text-3xl md:text-5xl font-semibold">Basic Info</h1>
            <p className="font-medium md:text-lg text-gray-500 mt-4">
                Tell us about you !
            </p>
            <div className="mt-8 space-y-6">
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Name</label>
                    <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent outline-none"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-lg font-medium">Username</label>
                    <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent outline-none"
                        placeholder="Enter your username"
                        type={"text"}
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-lg font-medium">Date of Birth</label>
                    <div className="border-2 border-gray-100 rounded-xl">
                        <DatePicker />
                    </div>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-main rounded-xl text-white font-bold text-lg">
                        Register
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

export default BasicInfo;
