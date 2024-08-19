"use client";
import React, { useEffect, useState } from "react";
import UserBanner from "../../ui/UserBanner";
import { Heart, MessageSquare } from "lucide-react";
import GetIconColor from "@/lib/utils/GetIconColor";
import { getTimeString } from "@/lib/utils/otherUtils";
import { useRouter } from "next/navigation";
import CommentUpvotes from "./CommentUpvotes";

const Reply = ({ reply }) => {
    const [iconColor, setIconColor] = useState(GetIconColor());
    const router = useRouter();
    useEffect(() => {
        setIconColor(GetIconColor());
    }, []);
    console.log(reply);
    return (
        <div className="space-y-2">
            <div className="flex justify-between  items-center">
                <div
                    className="flex space-x-1 sm:text-base text-sm items-center cursor-pointer"
                    onClick={() => {
                        router.push(`/profile/${reply.user.username}`);
                    }}
                >
                    <UserBanner size={6} src={reply.user.profileImageUrl} />
                    <span>{reply.user ? reply.user.username : ""}</span>
                </div>
                <div className="text-gray-500 text-xs sm:text-sm">
                    {getTimeString(Date.now() - reply.createdAt)}
                </div>
            </div>

            <div className="text-sm md:text-base pl-8">{reply.text}</div>
            <div className="flex space-x-2 items-center pl-8 relative">
                <CommentUpvotes commentId={reply.id} />
            </div>
        </div>
    );
};

export default Reply;
