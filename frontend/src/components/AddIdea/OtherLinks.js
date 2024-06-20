import React from "react";
import { Mail, Phone, Linkedin, Twitter, Instagram } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Label } from "../ui/label";
import {
    setEmail,
    setInstagram,
    setLinkedin,
    setTwitter,
} from "@/lib/redux/features/addIdeaSlice";

const OtherLinks = () => {
    const theme = useAppSelector((state) => state.theme.theme);

    const inputClass = `${
        theme === "light"
            ? "bg-light-bg-sec text-dark-text"
            : "bg-dark-bg-sec text-light-text"
    } w-full bg-none outline-none border-none py-2`;

    const dispatch = useAppDispatch();

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
                        onChange={(e) => {
                            dispatch(setEmail(e.target.value));
                        }}
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
                        onChange={(e) => {
                            dispatch(setLinkedin(e.target.value));
                        }}
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
                        onChange={(e) => {
                            dispatch(setTwitter(e.target.value));
                        }}
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
                        onChange={(e) => {
                            dispatch(setInstagram(e.target.value));
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default OtherLinks;
