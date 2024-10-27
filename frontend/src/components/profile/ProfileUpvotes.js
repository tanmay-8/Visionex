"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight } from "lucide-react";
import { getTimeString } from "@/lib/utils/otherUtils";

export default function ProfileUpvotes({ upvotes = [] }) {
    const router = useRouter();
    const reverseUpvotes = upvotes.slice().reverse();
    if (upvotes.length === 0) {
        return (
            <Card className="p-4 bg-light-bg-sec dark:bg-dark-bg-sec">
                <p className="text-center text-muted-foreground">
                    No upvotes yet
                </p>
            </Card>
        );
    }

    return (
        <div className="p-4 space-y-4">
            {reverseUpvotes.map((upvote, index) => (
                <Card
                    key={index}
                    className="overflow-hidden transition-shadow hover:shadow-md bg-light-bg-sec dark:bg-dark-bg text-dark-bg dark:text-light-bg cursor-pointer"
                    onClick={() => router.push(`/idea/${upvote.ideaId}`)}
                >
                    <CardContent className="p-4 flex items-center space-x-4">
                        <Heart className="w-5 h-5 text-primary" />
                        <div className="flex-grow">
                            <p className="text-sm mb-1">Upvoted an idea</p>
                            <p className="text-xs text-muted-foreground">
                                {getTimeString(
                                    Date.now() - parseInt(upvote.createdAt)
                                )}
                            </p>
                        </div>
                        <ArrowRight className="w-5 h-5" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
