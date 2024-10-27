"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_IDEA } from "@/graphql/Queries";
import { useAppSelector } from "@/lib/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, MessageCircle, Share2, ChevronLeft, CircleCheckBigIcon } from "lucide-react";
import IdeaMenu from "./IdeaMenu";
import IdeaMedia from "./IdeaMedia";
import UserBanner from "../ui/UserBanner";
import { getTimeString } from "@/lib/utils/otherUtils";
import { useRouter } from "next/navigation";
import Comments from "./Comment/Comments";
import Upvotes from "./Upvotes";
import { toast } from "sonner";

export default function IdeaDetails({ ideaId }) {
    const theme = useAppSelector((state) => state.theme.theme);
    const router = useRouter();
    const { data, loading } = useQuery(GET_IDEA, {
        variables: { ideaId },
    });
    const [liked, setLiked] = useState(false);

    const idea = data?.getIdea;

    return (
        <div
            className={`min-h-screen rounded-xl dark:bg-dark-bg-sec dark:text-light-bg bg-light-bg-sec text-dark-bg
            p-2 `}
        >
            <header className="sticky rounded-t-xl top-0 z-10 bg-light-bg-sec/80 dark:bg-dark-bg-sec/80 backdrop-blur-sm border-b">
                <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            router.back();
                        }}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <div className="flex items-center space-x-6">
                        <Upvotes ideaId={ideaId} isDetailed />
                        <Comments ideaId={ideaId} isDetailed />
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={async () => {
                                await navigator.clipboard.writeText(
                                    `${window.location.origin}/idea/${idea.id}`
                                );
                                toast("Link copied to clipboard", {
                                    duration: 1000,
                                    type: "success",
                                    icon: (
                                        <CircleCheckBigIcon
                                            size={20}
                                            color="#419197"
                                        />
                                    ),
                                });
                            }}
                        >
                            <Share2 className="mr-2 h-4 w-4" />
                            <span className="hidden md:block">Share</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="w-full p-4">
                <section className="mb-8 w-full">
                    {loading ? (
                        <Skeleton className="h-64 w-full rounded-lg mb-8" />
                    ) : (
                        <div className="w-full flex justify-center items-center pt-4 pb-8">
                            <IdeaMedia
                                images={idea?.images}
                                videos={idea?.videos}
                            />
                        </div>
                    )}
                    {loading ? (
                        <Skeleton className="h-12 w-3/4 mb-4" />
                    ) : (
                        <h1 className="text-2xl md:text-5xl font-bold mb-4">
                            {idea?.title}
                        </h1>
                    )}
                </section>

                <section className="flex items-center justify-between mb-8">
                    <div
                        className="flex items-center space-x-4 cursor-pointer"
                        onClick={() => {
                            router.push(`/profile/${idea?.owner?.username}`);
                        }}
                    >
                        {loading ? (
                            <Skeleton className="h-12 w-12 rounded-full" />
                        ) : (
                            <UserBanner src={idea?.owner?.profileImageUrl} />
                        )}
                        <div>
                            {loading ? (
                                <>
                                    <Skeleton className="h-5 w-32 mb-1" />
                                    <Skeleton className="h-4 w-24" />
                                </>
                            ) : (
                                <>
                                    <h2 className="text-lg font-semibold">
                                        {idea?.owner?.name}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {getTimeString(
                                            Date.now() - idea?.createdAt
                                        )}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <IdeaMenu idea={idea} />
                </section>

                <section className="mb-12">
                    {loading ? (
                        <>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                        </>
                    ) : (
                        <p className="text-lg leading-relaxed">
                            {idea?.description}
                        </p>
                    )}
                </section>

                <section>
                    <h3 className="text-2xl font-semibold mb-4">
                        Related Ideas
                    </h3>
                    <p className="text-muted-foreground">
                        Explore more ideas like this one.
                    </p>
                </section>
            </main>
        </div>
    );
}
