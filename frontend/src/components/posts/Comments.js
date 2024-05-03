"use client";
import React, { useState, useEffect } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "../ui/drawer";
import { MessageSquare, X } from "lucide-react";
import GetIconColor from "@/lib/utils/GetIconColor";
import { useAppSelector } from "@/lib/redux/hooks";

const Comments = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const [iconColor, setIconColor] = useState();
    useEffect(() => {
        setIconColor(GetIconColor());
    }, []);
    return (
        <Drawer className="border-none">
            <DrawerTrigger asChild>
                <div className="flex items-center cursor-pointer">
                    <MessageSquare
                        size={25}
                        className="mr-2"
                        color="rgb(107 114 128)"
                    />
                    <p>12</p>
                </div>
            </DrawerTrigger>
            <DrawerContent
                className={`border-none bg-${theme}-bg-sec font-main h-[90vh]`}
            >
                {" "}
                <div
                    className={`h-[80vh] p-4 md:px-8 space-y-4 overflow-y-auto text-gray-800 flex justify-center${
                        theme === "dark" ? "text-gray-300" : ""
                    } `}
                >
                    <div className="lg:min-w-[800px] border h-80 mx-auto">
                      <div>
                        <input>
                        </input>
                      </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default Comments;
