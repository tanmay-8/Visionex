"use client";
import React, { useEffect, useState } from "react";
import UserBanner from "../../ui/UserBanner";
import { Heart, MessageSquare } from "lucide-react";
import GetIconColor from "@/lib/utils/GetIconColor";
import { getTimeString } from "@/lib/utils/otherUtils";
import { useRouter } from "next/navigation";

const Comment = ({ comment }) => {
    const [iconColor, setIconColor] = useState(GetIconColor());
    const router = useRouter();
    useEffect(() => {
        setIconColor(GetIconColor());
    }, []);
    console.log(comment);
    return (
        <div className="space-y-2">
            <div className="flex justify-between md:text-lg items-center">
                <div
                    className="flex space-x-3 items-center cursor-pointer"
                    onClick={() => {
                        router.push(`/profile/${comment.user.username}`);
                    }}
                >
                    <UserBanner size={8} src={comment.user.profileImageUrl} />
                    <span>{comment.user ? comment.user.username : ""}</span>
                </div>
                <div className="text-gray-500">
                    {getTimeString(Date.now() - comment.createdAt)}
                </div>
            </div>

            <div className="text-sm md:text-base">{comment.text}</div>
            <div className="flex space-x-4">
                <Heart size={20} color={iconColor} />
                <MessageSquare size={20} color={iconColor} />
            </div>
        </div>
    );
};

export default Comment;
