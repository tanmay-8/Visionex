import React from "react";
import PostMenu from "./PostMenu";
import UserBanner from "../ui/UserBanner";
import Image from "next/image";
import PostImg from "@/assets/temp/post.jpg";
import { Heart, MessageSquare, MoreHorizontalIcon, Share } from "lucide-react";
import PostDetails from "./PostDetails"
import Comments from "./Comments";

const Post = () => {
    return (
        <div className="flex flex-col p-4 md:p-6 space-y-3 min-h-72 bg-light-bg-sec dark:bg-dark-bg-sec rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
                <div className="flex space-x-3 items-center">
                    <UserBanner />
                    <div>
                        <h1 className="text-xl font-semibold">John Doe</h1>
                        <p>5 min ago</p>
                    </div>
                </div>
                <div>
                    <PostMenu />
                </div>
            </div>
            <div>
                <div className="p-4">
                    <Image
                        className="rounded-lg"
                        src={PostImg}
                        alt="post"
                    ></Image>
                </div>
                <div className="py-2 px-4">
                    <h1 className="text-xl font-semibold">
                        SmartHome Assistant - Revolutionizing Your Home
                        Experience
                    </h1>
                    <p className="text-lg text-gray-500">
                        Introducing SmartHome Assistant, a revolutionary
                        AI-powered home automation system designed to simplify
                        your life and enhance your living experience. Imagine
                        having a personal assistant that manages your home's
                        appliances, security, and entertainment, all from the
                        palm of your hand.
                    </p>
                    <span className="text-main py-1 cursor-pointer">
                        <PostDetails />
                    </span>
                </div>
                <div className="flex justify-between pt-6 px-4">
                    <div className="flex space-x-6">
                        <div className="flex items-center cursor-pointer">
                            <Heart
                                size={25}
                                className="mr-2"
                                color="rgb(107 114 128)"
                            />
                            <p>12</p>
                        </div>
                        <div>
                            <Comments />
                        </div>
                    </div>
                    <div className="">
                        <Share
                            size={25}
                            className="ml-2"
                            color="rgb(107 114 128)"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
