"use client";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "@/graphql/Queries";
import Image from "next/image";
import { EllipsisVertical, Menu, MenuIcon, Send, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Content from "@/components/profile/Content";
const Profile = ({ params }) => {
    const username = params.uid;
    const { data, loading, error } = useQuery(GET_USER_PROFILE, {
        variables: { username },
    });

    const getTotalUpvotes = (ideas) => {
        let total = 0;
        ideas.forEach((idea) => {
            total += idea.upvotesCount;
        });
        return total;
    };
    useEffect(() => {
        console.log(data);
    }, [data]);
    if (loading || !data) return <p>Loading...</p>;
    return (
        <div className="space-y-8 w-full h-full">
            <div className="w-full bg-light-bg-sec  dark:bg-dark-bg-sec rounded-lg relative">
                <EllipsisVertical className="absolute top-4 right-4 cursor-pointer" />
                <div className="flex flex-col gap-2 lg:gap-6 items-center lg:flex-row lg:items-start w-full p-6 pb-2">
                    <div className="w-[150px] h-[150px] bg-gray-100 rounded-full mt-2">
                        <Image
                            src={
                                data.getUserProfile.user.profileImageUrl
                                    ? data.getUserProfile.user.profileImageUrl
                                    : ""
                            }
                            alt="profile"
                            width={150}
                            height={150}
                            className="rounded-full text-center"
                        />
                    </div>
                    <div className="h-full py-4 text-center lg:text-left">
                        <h1 className="text-3xl font-semibold">
                            {data.getUserProfile.user.username}
                        </h1>
                        <h3 className="text-lg text-gray-500">
                            {data.getUserProfile.user.name}
                        </h3>

                        <div className="w-full justify-center lg:w-fit space-x-3 py-3 flex">
                            <Button className="bg-main text-white py-2 px-4 rounded-lg">
                                <UserPlus size={16} className="mr-2" />
                                Follow
                            </Button>

                            <Button
                                variant="outline"
                                className="text-main bg-light-bg-sec hover:text-main"
                            >
                                <Send size={16} className="mr-2" />
                                Message
                            </Button>
                        </div>
                        <div className="flex space-x-4 py-2">
                            <div>
                                <span className="text-lg font-semibold pr-2">
                                    {data.getUserProfile.user.ideas
                                        ? data.getUserProfile.user.ideas.length
                                        : 0}
                                </span>
                                <span className="text-gray-500">Ideas</span>
                            </div>
                            <div className="cursor-pointer">
                                <span className="text-lg font-semibold pr-2">
                                    0
                                </span>
                                <span className="text-gray-500">Following</span>
                            </div>
                            <div className="cursor-pointer">
                                <span className="text-lg font-semibold pr-2">
                                    0
                                </span>
                                <span className="text-gray-500">Followers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Content user={data.getUserProfile.user}/>
        </div>
    );
};

export default Profile;
