"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import UserBanner from "@/components/ui/UserBanner";
import { X } from "lucide-react";
import GetIconColor from "@/lib/utils/GetIconColor";
import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";
import IdeaImg from "@/assets/temp/post.jpg";

export default function IdeaDetails() {
    const theme = useAppSelector((state) => state.theme.theme);
    const [iconColor, setIconColor] = useState();

    useEffect(() => {
        // setIconColor(GetIconColor());
        setIconColor("rgb(209 213 219)");
    }, []);

    return (
        <div
            className={`min-h-screen ${
                theme === "dark"
                    ? "bg-dark-bg-sec text-light-text"
                    : "bg-light-bg-sec text-dark-text"
            } font-main rounded-lg`}
        >
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center px-4 mb-1">
                    <div className="flex space-x-3 items-center">
                        <UserBanner size="md" />
                        <div>
                            <h1 className="text-xl font-semibold">John Doe</h1>
                            <p>5 min ago</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <X size={25} color={iconColor} />
                    </Button>
                </div>

                <div className="p-4">
                    <div className=" space-y-4">
                        <h1 className="text-3xl font-semibold">
                            SmartHome Assistant - Revolutionizing Your Home
                            Experience
                        </h1>
                        <div>
                            <Image
                                src={IdeaImg}
                                height={500}
                                className="rounded-xl w-full"
                                alt="SmartHome Assistant - Revolutionizing Your Home Experience"
                            />
                        </div>
                        <div className="py-4">
                            <p className="text-xl text-gray-500">
                                Introducing SmartHome Assistant, a revolutionary
                                AI-powered home automation system designed to
                                simplify your life and enhance your living
                                experience. Imagine having a personal assistant
                                that manages your home's appliances, security,
                                and entertainment, all from the palm of your
                                hand. Introducing SmartHome Assistant, a
                                revolutionary AI-powered home automation system
                                designed to simplify your life and enhance your
                                living experience. Imagine having a personal
                                assistant that manages your home's appliances,
                                security, and entertainment, all from the palm
                                of your hand. Introducing SmartHome Assistant, a
                                revolutionary AI-powered home automation system
                                designed to simplify your life and enhance your
                                living experience. Imagine having a personal
                                assistant that manages your home's appliances,
                                security, and entertainment, all from the palm
                                of your hand. Introducing SmartHome Assistant, a
                                revolutionary AI-powered home automation system
                                designed to simplify your life and enhance your
                                living experience. Imagine having a personal
                                assistant that manages your home's appliances,
                                security, and entertainment, all from the palm
                                of your hand.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
