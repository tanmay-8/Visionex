import React from "react";

const ProfileIdeas = ({ ideas }) => {
    if (!ideas) return <p>Loading...</p>;
    return (
        <div className="p-4">
            <div className="flex flex-col gap-4">
                {ideas.map((idea) => (
                    <div
                        key={idea.id}
                        className="w-full bg-light-bg-sec dark:bg-dark-bg-sec rounded-lg p-4"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            <div className="w-[150px] h-[150px] bg-gray-100 rounded-lg">
                                <img
                                    src={idea.images[0].url}
                                    alt="idea"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-semibold">
                                    {idea.title}
                                </h1>
                                <p className="text-gray-500">{idea.description}</p>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-main font-semibold">
                                            {idea.upvotes?.length}
                                        </span>
                                        <span className="text-gray-500">Upvotes</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-main font-semibold">
                                            {idea.comments?.length}
                                        </span>
                                        <span className="text-gray-500">Comments</span>
                                    </div>
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
