"use client";
import React, { useEffect, useState } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import MyAlert from "@/components/auth/MyAlert";

const ResetPassword = ({ params }) => {
    const [loading, setLoading] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [err, setErr] = useState("");
    const token = params.token; // Token from URL

    const verifyToken = async () => {
        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "/api/auth/verifyResetToken",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                }
            );

            const data = await res.json();
            if (data.success) {
                setTokenValid(true);
            } else {
                setErr(data.message || "Invalid token");
            }
        } catch (err) {
            setErr("An error occurred while verifying the token.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyToken();
    }, [token]);

    if (loading) {
        return (
            <div className="absolute top-0 left-0 w-full md:p-12 p-6 flex justify-center items-center bg-light-bg dark:bg-dark-bg min-h-full">
                <div className="bg-light-bg-sec dark:bg-dark-bg-sec w-fit rounded-xl shadow-md  md:flex p-4 md:min-w-[500px] ">
                    <MyAlert
                        title="Loading"
                        description="Verifying token..."
                        type="Loading"
                    />
                </div>
            </div>
        );
    }

    if (!tokenValid) {
        return (
            <div className="absolute top-0 left-0 w-full md:p-12 p-6 flex justify-center items-center bg-light-bg dark:bg-dark-bg min-h-full">
                <div className="bg-light-bg-sec dark:bg-dark-bg-sec w-fit rounded-xl shadow-md  md:flex p-4 md:min-w-[500px] ">
                    <MyAlert title="Error" description={err} type="Error" />
                </div>
            </div>
        );
    }

    return (
        <div className="absolute top-0 left-0 w-full md:p-12 p-6 flex justify-center items-center bg-light-bg dark:bg-dark-bg min-h-full">
            <div className="bg-light-bg-sec dark:bg-dark-bg-sec w-fit rounded-xl shadow-md  md:flex p-4 md:min-w-[500px] ">
                <ResetPasswordForm token={token} />
            </div>
        </div>
    );
};

export default ResetPassword;
