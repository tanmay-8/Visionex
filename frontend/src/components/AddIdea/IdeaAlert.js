import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppSelector } from "@/lib/redux/hooks";

import React from "react";

const IdeaAlert = ({ open, handleOpen, message, type }) => {
    const theme = useAppSelector((state) => state.theme.theme);
    return (
        <AlertDialog open={open} onOpenChange={handleOpen} className={``}>
            <AlertDialogContent
                className={`
                ${
                    theme === "light"
                        ? "bg-light-bg text-dark-text"
                        : "bg-dark-bg text-light-text"
                } ${
                    type === "error"
                        ? "border-red-500"
                        : type === "success"
                        ? "border-green-600"
                        : ""
                } font-main`}
            >
                <AlertDialogHeader>
                    {type === "Loading" ? (
                        <>
                            <AlertDialogTitle>Loading</AlertDialogTitle>
                            <AlertDialogDescription
                                className={`text-base font-main text-center`}
                            >
                                <span className="w-full mx-auto flex justify-center items-center py-4">
                                    <div
                                        className="animate-spin inline-block size-12 border-[3px] border-current border-t-transparent rounded-full text-main"
                                        role="status"
                                        aria-label="loading"
                                    ></div>
                                </span>
                                <span className="w-full text-center">
                                    {message}
                                </span>
                            </AlertDialogDescription>
                        </>
                    ) : (
                        <>
                            <AlertDialogTitle>
                                {type === "error" ? "Error" : "Success"}
                            </AlertDialogTitle>
                            <AlertDialogDescription
                                className={`text-base font-main ${
                                    type === "error"
                                        ? "text-red-500"
                                        : type === "success"
                                        ? "text-green-600"
                                        : ""
                                } `}
                            >
                                {message}
                            </AlertDialogDescription>
                        </>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {type !== "Loading" && (
                        <AlertDialogAction onClick={handleOpen}>
                            Ok
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default IdeaAlert;
