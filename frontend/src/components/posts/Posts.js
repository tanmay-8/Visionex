import React from "react";
import Post from "./Post";

const Posts = () => {
    const posts = [
        {
            title: "Post 1",
            content: "This is the content of post 1",
        },
        {
            title: "Post 2",
            content: "This is the content of post 2",
        },
        {
            title: "Post 3",
            content: "This is the content of post 3",
        },
    ];
    return (
        <div className="lg:flex lg:space-x-8 space-y-8 lg:space-y-0 w-full">
            <div className="space-y-8 w-full lg:w-1/2">
                {posts.map((post, index) => {
                    return <Post key={index} />;
                })}
            </div>
            <div className="space-y-8 w-full lg:w-1/2">
                {posts.map((post, index) => {
                    return <Post key={index} />;
                })}
            </div>
        </div>
    );
};

export default Posts;
