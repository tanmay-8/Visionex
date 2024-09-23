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

export default function Following({ isOpen, onClose, username ,following}) {

    const handleUnfollow = async (followingUsername) => {
        // Implement unfollow mutation here
        toast.success(`Unfollowed ${followingUsername}`);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Following</DialogTitle>
                    <Button
                        variant="ghost"
                        className="absolute right-4 top-4"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>
                <ScrollArea className="h-[300px] w-full pr-4">
                    {following.map((user) => (
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
                                            Unfollow
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
