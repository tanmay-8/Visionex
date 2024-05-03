import React from "react";
import Search from "@/components/Home/Search";
import Posts from "@/components/posts/Posts";

const Explore = () => {
    return (
        <div className="w-full h-full space-y-10 ">
            <Search />
            <Posts />
        </div>
    );
};

export default Explore;
