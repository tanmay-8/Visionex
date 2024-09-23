"use client";
import React from "react";
import IdeaMenu from "./IdeaMenu";
import UserBanner from "../ui/UserBanner";
import Image from "next/image";
import {
    CircleCheckBig,
    Share,
} from "lucide-react";
import Comments from "./Comment/Comments";
import { getTimeString } from "@/lib/utils/otherUtils";
import Upvotes from "./Upvotes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Idea = ({ idea }) => {
    const router = useRouter();
    return (
        <div className="flex flex-col p-4 md:p-6 space-y-3  bg-light-bg-sec dark:bg-dark-bg-sec rounded-xl shadow-sm w-full min-h-72">
            <div className="flex justify-between items-center">
                <div
                    className="flex space-x-3 items-center cursor-pointer"
                    onClick={() => {
                        router.push(`/profile/${idea.owner.username}`);
                    }}
                >
                    <UserBanner src={idea.owner?.profileImageUrl} />
                    <div>
                        <h1 className="text-xl font-semibold">
                            {idea.owner.username}
                        </h1>
                        <p>{getTimeString(Date.now() - idea.createdAt)}</p>
                    </div>
                </div>
                <div>
                    <IdeaMenu idea={idea} />
                </div>
            </div>
            <div>
                <div className="p-4">
                    <Image
                        className="rounded-lg w-full max-h-[350px] border"
                        src={idea.images[0].url}
                        width={500}
                        height={300}
                        alt="post"
                    ></Image>
                </div>
                <div className="py-2 px-4">
                    <h1 className="text-xl font-semibold">{idea.title}</h1>
                    <p className="text-lg text-gray-500 text-wrap break-words">
                        {idea.description.length < 250
                            ? idea.description
                            : idea.description.slice(0, 250) + "..."}
                    </p>
                    <div className="py-2">
                        <Button
                            className="text-white"
                            onClick={() => {
                                router.push(`/idea/${idea.id}`);
                            }}
                        >
                            Read More
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between pt-6 px-4">
                    <div className="flex space-x-6">
                        <Upvotes ideaId={idea.id} />
                        <Comments ideaId={idea.id} />
                    </div>
                    <div
                        onClick={async () => {
                            await navigator.clipboard.writeText(
                                `${window.location.origin}/idea/${idea.id}`
                            );
                            toast("Link copied to clipboard", {
                                duration: 1000,
                                type: "success",
                                icon: (
                                    <CircleCheckBig size={20} color="#419197" />
                                ),
                            });
                        }}
                        className="cursor-pointer"
                    >
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
