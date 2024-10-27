"use client";
import { FilterIcon, SearchIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import GetIconColor from "@/lib/utils/GetIconColor";
import { useRouter } from "next/navigation";

const Search = ({ query }) => {
    const [iconColor, setIconColor] = useState("#374151");
    const [search, setSearch] = useState(query || "");
    const router = useRouter();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        setIconColor(GetIconColor());
    }, [iconColor]);

    return (
        <div
            id="contSearch"
            className="search bg-light-bg-sec dark:bg-dark-bg-sec w-full h-20 rounded-lg shadow-sm flex space-x-4 items-center px-6 lg:w-3/4 xl:w-2/3"
        >
            <input
                type="text"
                placeholder="Search ideas..."
                className="w-full h-full bg-transparent text-gray-800 dark:text-gray-200 text-lg p-2 outline-none placeholder:text-gray-700 placeholder:dark:text-gray-400"
                autoComplete={"off"}
                spellCheck={false}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (search === "") {
                            router.push(`/explore`);
                        } else {
                            router.push(`/explore?query=${search}`);
                        }
                    }
                }}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
                value={search}
            ></input>

            <SearchIcon
                size={25}
                color={iconColor}
                className="cursor-pointer"
                onClick={() => {
                    if (search === "") {
                        router.push(`/explore`);
                    } else {
                        router.push(`/explore?query=${search}`);
                    }
                }}
            />
        </div>
    );
};

export default Search;
