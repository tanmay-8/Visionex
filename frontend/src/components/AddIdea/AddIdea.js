import GetIconColor from "@/lib/utils/GetIconColor";
import React from "react";
import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { ChevronRight, CameraIcon, VideoIcon, Plus } from "lucide-react";
import UserBanner from "../ui/UserBanner";
import PhotoUpload from "./PhotoUpload";
import VideoUpload from "./VideoUpload";
import AddIdeaDetails from "./AddIdeaDetails";

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
                        className="text-gray-800 dark:text-gray-300 dark:border-gray-300 text-lg rounded-lg"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex space-x-4 items-center">
                    <PhotoUpload iconColor={iconColor}/>
                    <VideoUpload iconColor={iconColor}/>
                    {/* <div className="p-2 bg-gray-300/20 rounded-2xl cursor-pointer hover:bg-gray-300/50 transition-all">
                        <Plus size={25} color={iconColor} />
                    </div> */}
                </div>
                <div>
                    <AddIdeaDetails />
                </div>
            </div>
        </div>
    );
};

export default AddIdea;