"use client";
import React, { useState, useEffect } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "../../ui/drawer";
import { MessageSquare, SendHorizonal, X } from "lucide-react";
import GetIconColor from "@/lib/utils/GetIconColor";
import { useAppSelector } from "@/lib/redux/hooks";
import Comment from "./Comment";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COMMENTS_IDEA } from "@/graphql/Queries";
import { CREATE_COMMENT } from "@/graphql/Mutations";

const Comments = ({ ideaId }) => {
    const theme = useAppSelector((state) => state.theme.theme);
    const [iconColor, setIconColor] = useState("");
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState(0);
    const { refetch: refetchComments } = useQuery(GET_COMMENTS_IDEA, {
        variables: {
            ideaId,
        },
        onCompleted: (data) => {
            if (data.getCommentsIdea.comments) {
                setComments(data.getCommentsIdea.comments);
            }
            if (data.getCommentsIdea.commentsCount) {
                setCommentsCount(data.getCommentsIdea.commentsCount);
            }
        },
    });
    const [createComment, { loading: commentLoading, error: commentError }] =
        useMutation(CREATE_COMMENT);
    useEffect(() => {
        setIconColor(GetIconColor());
    }, []);

    const handleCreateComment = async () => {
        try {
            if(commentText.length === 0){
                return;
            }
            await createComment({
                variables: {
                    commentInput: {
                        ideaId:ideaId,
                        text: commentText,
                    },
                },
            });
            const res = await refetchComments();
            setCommentsCount(res.data.getCommentsIdea.commentsCount);
            setComments(res.data.getCommentsIdea.comments);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Drawer
            className={`border-none ${
                theme === "dark" ? "bg-dark-bg-sec" : "bg-light-bg-sec  py-2"
            }`}
        >
            <DrawerTrigger asChild>
                <div className="flex items-center cursor-pointer">
                    <MessageSquare
                        size={25}
                        className="mr-2"
                        color="rgb(107 114 128)"
                    />
                    <p>{commentsCount}</p>
                </div>
            </DrawerTrigger>
            <DrawerContent
                className={`border-none ${
                    theme === "dark" ? "bg-dark-bg-sec" : "bg-light-bg-sec"
                } font-main -mt-4`}
            >
                {" "}
                <div
                    className={`h-[80vh] p-4 md:px-8 space-y-4 overflow-y-auto text-gray-800 flex justify-center${
                        theme === "dark" ? "text-gray-300" : ""
                    } custom-scrollbar`}
                >
                    <div className="lg:min-w-[500px] mx-auto space-y-6">
                        <div
                            className={`rounded-lg ${
                                theme === "dark"
                                    ? "bg-dark-bg text-light-text"
                                    : "bg-light-bg text-dark-text"
                            } flex space-x-4 items-center px-4 shadow-sm`}
                        >
                            <input
                                className={`w-full border-none p-4 outline-none bg-transparent text-lg placeholder:${
                                    theme === "dark"
                                        ? " text-light-text"
                                        : " text-dark-text"
                                }`}
                                placeholder={"Write a comment..."}
                                spellCheck={false}
                                autoComplete={"off"}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            ></input>
                            <div
                                className="flex cursor-pointer"
                                onClick={() => {
                                    handleCreateComment();
                                    setCommentText("");
                                }}
                            >
                                <SendHorizonal
                                    size={30}
                                    color={
                                        theme === "dark" ? "#d1d5db" : "#1f2937"
                                    }
                                />
                            </div>
                        </div>
                        {comments && comments.length > 0 && (
                            <div
                                className={`flex flex-col space-y-10 ${
                                    theme === "dark"
                                        ? " text-light-text"
                                        : " text-dark-text"
                                } p-2`}
                            >
                                {comments.map((comment, index) => {
                                    return (
                                        <Comment
                                            comment={comment}
                                            key={index}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default Comments;
