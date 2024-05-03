"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
    Compass,
    Home,
    Inbox,
    Lightbulb,
    LogOut,
    Mail,
    Settings,
    User,
    UserIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import GetIconColor from "@/lib/utils/GetIconColor";

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [iconColor, setIconColor] = useState("");

    useEffect(() => {
        setIconColor(GetIconColor());
    }, [iconColor]);

    const navItems = [
        {
            label: "Home",
            icon: (
                <Home
                    size={25}
                    color={pathname === "/" ? "#374151" : "white"}
                />
            ),
            to: "/",
            isselected: pathname === "/",
        },
        {
            label: "Explore",
            icon: (
                <Compass
                    size={25}
                    color={pathname === "/explore" ? "#374151" : "white"}
                />
            ),
            to: "/explore",
            isselected: pathname === "/explore",
        },
        // {
        //     label: "Inbox",
        //     icon: (
        //         <Mail
        //             size={25}
        //             color={pathname === "/inbox" ? "#374151" : "white"}
        //         />
        //     ),
        //     to: "/inbox",
        //     isselected: pathname === "/inbox",
        // },
        {
            label: "Profile",
            icon: (
                <UserIcon
                    size={25}
                    color={pathname === "/profile" ? "#374151" : "white"}
                />
            ),
            to: "/profile",
            isselected: pathname === "/profile",
        },
        {
            label: "Settings",
            icon: (
                <Settings
                    size={25}
                    color={pathname === "/settings" ? "#374151" : "white"}
                />
            ),
            to: "/settings",
            isselected: pathname === "/settings",
        },
    ];

    const goTo = (to) => {
        router.push(to);
    };
    return (
        <div
            id="sidebar"
            className="flex -translate-x-full md:translate-x-0 h-screen md:flex flex-col py-6 px-10 bg-main dark:bg-dark-bg-sec items-center space-y-24 shadow-sm m-0 mr-5 fixed top-0 left-0 transition-all z-20"
        >
            <div>
                <Lightbulb size={50} color="white" />
            </div>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="space-y-6">
                    {navItems.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex p-4 items-center rounded-2xl cursor-pointer ${
                                    item.isselected
                                        ? "bg-white scale-110"
                                        : "bg-white/10 hover:scale-110 hover:bg-white/20  "
                                } transition-all`}
                                onClick={() => goTo(item.to)}
                            >
                                {item.icon}
                            </div>
                        );
                    })}
                </div>
                <div>
                    <button className="p-4 border-[1px] border-white rounded-2xl">
                        <LogOut size={20} color="white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
