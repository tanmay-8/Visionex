"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_IDEA } from "@/graphql/Queries";
import { useAppSelector } from "@/lib/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Heart,
    MessageCircle,
    Share2,
    ChevronLeft,
    CircleCheckBigIcon,
    Mail,
    Instagram,
    Twitter,
    Linkedin,
    Link,
} from "lucide-react";
import IdeaMenu from "./IdeaMenu";
import IdeaMedia from "./IdeaMedia";
import UserBanner from "../ui/UserBanner";
import { getTimeString } from "@/lib/utils/otherUtils";
import { useRouter } from "next/navigation";
import Comments from "./Comment/Comments";
import Upvotes from "./Upvotes";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

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

                <section className="mb-12">
                    {loading ? (
                        <Skeleton className="h-32 w-full" />
                    ) : (
                        <>
                            {idea?.category && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Category
                                    </h3>
                                    <Badge variant="secondary">
                                        {idea.category}
                                    </Badge>
                                </div>
                            )}
                            {idea?.tags && idea.tags.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2 text-dark-bg dark:text-light-bg">
                                        {idea.tags.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="outline"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {idea?.collaborators &&
                                idea.collaborators.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Collaborators
                                        </h3>
                                        <ul className="list-disc list-inside">
                                            {idea.collaborators.map(
                                                (collaborator, index) => (
                                                    <li key={index}>
                                                        {collaborator}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            {idea?.visit && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Visit
                                    </h3>
                                    <a
                                        href={idea.visit}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline flex items-center"
                                    >
                                        <Link className="mr-2" />
                                        {idea.visit}
                                    </a>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {idea?.email && (
                                    <a
                                        href={`mailto:${idea.email}`}
                                        className="flex items-center text-muted-foreground hover:text-foreground"
                                    >
                                        <Mail className="mr-2 h-4 w-4" />
                                        {idea.email}
                                    </a>
                                )}
                                {idea?.instagram && (
                                    <a
                                        href={`https://instagram.com/${idea.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-muted-foreground hover:text-foreground"
                                    >
                                        <Instagram className="mr-2 h-4 w-4" />
                                        {idea.instagram}
                                    </a>
                                )}
                                {idea?.twitter && (
                                    <a
                                        href={`https://twitter.com/${idea.twitter}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-muted-foreground hover:text-foreground"
                                    >
                                        <Twitter className="mr-2 h-4 w-4" />
                                        {idea.twitter}
                                    </a>
                                )}
                                {idea?.linkedin && (
                                    <a
                                        href={idea.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-muted-foreground hover:text-foreground"
                                    >
                                        <Linkedin className="mr-2 h-4 w-4" />
                                        LinkedIn
                                    </a>
                                )}
                            </div>
                        </>
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
