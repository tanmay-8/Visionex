import { Heart, Share } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfileIdeas = ({ ideas }) => {
    if (!ideas) return <p>Loading...</p>;
    return (
        <div className="p-4 box-border overflow-y-auto overflow-x-hidden">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 h-full">
                {ideas.map((idea) => (
                    <div
                        key={idea._id}
                        className="bg-light-bg dark:bg-dark-bg shadow-sm h-fit rounded-md relative  p-2"
                    >
                        <div className="">
                            <Image
                                src={idea.images[0].url}
                                alt={idea.title}
                                width={300}
                                height={300}
                                className="rounded-md w-auto h-auto"
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
