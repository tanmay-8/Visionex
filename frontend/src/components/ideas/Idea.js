import React from "react";
import IdeaMenu from "./IdeaMenu";
import UserBanner from "../ui/UserBanner";
import Image from "next/image";
import IdeaImg from "@/assets/temp/post.jpg";
import { Heart, MessageSquare, MoreHorizontalIcon, Share } from "lucide-react";
import IdeaDetails from "./IdeaDetails"
import Comments from "./Comments";

const Idea = ({idea}) => {
    return (
        <div className="flex flex-col p-4 md:p-6 space-y-3 min-h-72 bg-light-bg-sec dark:bg-dark-bg-sec rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
                <div className="flex space-x-3 items-center">
                    <UserBanner />
                    <div>
                        <h1 className="text-xl font-semibold">{idea.owner.name}</h1>
                        <p>{(((Date.now())-idea.createdAt)/(1000*60)).toFixed(0)} min ago</p>
                    </div>
                </div>
                <div>
                    <IdeaMenu />
                </div>
            </div>
            <div>
                <div className="p-4">
                    <Image
                        className="rounded-lg"
                        src={idea.images[0].url}
                        width={500} height={300}
                        alt="post"
                    ></Image>
                </div>
                <div className="py-2 px-4">
                    <h1 className="text-xl font-semibold">
                        {idea.title}
                    </h1>
                    <p className="text-lg text-gray-500 text-wrap break-words">
                        {
                            idea.description
                        }
                    </p>
                    <span className="text-main py-1 cursor-pointer">
                        <IdeaDetails />
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
                            <p>{idea.upvotes}</p>
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

export default Idea;
