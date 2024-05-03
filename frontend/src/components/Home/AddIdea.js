import GetIconColor from "@/lib/utils/GetIconColor";
import React from "react";
import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChevronRight, CameraIcon, VideoIcon, Plus } from "lucide-react";
import UserBanner from "../ui/UserBanner";

const AddIdea = () => {
    const [iconColor, setIconColor] = useState("#374151");

    useEffect(() => {
        setIconColor(GetIconColor());
    }, [iconColor]);

    return (
        <div className="bg-light-bg-sec dark:bg-dark-bg-sec space-y-6 rounded-xl shadow-sm p-4 md:p-8">
            <div className="flex space-x-4 ">
                <div className="h-full">
                    <UserBanner/>
                </div>

                <div className="w-full space-y-6">
                    <Textarea
                        placeholder={"Share your vision..."}
                        spellCheck={false}
                        className="text-gray-800 dark:text-gray-300 dark:border-gray-300 text-lg px-4 rounded-lg"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex space-x-4 items-center">
                    <div className="p-2 bg-gray-300/20 rounded-2xl cursor-pointer hover:bg-gray-300/50 transition-all">
                        <CameraIcon size={25} color={iconColor} />
                    </div>
                    <div className="p-2 bg-gray-300/20 rounded-2xl cursor-pointer hover:bg-gray-300/50 transition-all">
                        <VideoIcon size={25} color={iconColor} />
                    </div>
                    <div className="p-2 bg-gray-300/20 rounded-2xl cursor-pointer hover:bg-gray-300/50 transition-all">
                        <Plus size={25} color={iconColor} />
                    </div>
                </div>
                <div>
                    <Button className="bg-main hover:scale-110 transition-all text-base  items-center text-white">
                        Share
                        <ChevronRight className="ml-1 h-5 w-5" color="white" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddIdea;
