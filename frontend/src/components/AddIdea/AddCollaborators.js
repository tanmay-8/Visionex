import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { PlusIcon, X } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import UserBanner from "../ui/UserBanner";
import { setCollaborators } from "@/lib/redux/features/addIdeaSlice";

const AddCollaborators = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const curIdea = useAppSelector((state) => state.addIdea);
    const dispatch = useAppDispatch();
    const [collaborator, setCollaborator] = useState("");
    const removeCollaborator = (collaborator) => {
        const newCollaborators = curIdea.collaborators.filter(
            (coll) => coll !== collaborator
        );
        dispatch(setCollaborators(newCollaborators));
    };

    const addCollaborator = (e) => {
        e.preventDefault();
        if (collaborator) {
            const newCollaborators = [...curIdea.collaborators, collaborator];
            dispatch(setCollaborators(newCollaborators));
            setCollaborator("");
        }
    };
    return (
        <div
            className={`${
                theme === "light"
                    ? "bg-light-bg-sec text-dark-text"
                    : "bg-dark-bg-sec text-light-text"
            } p-4 rounded-lg`}
        >
            {curIdea.collaborators.length > 0 && (
                <div className="flex flex-wrap py-2 gap-4">
                    {curIdea.collaborators.map((collaborator, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex flex-col gap-1 items-center p-2 rounded-lg border border-gray-400 relative`}
                            >
                                <UserBanner size={16} />
                                <span className="text-xs">{collaborator}</span>
                                <span
                                    className="cursor-pointer absolute -top-[6px] -right-[6px] p-1 rounded-full text-gray-100 bg-gray-400"
                                    onClick={() => {
                                        removeCollaborator(collaborator);
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="relative py-2">
                {" "}
                <input
                    className={`w-full p-4 ${
                        theme === "light"
                            ? "bg-light-bg-sec text-dark-text"
                            : "bg-dark-bg-sec text-light-text"
                    } rounded-lg outline-none text-lg border border-gray-400`}
                    placeholder="Collaborator"
                    onChange={(e) => setCollaborator(e.target.value)}
                    value={collaborator}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addCollaborator(e);
                        }
                    }}
                />
                <span>
                    <PlusIcon
                        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                        onClick={addCollaborator}
                    />
                </span>
            </div>
        </div>
    );
};

export default AddCollaborators;
