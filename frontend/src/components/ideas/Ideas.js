"use client";
import React, { useEffect } from "react";
import Idea from "./Idea";
import { useQuery } from "@apollo/client";
import { GET_IDEAS } from "@/graphql/Queries";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setIdeas } from "@/lib/redux/features/ideasSlice";

const Ideas = () => {
    const ideas = useAppSelector((state) => state.ideas.ideas);
    const { data: getIdeasData, loading, error } = useQuery(GET_IDEAS);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (getIdeasData) {
            dispatch(setIdeas(getIdeasData.getIdeas));
            console.log(getIdeasData.getIdeas);
            console.log(ideas);
        }
    }, [getIdeasData]);
    return (
        <div className="lg:flex lg:space-x-8 space-y-8 lg:space-y-0 w-full lg:w-3/4 xl:w-2/3">
            <div className="space-y-8 w-full">
                {ideas.map((idea, index) => {
                    return <Idea key={index} idea={idea} />;
                })}
            </div>
        </div>
    );
};

export default Ideas;
