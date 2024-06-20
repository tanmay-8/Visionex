import React, { useState } from "react";
import { PlusIcon, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setTags } from "@/lib/redux/features/addIdeaSlice";

const AddTags = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const curIdea = useAppSelector((state) => state.addIdea);
    const [tag, setTag] = useState("");
    const dispatch = useAppDispatch();
    const addTag = (e) => {
        e.preventDefault();
        if(tag === "") return;
        if(curIdea.tags.includes(tag)) return;
        const newTags = [...curIdea.tags, tag];
        dispatch(setTags(newTags));
    };
    return (
        <div
            className={`${
                theme === "light"
                    ? "bg-light-bg-sec text-dark-text"
                    : "bg-dark-bg-sec text-light-text"
            } p-4 rounded-lg`}
        >
            {curIdea.tags.length > 0 && (
                <div className="flex flex-wrap py-2">
                    {curIdea.tags.map((option, index) => {
                        return (
                            <div
                                key={index}
                                className={`p-2 m-1 rounded-lg border border-gray-300 cursor-pointer flex items-center justify-center space-x-2`}
                            >
                                <span>{option}</span>
                                <span
                                    onClick={() => {
                                        const newTags = curIdea.tags.filter(
                                            (tag) => tag !== option
                                        );
                                        dispatch(setTags(newTags));
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="py-2 relative">
                {" "}
                <input
                    className={`w-full p-4 ${
                        theme === "light"
                            ? "bg-light-bg-sec text-dark-text"
                            : "bg-dark-bg-sec text-light-text"
                    } rounded-lg outline-none text-lg border border-gray-400`}
                    placeholder="Tag"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addTag(e);
                        }
                    }}
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                <PlusIcon className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"  onClick={addTag}/>
            </div>
        </div>
    );
};

export default AddTags;
