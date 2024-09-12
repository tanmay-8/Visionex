import React, { useState } from "react";
import MyAlert from "./MyAlert";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "/api/auth/sendResetMail",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                }
            );
            const data = await res.json();
            if (!data.success) {
                setErr(data.message);
                return;
            }

            router.push("/auth/login");
        } catch (err) {
            console.log(err);
            setErr("An error occurred. Please try again.");
        }
    };
    return (
        <div className="w-full max-w-[700px] px-2 md:px-10 py-10  rounded-3xl">
            <h1 className="text-3xl md:text-5xl font-semibold">
                Forgot Password
            </h1>
            <p className="font-medium md:text-lg text-gray-500 mt-4">
                Enter your email to reset your password.
            </p>
            <div className="mt-16">
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
                    {err && (
                        <div className="pt-6 w-full text-center text-base text-red-500">
                            {err}
                        </div>
                    )}
                    <div className="mt-6 flex flex-col gap-y-4">
                        {loading && (
                            <MyAlert
                                title={"Wait"}
                                description={"Processing.."}
                                type={"Loading"}
                            />
                        )}
                        <input
                            className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-3 cursor-pointer bg-main rounded-xl text-white font-bold text-lg"
                            type={"submit"}
                            value={"Send Link"}
                        ></input>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
