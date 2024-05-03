"use client";
import React, { useState, useEffect } from "react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import UserBanner from "../ui/UserBanner";
import { X } from "lucide-react";
import GetIconColor from "@/lib/utils/GetIconColor";
import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";
import PostImg from "@/assets/temp/post.jpg";

const PostDetails = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const [iconColor, setIconColor] = useState();
    useEffect(() => {
        setIconColor(GetIconColor());
    }, []);
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div className="py-2">
                    <Button className="text-white">Read More</Button>
                </div>
            </DrawerTrigger>
            <DrawerContent className={`border-none bg-${theme}-bg-sec font-main`}>
                <div
                    className={`h-[80vh] -mt-4 p-4 md:px-8 space-y-4 overflow-y-auto text-gray-800 ${
                        theme === "dark" ? "text-gray-300" : ""
                    } `}
                >
                    <div className="flex  py-4 justify-between items-center">
                        <div
                            className={`flex text-gray-800 ${
                                theme === "dark" ? "text-gray-300" : ""
                            } space-x-3 items-center`}
                        >
                            <UserBanner />
                            <div>
                                <h1 className="text-xl font-semibold">
                                    John Doe
                                </h1>
                                <p>5 min ago</p>
                            </div>
                        </div>
                        <DrawerClose>
                            <X size={25} color={iconColor} />
                        </DrawerClose>
                    </div>

                    <div className="px-4 md:px-10 lg:flex">
                        <div className="lg:w-1/2 space-y-4  ">
                            <h1 className="text-2xl font-semibold">
                                SmartHome Assistant - Revolutionizing Your Home
                                Experience
                            </h1>
                            <div>
                                <Image
                                    src={PostImg}
                                    height={500}
                                    className="rounded-xl mx-auto lg:m-0"
                                    alt="SmartHome Assistant - Revolutionizing Your Home Experience"
                                ></Image>
                            </div>
                            <div className="py-2 md:pr-4">
                                <p className="text-xl text-gray-500">
                                    Introducing SmartHome Assistant, a
                                    revolutionary AI-powered home automation
                                    system designed to simplify your life and
                                    enhance your living experience. Imagine
                                    having a personal assistant that manages
                                    your home's appliances, security, and
                                    entertainment, all from the palm of your
                                    hand.
                                    Introducing SmartHome Assistant, a
                                    revolutionary AI-powered home automation
                                    system designed to simplify your life and
                                    enhance your living experience. Imagine
                                    having a personal assistant that manages
                                    your home's appliances, security, and
                                    entertainment, all from the palm of your
                                    hand.
                                    Introducing SmartHome Assistant, a
                                    revolutionary AI-powered home automation
                                    system designed to simplify your life and
                                    enhance your living experience. Imagine
                                    having a personal assistant that manages
                                    your home's appliances, security, and
                                    entertainment, all from the palm of your
                                    hand.
                                    Introducing SmartHome Assistant, a
                                    revolutionary AI-powered home automation
                                    system designed to simplify your life and
                                    enhance your living experience. Imagine
                                    having a personal assistant that manages
                                    your home's appliances, security, and
                                    entertainment, all from the palm of your
                                    hand.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default PostDetails;
