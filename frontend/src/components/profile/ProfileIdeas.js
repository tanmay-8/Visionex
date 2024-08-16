import Image from "next/image";
import React from "react";

const ProfileIdeas = ({ ideas }) => {
    if (!ideas) return <p>Loading...</p>;
    return (
        <div className="p-4">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-4">
                    {ideas.map((idea) => (
                        <div
                            key={idea._id}
                            className="bg-gray-100 dark:bg-gray-700 shadow-md rounded-lg aspect-[3/4] relative  space-y-2"
                        >
                            <div className="">
                                <Image
                                    src={idea.images[0].url}
                                    alt={idea.title}
                                    width={300}
                                    height={300}
                                    className="rounded-t-lg w-auto h-auto"
                                />
                            </div>

                            <div className="p-4">
                                <h2 className="text-lg font-semibold">
                                    {idea.title}
                                </h2>
                                <p className="text-sm text-gray-400">
                                    {idea.description}
                                </p>

                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-400">
                                        {idea.comments
                                            ? idea.comments.length
                                            : 0}{" "}
                                        comments
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {idea.upvotes ? idea.upvotes.length : 0}{" "}
                                        upvotes
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {ideas.map((idea) => (
                        <div
                            key={idea._id}
                            className="bg-gray-100 dark:bg-gray-700 shadow-md rounded-lg aspect-[3/4] relative  space-y-2"
                        >
                            <div className="">
                                <Image
                                    src={idea.images[0].url}
                                    alt={idea.title}
                                    width={300}
                                    height={300}
                                    className="rounded-t-lg w-auto h-auto"
                                />
                            </div>

                            <div className="p-4">
                                <h2 className="text-lg font-semibold">
                                    {idea.title}
                                </h2>
                                <p className="text-sm text-gray-400">
                                    {idea.description}
                                </p>

                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-400">
                                        {idea.comments
                                            ? idea.comments.length
                                            : 0}{" "}
                                        comments
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {idea.upvotes ? idea.upvotes.length : 0}{" "}
                                        upvotes
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {ideas.map((idea) => (
                        <div
                            key={idea._id}
                            className="bg-gray-100 dark:bg-gray-700 shadow-md rounded-lg aspect-[3/4] relative  space-y-2"
                        >
                            <div className="">
                                <Image
                                    src={idea.images[0].url}
                                    alt={idea.title}
                                    width={300}
                                    height={300}
                                    className="rounded-t-lg w-auto h-auto"
                                />
                            </div>

                            <div className="p-4">
                                <h2 className="text-lg font-semibold">
                                    {idea.title}
                                </h2>
                                <p className="text-sm text-gray-400">
                                    {idea.description}
                                </p>

                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-400">
                                        {idea.comments
                                            ? idea.comments.length
                                            : 0}{" "}
                                        comments
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {idea.upvotes ? idea.upvotes.length : 0}{" "}
                                        upvotes
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {ideas.map((idea) => (
                        <div
                            key={idea._id}
                            className="bg-gray-100 dark:bg-gray-700 shadow-md rounded-lg aspect-[3/4] relative  space-y-2"
                        >
                            <div className="">
                                <Image
                                    src={idea.images[0].url}
                                    alt={idea.title}
                                    width={300}
                                    height={300}
                                    className="rounded-t-lg w-auto h-auto"
                                />
                            </div>

                            <div className="p-4">
                                <h2 className="text-lg font-semibold">
                                    {idea.title}
                                </h2>
                                <p className="text-sm text-gray-400">
                                    {idea.description}
                                </p>

                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-400">
                                        {idea.comments
                                            ? idea.comments.length
                                            : 0}{" "}
                                        comments
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {idea.upvotes ? idea.upvotes.length : 0}{" "}
                                        upvotes
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileIdeas;
