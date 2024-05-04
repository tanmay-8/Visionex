'use client';
import React, { useEffect, useState } from "react";
import UserBanner from "../ui/UserBanner";
import { Heart, MessageSquare } from "lucide-react";
import GetIconColor from "@/lib/utils/GetIconColor";

const Comment = ({ comment }) => {
    const [iconColor,setIconColor] = useState(GetIconColor());
    useEffect(()=>{
        setIconColor(GetIconColor())
    },[])
    console.log(comment);
    return (
        <div className="space-y-2">
            <div className="flex justify-between md:text-lg items-center">
                <div className="flex space-x-3 items-center">
                    <UserBanner size={8} />
                    <span>{comment.username}</span>
                </div>
                <div className="text-gray-500">
                    5 min ago
                </div>
            </div>

            <div className="text-sm md:text-base">{comment.comment}</div>
            <div className="flex space-x-4">
                <Heart size={20}color={iconColor}/>
                <MessageSquare size={20}color={iconColor}/>
            </div>
        </div>
    );
};

export default Comment;
