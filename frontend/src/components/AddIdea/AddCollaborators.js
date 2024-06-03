import { useAppSelector } from "@/lib/redux/hooks";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import UserBanner from "../ui/UserBanner";

const AddCollaborators = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const [collborators, setCollaborators] = useState([
        "Collaborator 1",
        "Collaborator 2",
        "Collaborator 3",
    ]);
    return (
        <div
            className={`${
                theme === "light"
                    ? "bg-light-bg-sec text-dark-text"
                    : "bg-dark-bg-sec text-light-text"
            } p-4 rounded-lg`}
        >
            <div className="flex flex-wrap py-4 gap-4">
                {collborators.map((collaborator, index) => {
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
                                    const newCollaborators =
                                        collborators.filter(
                                            (coll) => coll !== collaborator
                                        );
                                    setCollaborators(newCollaborators);
                                }}
                            >
                                <X className="h-3 w-3" />
                            </span>
                        </div>
                    );
                })}
            </div>
            <input
                className={`w-full p-4 ${
                    theme === "light"
                        ? "bg-light-bg-sec text-dark-text"
                        : "bg-dark-bg-sec text-light-text"
                } rounded-lg outline-none text-lg border border-gray-400`}
                placeholder="Collaborator"
            />
        </div>
    );
};

export default AddCollaborators;
