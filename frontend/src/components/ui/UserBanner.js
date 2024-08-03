import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
const UserBanner = ({ size, src }) => {
    const avatarSize = size;
    // console.log(avatarSize);
    return (
        <Avatar
            className={`w-12 h-12 ${
                avatarSize ? `w-${avatarSize} h-${avatarSize}` : ``
            }`}
        >
            <AvatarImage
                className={`w-12 h-12 ${
                    avatarSize ? `w-${avatarSize} h-${avatarSize}` : ``
                }`}
                src={src || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};

export default UserBanner;
