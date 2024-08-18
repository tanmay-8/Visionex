"use client";
import { React, useState } from "react";
import { Heart } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_UPVOTES_IDEA } from "@/graphql/Queries";
import { UPVOTE_IDEA } from "@/graphql/Mutations";
import { set } from "date-fns";

const Upvotes = ({ ideaId }) => {
    const [upvotesCount, setUpvotesCount] = useState(0);
    const [upvoted, setUpvoted] = useState(false);

    const { refetch: refetchUpvotes } = useQuery(GET_UPVOTES_IDEA, {
        variables: {
            ideaId,
        },
        onCompleted: (data) => {
            setUpvotesCount(data.getUpvotesIdea.upvotesCount);
            setUpvoted(data.getUpvotesIdea.isUpvoted);
        },
    });

    const [upvoteIdea, { loading: upvoteLoading, error: upvoteError }] =
        useMutation(UPVOTE_IDEA);

    const handleUpvote = async () => {
        try {
            await upvoteIdea({
                variables: {
                    upvoteInput: {
                        ideaId,
                    },
                },
            });

            const res = await refetchUpvotes();
            setUpvotesCount(res.data.getUpvotesIdea.upvotesCount);
            setUpvoted(res.data.getUpvotesIdea.isUpvoted);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div
            className="flex items-center cursor-pointer"
            onClick={() => {
                handleUpvote();
            }}
        >
            {!upvoted ? (
                <Heart size={25} className="mr-2" color="rgb(107 114 128)" />
            ) : (
                <Heart
                    size={25}
                    fill="#419197"
                    className="mr-2"
                    color="#419197"
                />
            )}
            <p>{upvotesCount}</p>
        </div>
    );
};

export default Upvotes;
