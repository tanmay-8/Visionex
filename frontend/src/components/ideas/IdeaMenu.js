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
    EllipsisVertical,
    EyeOff,
    Link2,
    Menu,
    ShieldAlert,
    Trash,
} from "lucide-react";
import GetIconColor from "@/lib/utils/GetIconColor";

const IdeaMenu = ({ isMine }) => {
    const [iconColor, setIconColor] = useState("#374151");

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
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                    <DropdownMenuItem>
                        <Bookmark
                            size={25}
                            className="mr-2"
                            color="rgb(107 114 128)"
                        />
                        <span className="text-lg">Save</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link2
                            size={25}
                            className="mr-2"
                            color="rgb(107 114 128)"
                        />
                        <span className="text-lg">Copy Link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <EyeOff
                            size={25}
                            className="mr-2"
                            color="rgb(107 114 128)"
                        />
                        <span className="text-lg">Hide</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ShieldAlert
                            size={25}
                            className="mr-2"
                            color="rgb(107 114 128)"
                        />
                        <span className="text-lg">Report</span>
                    </DropdownMenuItem>

                    {isMine && (
                        <DropdownMenuItem>
                            <Trash
                                size={25}
                                className="mr-2"
                                color="rgb(107 114 128)"
                            />
                            <span className="text-lg">Delete</span>
                        </DropdownMenuItem>
                    )}
                    {/* <DropdownMenuSeparator /> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default IdeaMenu;
