import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
const UserBanner = ({ size }) => {
    const avatarSize = size;
    // console.log(avatarSize);
    return (
        <Avatar className={`w-12 h-12`}>
            <AvatarImage
                className={`w-12 h-12 ${
                    avatarSize ? `w-${avatarSize} h-${avatarSize}` : ``
                }`}
                src="https://github.com/shadcn.png"
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};

export default UserBanner;
