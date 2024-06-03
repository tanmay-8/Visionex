import React from "react";
import Idea from "./Idea";

const Ideas = () => {
    const posts = [
        {
            title: "Idea 1",
            content: "This is the content of post 1",
        },
        {
            title: "Idea 2",
            content: "This is the content of post 2",
        },
        {
            title: "Idea 3",
            content: "This is the content of post 3",
        },
    ];
    return (
        <div className="lg:flex lg:space-x-8 space-y-8 lg:space-y-0 w-full">
            <div className="space-y-8 w-full lg:w-1/2">
                {posts.map((post, index) => {
                    return <Idea key={index} />;
                })}
            </div>
            <div className="space-y-8 w-full lg:w-1/2">
                {posts.map((post, index) => {
                    return <Idea key={index} />;
                })}
            </div>
        </div>
    );
};

export default Ideas;
