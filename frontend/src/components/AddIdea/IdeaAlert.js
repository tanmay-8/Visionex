import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppSelector } from "@/lib/redux/hooks";

import React from "react";

const IdeaAlert = ({ open }) => {
    const theme = useAppSelector((state) => state.theme.theme);
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent
                className={`
                ${
                    theme === "light"
                        ? "bg-light-bg text-dark-text"
                        : "bg-dark-bg text-light-text"
                } `}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default IdeaAlert;
