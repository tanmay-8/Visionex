"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileComments({ comments = [] }) {
    const router = useRouter();
    if (comments.length === 0) {
        return (
            <Card className="p-4">
                <p className="text-center text-muted-foreground">
                    No comments yet
                </p>
            </Card>
        );
    }

    return (
        <div className="p-4 space-y-4">
            {comments.map((comment, index) => (
                <Card
                    key={index}
                    className="overflow-hidden transition-shadow hover:shadow-md  bg-light-bg-sec dark:bg-dark-bg text-dark-bg dark:text-light-bg cursor-pointer"
                    onClick={() => router.push(`/idea/${comment.ideaId}`)}
                >
                    <CardContent className="p-4 flex items-start space-x-4">
                        <MessageCircle className="w-5 h-5 mt-1 text-primary" />
                        <div className="flex-grow">
                            <p className="text-sm  mb-1">
                                Commented on:{" "}
                                <span className="font-medium">
                                    {comment.idea.title}
                                </span>
                            </p>
                            <p className="">{comment.text}</p>
                        </div>
                        <ArrowRight className="w-5 h-5" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
