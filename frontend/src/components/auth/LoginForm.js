"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/Mutations";
import { set } from "date-fns";
import MyAlert from "./MyAlert";

const LoginForm = () => {
    const [login, { error }] = useMutation(LOGIN_USER);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [err, setErr] = useState("");
    const router = useRouter();
    const toSignup = () => {
        router.push("/auth/signup");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErr("Please enter all fields");
            return;
        }
        setLoading(true);
        try {
            const { data } = await login({
                variables: {
                    email,
                    password,
                },
            });
            if (data.login.error) {
                setErr(data.login.error);
                setLoading(false);
                return;
            }
            setTimeout(() => {}, [3000]);
            localStorage.setItem("visionToken", data.login.token);
            router.push("/");
        } catch (error) {
            setErr("An error occurred. Please try again.");
        }
        setLoading(false);
    };
    return (
        <div className="w-full max-w-[700px] px-2 md:px-10 py-10 md:py-20 rounded-3xl">
            <h1 className="text-3xl md:text-5xl font-semibold">Welcome Back</h1>
            <p className="font-medium md:text-lg text-gray-500 mt-4">
                Welcome back! Please enter you details.
            </p>
            <div className="mt-8">
                <form onSubmit={handleSubmit}>
                    {" "}
                    <div className="flex flex-col">
                        <label className="text-lg font-medium" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent outline-none"
                            placeholder="Enter your email"
                            id="email"
                            name="email"
                            type="email"
                            required={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label
                            className="text-lg font-medium"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent outline-none"
                            placeholder="Enter your password"
                            type={"password"}
                            id="password"
                            name="password"
                            required={true}
                            value={password}
                            minLength={8}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-6 space-y-4 lg:flex justify-between items-center">
                        <p onClick={(e)=>{
                            e.preventDefault();
                            router.push("/auth/forgotpassword");
                        }} className="font-medium text-base text-main cursor-pointer">
                            Forgot password
                        </p>
                    </div>
                    {err && (
                        <div className="pt-6 w-full text-center text-base text-red-500">
                            {err}
                        </div>
                    )}
                    <div className="mt-6 flex flex-col gap-y-4">
                        {loading && (
                            <MyAlert
                                title={"Wait"}
                                description={"Logging you in.."}
                                type={"Loading"}
                            />
                        )}
                        <input
                            className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-main rounded-xl text-white font-bold text-lg"
                            type={"submit"}
                            value={"Sign In"}
                        ></input>
                        {/* <button className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl  font-semibold text-lg border-2 border-gray-100 " >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                                    fill="#EA4335"
                                />
                                <path
                                    d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                                    fill="#4A90E2"
                                />
                                <path
                                    d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                                    fill="#FBBC05"
                                />
                            </svg>
                            Sign in with Google
                        </button> */}
                    </div>
                </form>

                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">
                        Don't have an account?
                    </p>
                    <button
                        onClick={toSignup}
                        className="ml-2 font-medium text-base text-main"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
