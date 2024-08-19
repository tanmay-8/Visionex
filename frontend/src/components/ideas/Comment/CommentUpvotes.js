import React, { useState } from "react";
import { Heart } from "lucide-react";
import GetIconColor from "@/lib/utils/GetIconColor";
import { GET_UPVOTES_COMMENT } from "@/graphql/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { UPVOTE_COMMENT } from "@/graphql/Mutations";
const CommentUpvotes = ({ commentId }) => {
    const [iconColor, setIconColor] = useState(GetIconColor());
    const [upvotes, setUpvotes] = useState(0);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const { refetch: getCommentUpvotes } = useQuery(GET_UPVOTES_COMMENT, {
        variables: {
            commentId,
        },
        onCompleted: (data) => {
            if (data.getUpvotesComment) {
                setUpvotes(data.getUpvotesComment.upvotesCount);
                setIsUpvoted(data.getUpvotesComment.isUpvoted);
            }
        },
    });

    const [upvoteComment, {}] = useMutation(UPVOTE_COMMENT);

    const handleUpvote = async () => {
        try {
            await upvoteComment({
                variables: {
                    commentUpvoteInput: {
                        commentId,
                    },
                },
            });
            const data = await getCommentUpvotes();
            setUpvotes(data.data.getUpvotesComment.upvotesCount);
            setIsUpvoted(data.data.getUpvotesComment.isUpvoted);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div
            className="flex space-x-2 cursor-pointer items-center absolute top-0 left-10"
            onClick={handleUpvote}
        >
            {!isUpvoted ? (
                <Heart size={20} color="rgb(107 114 128)" />
            ) : (
                <Heart
                    size={20}
                    fill="#419197"
                    color="#419197"
                />
            )}
            <p>{upvotes}</p>
        </div>
    );
};

export default CommentUpvotes;
