import React from "react";
import Search from "@/components/Home/Search";
import Ideas from "@/components/ideas/Ideas";

const Explore = () => {
    return (
        <div className="w-full h-full space-y-10 ">
            <Search />
            <Ideas />
        </div>
    );
};

export default Explore;
