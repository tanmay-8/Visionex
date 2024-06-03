import React,{useState} from "react";
import { X } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

const AddTags = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const [tags, setTags] = useState(["Technology"]);
    const addTag = (tag) => {
        if (tags.includes(tag)) {
            return;
        }
        if (tag.length === 0) {
            return;
        }
        const newTags = [...tags, tag];
        setTags(newTags);
    };


    return (
        <div
            className={`${
                theme === "light"
                    ? "bg-light-bg-sec text-dark-text"
                    : "bg-dark-bg-sec text-light-text"
            } p-4 rounded-lg`}
        >
            <div className="flex flex-wrap py-2">
                {tags.map((option, index) => {
                    return (
                        <div
                            key={index}
                            className={`p-2 m-1 rounded-lg border border-gray-300 cursor-pointer flex items-center justify-center space-x-2`}
                        >
                            <span>{option}</span>
                            <span
                                onClick={() => {
                                    const newTags = tags.filter(
                                        (tag) => tag !== option
                                    );
                                    setTags(newTags);
                                }}
                            >
                                <X className="h-4 w-4" />
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
                } rounded-lg outline-none text-lg`}
                placeholder="Tag"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addTag(e.target.value);
                        e.target.value = "";
                    }
                }}
            />
        </div>
    );
};

export default AddTags;
