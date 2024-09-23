import Search from "@/components/ideas/Search";
import SearchedIdeas from "@/components/ideas/SearchedIdeas";
import React from "react";

const SearchResultsPage = ({
    searchParams
}) => {
    const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
    const searchQuery = searchParams.query ? searchParams.query : "";
    
    return (
        <div className="w-full h-full space-y-6">
            <Search query={searchQuery} />
            <SearchedIdeas query={searchQuery} page={currentPage} />
        </div>
    );
};

export default SearchResultsPage;
