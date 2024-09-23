"use client";
import React from "react";
import Idea from "./Idea";
import { SEARCH_IDEAS } from "@/graphql/Queries";
import { useQuery } from "@apollo/client";
import Pagination from "../ui/Pagination";
import { useRouter } from "next/navigation";

const SearchedIdeas = ({ query, page }) => {
    const router = useRouter();
    const { data, loading, error } = useQuery(SEARCH_IDEAS, {
        variables: { query, page: parseInt(page), pageSize: 10 },
    });

    const handlePageChange = (page) => {
        router.push(`/explore/search?query=${query}&page=${page}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="w-full h-full space-y-6">
            {data.searchIdeas?.ideas?.length > 0 ? (
                <>
                    <div className="lg:flex lg:space-x-8 space-y-8 lg:space-y-0 w-full lg:w-3/4 xl:w-2/3">
                        <div className="space-y-8 w-full">
                            {data.searchIdeas.ideas.map((idea, index) => {
                                return <Idea key={index} idea={idea} />;
                            })}
                        </div>
                    </div>
                    <div className="flex justify-center items-center p-8 w-full lg:w-3/4 xl:w-2/3">
                        <Pagination
                            totalPages={
                                data.searchIdeas.pagination?.totalPages || 1
                            }
                            currentPage={page ? parseInt(page) : 1}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center p-8  w-full lg:w-3/4 xl:w-2/3">
                    <p className="text-gray-500 dark:text-gray-400">
                        No ideas found for "{query}"
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchedIdeas;
