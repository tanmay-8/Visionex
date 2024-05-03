"use client";

import AddIdea from "@/components/Home/AddIdea";
import Post from "@/components/posts/Post";
import Posts from "@/components/posts/Posts";

const Home = () => {
    return (
        <div className="w-full h-full space-y-10 ">
            <AddIdea />
            <Posts />
        </div>
    );
};

export default Home;
