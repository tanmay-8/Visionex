import React from "react";
import { Mail, Phone, Linkedin, Twitter, Instagram } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import { Label } from "../ui/label";

const OtherLinks = () => {
    const theme = useAppSelector((state) => state.theme.theme);

    const inputClass = `${
        theme === "light"
            ? "bg-light-bg-sec text-dark-text"
            : "bg-dark-bg-sec text-light-text"
    } w-full bg-none outline-none border-none py-2`;

    return (
        <div
            className={`${
                theme === "light"
                    ? "bg-light-bg-sec text-dark-text"
                    : "bg-dark-bg-sec text-light-text"
            } p-4 rounded-lg space-y-4`}
        >
            <div className="md:flex md:space-x-6 space-y-4 md:space-y-0 w-full">
                <div className="relative flex border rounded-lg p-2 items-center w-full">
                    <span className="p-2">
                        <Mail className="h-6 w-6 text-gray-400" />
                    </span>
                    <input
                        className={inputClass}
                        placeholder="Email"
                        type="email"
                    />
                </div>
                <div className="relative flex border rounded-lg p-2 items-center  w-full">
                    <span className="p-2">
                        <Linkedin className="h-6 w-6 text-gray-400" />
                    </span>
                    <input
                        className={inputClass}
                        placeholder="LinkedIn"
                        type="url"
                    />
                </div>
            </div>
            <div className="md:flex md:space-x-6 space-y-4 md:space-y-0 w-full">
                <div className="relative flex border rounded-lg p-2 items-center w-full">
                    <span className="p-2">
                        <Twitter className="h-6 w-6 text-gray-400" />
                    </span>
                    <input
                        className={inputClass}
                        placeholder="Twitter"
                        type="url"
                    />
                </div>
                <div className="relative flex border rounded-lg p-2 items-center w-full">
                    <span className="p-2">
                        <Instagram className="h-6 w-6 text-gray-400" />
                    </span>
                    <input
                        className={inputClass}
                        placeholder="Instagram"
                        type="url"
                    />
                </div>
            </div>
        </div>
    );
};

export default OtherLinks;
