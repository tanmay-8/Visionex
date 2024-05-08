"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DatePicker } from "../ui/DatePicker";
import {setName,setDob,setUsername} from "@/lib/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { REGISTER_USER } from "@/graphql/Mutations";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import MyAlert from "./MyAlert";


const BasicInfo = () => {
    const dispatch = useDispatch();
    const [register, { error }] = useMutation(REGISTER_USER);
    const email = useAppSelector((state) => state.auth.email);
    const password = useAppSelector((state) => state.auth.password);
    const [name, setCurName] = useState("");
    const [username, setCurUsername] = useState("");
    const [dob, setCurDob] = useState(new Date());
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const toLogin = () => {
        router.push("/auth/login");
    };

    const onRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (name === "" || username === "" || dob === "") {
                setErr("Please fill all the fields");
                return;
            }
            const res = await register({
                variables: {
                    email,
                    password,
                    name,
                    username,
                    birthDate: dob,
                },
            });
            console.log(res);
            if (res.data.createUser.error) {
                setErr(res.data.createUser.error);
                setLoading(false);
                return;
            } else {
                dispatch(setName(name));
                dispatch(setUsername(username));
                dispatch(setDob(dob));
                setErr("");
                router.push("/auth/login")
            }
        } catch (e) {
            setErr("Something went wrong !");
            console.log(e);
        }
        setLoading(false);
    };
    return (
        <div className="w-full md:w-1/2 max-w-[700px] px-2 md:px-10 py-10 md:py-20 rounded-3xl">
            <h1 className="text-3xl md:text-5xl font-semibold">Basic Info</h1>
            <p className="font-medium md:text-lg text-gray-500 mt-4">
                Tell us about you !
            </p>
            <div className="mt-8 ">
                <form className="space-y-6" onSubmit={onRegister}>
                    <div className="flex flex-col">
                        <label className="text-lg font-medium">Name</label>
                        <input
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent outline-none"
                            placeholder="Enter your name"
                            type={"text"}
                            required={true}
                            minLength={5}
                            value={name}
                            onChange={(e) => setCurName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="text-lg font-medium">Username</label>
                        <input
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent outline-none"
                            placeholder="Enter your username"
                            type={"text"}
                            required={true}
                            minLength={5}
                            value={username}
                            onChange={(e) => setCurUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="text-lg font-medium">
                            Date of Birth
                        </label>
                        <div className="border-2 border-gray-100 rounded-xl">
                            <DatePicker date={dob} setDate={setCurDob} />
                        </div>
                    </div>

                    {err && (
                        <div className="py-3 w-full text-center text-base text-red-500">
                            {err}
                        </div>
                    )}
                    <div className="mt-8 flex flex-col gap-y-4">
                        <input
                            className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-main rounded-xl text-white font-bold text-lg text-center"
                            value={"Register"}
                            type="submit"
                        ></input>
                        {loading && (
                            <MyAlert
                                title={"Wait"}
                                description={"Registering you..."}
                                type={"Loading"}
                            />
                        )}
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
                </form>
            </div>
        </div>
    );
};

export default BasicInfo;
