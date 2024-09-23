"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "@/graphql/Queries";
import Image from "next/image";
import { X, UserPlus, Send } from "lucide-react";
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

const Followers = ({username }) => {
    const { data, loading, error } = useQuery(GET_FOLLOWERS, {
        variables: { username },
    });

    const currentUsername = useAppSelector((state) => state.user.username);

    const handleFollow = async (followerUsername) => {
        toast.success(`Followed ${followerUsername}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Dialog >
            <DialogTrigger>
                <span className="text-lg font-semibold pr-2">
                    {data?.getFollowers ? data.getFollowers.length : 0}
                </span>
                <span className="text-gray-500">Followers</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Followers</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[300px] w-full pr-4">
                    {data?.getFollowers?.map((user) => (
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
                                {currentUsername !== user.username && (
                                    <>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleFollow(user.username)
                                            }
                                        >
                                            <UserPlus
                                                size={16}
                                                className="mr-2"
                                            />
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Send size={16} className="mr-2" />
                                            Message
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
}

export default Followers;
