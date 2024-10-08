"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWING } from "@/graphql/Queries";
import Image from "next/image";
import { X, UserMinus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/lib/redux/hooks";
import { toast } from "sonner";
import { DialogTrigger } from "@radix-ui/react-dialog";

const Following = ({ username }) => {
    const { data, loading } = useQuery(GET_FOLLOWING, {
        variables: { username },
    });

    const handleUnfollow = async (followingUsername) => {
        // Implement unfollow mutation here
        toast.success(`Unfollowed ${followingUsername}`);
    };

    return (
        <Dialog>
            <DialogTrigger>
                <span className="text-lg font-semibold pr-2">
                    {data?.getFollowing ? data.getFollowing.length : 0}
                </span>
                <span className="text-gray-500">Following</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Following</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[300px] w-full pr-4">
                    {data?.getFollowing?.map((user) => (
                        <div
                            key={user.username}
                            className="flex items-center justify-between py-4 border-b last:border-b-0"
                        >
                            <div className="flex items-center space-x-4">
                                <Image
                                    src={
                                        user.profileImageUrl ||
                                        "https://github.com/shadcn.png"
                                    }
                                    alt={user.username}
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="font-semibold">
                                        {user.username}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {user.name}
                                    </p>
                                </div>
                            </div>
                            <div className="space-x-2">
                                {true && (
                                    <>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleUnfollow(user.username)
                                            }
                                        >
                                            <UserMinus
                                                size={16}
                                                className="mr-2"
                                            />
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Send size={16} className="mr-2" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default Following;
