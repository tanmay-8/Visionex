"use client";
import React, { useEffect } from "react";
import Idea from "./Idea";
import { useQuery } from "@apollo/client";
import { GET_IDEAS } from "@/graphql/Queries";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setIdeas } from "@/lib/redux/features/ideasSlice";
import Pagination from "../ui/Pagination";
import { useRouter } from "next/navigation";

const Ideas = ({ page, query }) => {
    const ideas = useAppSelector((state) => state.ideas.ideas);
    const {
        data: getIdeasData,
        loading,
        error,
    } = useQuery(GET_IDEAS, {
        variables: {
            query: query,
            page: page ? parseInt(page) : 1,
            pageSize: 10,
        },
    });

    const router = useRouter();
    const handlePageChange = (page) => {
        if (!query || query === "") router.push(`/explore?page=${page}`);
        else router.push(`/explore?query=${query}&page=${page}`);
    };
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (getIdeasData) {
            dispatch(setIdeas(getIdeasData.getIdeas.ideas));
            console.log(getIdeasData.getIdeas.ideas);
            console.log(ideas);
        }
    }, [getIdeasData]);
    return (
        <div className="flex flex-col   space-y-8  w-full lg:w-3/4 xl:w-2/3">
            <div className="space-y-8 w-full">
                {loading ? (
                    <>
                        <div className="flex justify-center items-center p-8  w-full ">
                            <p className="text-gray-500 dark:text-gray-400">
                                Loading...
                            </p>
                        </div>
                    </>
                ) : ideas && ideas.length > 0 ? (
                    <>
                        {ideas.map((idea, index) => {
                            return <Idea key={index} idea={idea} />;
                        })}

                        <Pagination
                            totalPages={
                                getIdeasData?.getIdeas?.pagination
                                    ?.totalPages || 1
                            }
                            currentPage={page ? parseInt(page) : 1}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <>
                        <div className="flex justify-center items-center p-8  w-full ">
                            <p className="text-gray-500 dark:text-gray-400">
                                No ideas found for "{query}"
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Ideas;
