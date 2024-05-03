"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { setTheme } from "@/lib/redux/features/themeSlice";
import UserBanner from "@/components/ui/UserBanner";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/DatePicker";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Settings = () => {
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();
    const toggleTheme = () => {
        if (theme.theme === "light") {
            dispatch(setTheme("dark"));
            localStorage.setItem("theme", "dark");
        } else {
            dispatch(setTheme("light"));
            localStorage.setItem("theme", "light");
        }
    };
    return (
        <div className="space-y-12">
            <div className="pb-4">
                <h1 className="text-3xl font-bold">Settings</h1>
            </div>
            <div className="flex  text-base font-medium space-x-4 md:space-x-8">
                <Avatar className={`w-24 h-24`}>
                    <AvatarImage
                        className={`w-24 h-24`}
                        src="https://github.com/shadcn.png"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <div className="text-gray-500 p-1">Profile Picture</div>
                    <div className="flex space-x-4 p-1">
                        <button className="w-24 py-2 rounded-lg text-white bg-main">
                            Edit
                        </button>
                        <button className="w-24 py-2 rounded-lg border border-red-500 text-red-500">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className="space-y-10 p-1">
                <div className="text-gray-500">Basic Information</div>
                <div className="space-y-10 lg:space-y-0 lg:flex lg:space-x-10">
                    <div className="space-y-2 flex flex-col">
                        <Label className="dark:text-gray-300 text-gray-800">
                            NAME
                        </Label>
                        <input
                            className="min-w-72 lg:min-w-96 p-4 dark:bg-dark-bg-sec bg-light-bg-sec rounded-lg outline-none "
                            placeholder="NAME"
                            value={"John Doe"}
                        />
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <Label className="dark:text-gray-300 text-gray-800">
                            USERNAME
                        </Label>
                        <input
                            className="min-w-72 lg:min-w-96 p-4 dark:bg-dark-bg-sec bg-light-bg-sec rounded-lg outline-none "
                            placeholder="USERNAME"
                            value={"john_doe"}
                        />
                    </div>
                </div>
                <div className="space-y-10 lg:space-y-0 lg:flex lg:space-x-10">
                    <div className="space-y-2 flex flex-col">
                        <Label className="dark:text-gray-300 text-gray-800">
                            EMAIL
                        </Label>
                        <input
                            className="min-w-72 lg:min-w-96 p-4 dark:bg-dark-bg-sec bg-light-bg-sec rounded-lg outline-none "
                            placeholder="EMAIL"
                            value={"johndoe@gmail.com"}
                        />
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <Label className="dark:text-gray-300 text-gray-800">
                            BIRTH-DATE
                        </Label>
                        <DatePicker />
                    </div>
                </div>
            </div>
            <Separator className="h-[1px] bg-gray-500" />
            <div className="space-y-10 p-1">
                <div className="text-gray-500">Other</div>
                <div className="space-y-10 lg:space-y-0 lg:flex lg:space-x-10">
                    <div className="flex items-center space-x-4">
                        <Switch
                            id="airplane-mode"
                            onClick={toggleTheme}
                            className="bg-black"
                        />
                        <Label htmlFor="airplane-mode">Dark Mode</Label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
