"use client";
import React, { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Bookmark,
    Delete,
    DeleteIcon,
    Edit2Icon,
    EditIcon,
    EllipsisVertical,
    EyeOff,
    Link2,
    Menu,
    ShieldAlert,
    Trash,
} from "lucide-react";
import GetIconColor from "@/lib/utils/GetIconColor";
import { useMutation } from "@apollo/client";
import { SAVE_IDEA } from "@/graphql/Mutations";
import { toast } from "sonner";
import { set } from "lodash";

const IdeaMenu = ({ isMine, ideaId, isSaved,setIsSaved }) => {
    const [iconColor, setIconColor] = useState("#374151");
    const [saveIdea, { loading: saveIdeaLoading, error: saveIdeaError }] =
        useMutation(SAVE_IDEA, {
            variables: {
                ideaId,
            },
        });

    const handleSaveIdea = async () => {
        try {
            const res = await saveIdea();
            if(res.data.saveIdea.success){
                toast.success("Done");
                setIsSaved(!isSaved);
            }else{
                toast.error("Error");
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        console.log(isMine);
        setIconColor(GetIconColor());
    }, [iconColor]);
    return (
        <div>
            <DropdownMenu className="text-lg">
                <DropdownMenuTrigger>
                    <EllipsisVertical size={25} color={iconColor} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-2">
                    {!isMine && (
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                                handleSaveIdea();
                            }}
                        >
                            {!isSaved ? (
                                <>
                                    <Bookmark
                                        size={25}
                                        className="mr-2"
                                        color="rgb(107 114 128)"
                                    />
                                    <span className="text-lg">Save</span>
                                </>
                            ) : (
                                <>
                                    <Bookmark
                                        size={25}
                                        fill="#419197"
                                        className="mr-2 "
                                        color="#419197"
                                    />
                                    <span className="text-lg">Unsave</span>
                                </>
                            )}
                        </DropdownMenuItem>
                    )}

                    {isMine && (
                        <DropdownMenuItem className="cursor-pointer">
                            <Trash
                                size={25}
                                className="mr-2"
                                color="rgb(107 114 128)"
                            />
                            <span className="text-lg">Delete</span>
                        </DropdownMenuItem>
                    )}
                    {isMine && (
                        <DropdownMenuItem className="cursor-pointer">
                            <Edit2Icon
                                size={25}
                                className="mr-2"
                                color="rgb(107 114 128)"
                            />
                            <span className="text-lg">Edit</span>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default IdeaMenu;
