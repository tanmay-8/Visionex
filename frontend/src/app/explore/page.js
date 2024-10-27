import React from "react";
import Search from "@/components/ideas/Search";
import Ideas from "@/components/ideas/Ideas";

const Explore = ({ searchParams }) => {
    const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
    const query = searchParams.query;
    return (
        <div className="w-full h-full space-y-10 ">
            <Search />
            <Ideas page={currentPage} query={query} />
        </div>
    );
};

export default Explore;
