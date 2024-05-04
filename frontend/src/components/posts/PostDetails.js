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
import Comment from "./Comment";

const PostDetails = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const [iconColor, setIconColor] = useState();
    useEffect(() => {
        // setIconColor(GetIconColor());
        setIconColor("rgb(209 213 219)");
    }, []);
    const comments = [
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !,This is very good idea !,This is very good idea !,This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
        {
            username: "john_doe",
            comment: "This is very good idea !",
        },
    ];
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div className="py-2">
                    <Button className="text-white">Read More</Button>
                </div>
            </DrawerTrigger>
            <DrawerContent
                className={`border-none ${
                    theme === "dark" ? "bg-dark-bg-sec" : "bg-light-bg-sec"
                } font-main`}
            >
                <div
                    className={`h-[80vh] -mt-4 p-4 md:px-8 space-y-4 overflow-y-auto ${
                        theme === "dark" ? "text-light-text" : "text-dark-text"
                    }`}
                >
                    <div className="flex  py-4 justify-between items-center">
                        <div className={`flex space-x-3 items-center`}>
                            <UserBanner size={"md"} />
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

                    <div className="px-4 md:px-10 lg:flex lg:space-x-4">
                        <div className="lg:w-1/2 h-[65vh] space-y-4  overflow-auto fixed md:left-12 top-28 p-3 left-4">
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
                                    hand. Introducing SmartHome Assistant, a
                                    revolutionary AI-powered home automation
                                    system designed to simplify your life and
                                    enhance your living experience. Imagine
                                    having a personal assistant that manages
                                    your home's appliances, security, and
                                    entertainment, all from the palm of your
                                    hand. Introducing SmartHome Assistant, a
                                    revolutionary AI-powered home automation
                                    system designed to simplify your life and
                                    enhance your living experience. Imagine
                                    having a personal assistant that manages
                                    your home's appliances, security, and
                                    entertainment, all from the palm of your
                                    hand. Introducing SmartHome Assistant, a
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
                        <div
                            className={`hidden lg:block space-y-10 ${
                                theme === "dark"
                                    ? " text-light-text"
                                    : " text-dark-text"
                            } p-2 h-[65vh] w-[40%] overflow-auto fixed right-4 top-28`}
                        >
                            {comments.map((comment, index) => {
                                return (
                                    <Comment comment={comment} key={index} />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default PostDetails;
