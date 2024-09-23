import { Heart, Share } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
const ProfileIdeas = ({ ideas }) => {
    const router = useRouter();
    if (!ideas) return <p>Loading...</p>;
    return (
        <div className="p-4 box-border overflow-y-auto overflow-x-hidden">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 h-full">
                {ideas.map((idea) => (
                    <div
                        key={idea.id}
                        className="bg-light-bg dark:bg-dark-bg shadow-sm h-fit rounded-md relative  p-2 cursor-pointer"
                        onClick={() => {
                            router.push(`/idea/${idea.id}`);
                        }}
                    >
                        <div className="">
                            <Image
                                src={idea.images[0].url}
                                alt={idea.title}
                                width={300}
                                height={300}
                                className="rounded-md object-cover transition-opacity duration-300"
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                            />
                        </div>

                        <div className="space-y-2 p-2">
                            <h2 className="text-lg font-semibold">
                                {idea.title}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {idea.description}
                            </p>

                            <div className="flex justify-between items-center">
                                <div className="flex space-x-4">
                                    <div className="flex items-center">
                                        <div className="flex items-center cursor-pointer">
                                            <Heart
                                                size={16}
                                                className="mr-2"
                                                color="rgb(107 114 128)"
                                            />
                                            {idea.upvotesCount}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Share size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileIdeas;
