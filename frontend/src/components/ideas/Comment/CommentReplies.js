import {
    AccordionTrigger,
    AccordionContent,
    AccordionItem,
    Accordion,
} from "@radix-ui/react-accordion";
import { MessageSquare, SendHorizonal } from "lucide-react";
import Reply from "./Reply";
import { useAppSelector } from "@/lib/redux/hooks";
import { useState } from "react";
import { GET_REPLIES_COMMENT } from "@/graphql/Queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT } from "@/graphql/Mutations";

const CommentReplies = ({ iconcolor, commentId, ideaID }) => {
    const theme = useAppSelector((state) => state.theme.theme);
    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState([]);

    const [getReplies, { data, loading, error }] = useLazyQuery(
        GET_REPLIES_COMMENT,
        {
            onCompleted: (data) => {
                if (data.getRepliesComment) {
                    setReplies(data.getRepliesComment.replies);
                }
            },
        }
    );

    const [createReply, {}] = useMutation(CREATE_COMMENT);
    const handleCreateReply = async () => {
        try {
            if (replyText.length === 0) {
                return;
            }
            const res = await createReply({
                variables: {
                    commentInput: {
                        commentId,
                        ideaId: ideaID,
                        text: replyText,
                    },
                },
            });
            if (res.data.createComment.error) {
                console.log(res.data.createComment.error);
                return;
            }
            await getReplies({
                variables: {
                    commentId,
                },
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Accordion type="single" collapsible className="w-full pl-8">
            <AccordionItem value="item-1">
                <AccordionTrigger
                    onClick={(e) => {
                        getReplies({
                            variables: {
                                commentId,
                            },
                        });
                    }}
                    className="flex items-center space-x-2 cursor-pointer"
                >
                    <MessageSquare
                        size={20}
                        iconcolor={iconcolor}
                        className=""
                    />
                    <p>{replies && replies.length > 0 ? replies.length : ""}</p>
                </AccordionTrigger>
                <AccordionContent className="p-2 py-4 w-[105%] -ml-6">
                    <div
                        className={`rounded-lg ${
                            theme === "dark"
                                ? "bg-dark-bg text-light-text"
                                : "bg-light-bg text-dark-text"
                        } flex space-x-4 items-center px-4 shadow-sm w-full mb-2`}
                    >
                        <input
                            className={`w-full border-none p-2 outline-none bg-transparent text-sm placeholder:${
                                theme === "dark"
                                    ? " text-light-text"
                                    : " text-dark-text"
                            }`}
                            placeholder={"Reply..."}
                            spellCheck={false}
                            autoComplete={"off"}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        ></input>
                        <div
                            className="flex cursor-pointer"
                            onClick={() => {
                                handleCreateReply();
                                setReplyText("");
                            }}
                        >
                            <SendHorizonal
                                size={24}
                                color={theme === "dark" ? "#d1d5db" : "#1f2937"}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-10 py-4 px-2">
                        {replies &&
                            replies.length > 0 &&
                            replies.map((reply) => (
                                <Reply key={reply.id} reply={reply} />
                            ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default CommentReplies;
