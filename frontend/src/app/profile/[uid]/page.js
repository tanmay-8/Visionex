"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "@/graphql/Queries";
import Image from "next/image";
import {
    EllipsisVertical,
    Menu,
    MenuIcon,
    Send,
    UserMinus,
    UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Content from "@/components/profile/Content";
import { useAppSelector } from "@/lib/redux/hooks";
import { FOLLOW_USER, UNFOLLOW_USER } from "@/graphql/Mutations";
import { toast } from "sonner";
import Following from "@/components/profile/Following";
import Loading from "./loading";
import Followers from "@/components/profile/Followers";

const Profile = ({ params }) => {
    const username = decodeURIComponent(params.uid);
    const { data, loading, error } = useQuery(GET_USER_PROFILE, {
        variables: { username },
    });
    const [followUser, { loading: followLoading }] = useMutation(FOLLOW_USER);
    const [unfollowUser, { loading: unfollowLoading }] =
        useMutation(UNFOLLOW_USER);

    const [isFollowed, setIsFollowed] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowingOpen, setIsFollowingOpen] = useState(false);
    const [isFollowersOpen, setIsFollowersOpen] = useState(false);
    const curusername = useAppSelector((state) => state.user.username);

    const getTotalUpvotes = (ideas) => {
        let total = 0;
        ideas.forEach((idea) => {
            total += idea.upvotesCount;
        });
        return total;
    };
    const handleFollow = async () => {
        await followUser({ variables: { username } });
        setIsFollowed(true);
        toast.success("Followed user");
    };
    const handleUnfollow = async () => {
        await unfollowUser({ variables: { username } });
        setIsFollowed(false);
        toast.success("Unfollowed user");
    };
    useEffect(() => {
        console.log(data);
        if (data) {
            setIsFollowed(data.getUserProfile.user.isFollowed);
            setIsFollowing(data.getUserProfile.user.isFollowing);
        }
    }, [data]);

    if (loading) return <Loading />;
    return (
        <div className="space-y-8 w-full h-full">
            <div className="w-full bg-light-bg-sec  dark:bg-dark-bg-sec rounded-lg relative">
                {/* <EllipsisVertical className="absolute top-4 right-4 cursor-pointer" /> */}
                <div className="flex flex-col gap-2 lg:gap-6 items-center lg:flex-row lg:items-start w-full p-4 pb-2">
                    <div className="w-[140px] h-[140px] bg-gray-100 rounded-full mt-2 mb-2">
                        <Image
                            src={
                                data.getUserProfile.user.profileImageUrl
                                    ? data.getUserProfile.user.profileImageUrl
                                    : "https://github.com/shadcn.png"
                            }
                            alt="profile"
                            width={140}
                            height={140}
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

                        {data.getUserProfile.user.username !== curusername && (
                            <div className="w-full justify-center lg:w-fit space-x-3 py-3 flex">
                                <Button
                                    className="bg-main text-white py-2 px-4 rounded-lg"
                                    onClick={
                                        isFollowed
                                            ? handleUnfollow
                                            : handleFollow
                                    }
                                >
                                    {isFollowed ? (
                                        <UserMinus size={16} className="mr-2" />
                                    ) : (
                                        <UserPlus size={16} className="mr-2" />
                                    )}
                                    {isFollowed ? "Unfollow" : "Follow"}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-main bg-light-bg-sec hover:text-main"
                                >
                                    <Send size={16} className="mr-2" />
                                    Message
                                </Button>
                            </div>
                        )}
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
                                <Following username={username} />
                            </div>
                            <div className="cursor-pointer">
                                <Followers username={username} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Content user={data.getUserProfile.user} />
        </div>
    );
};

export default Profile;
