"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ChevronRight, PlusIcon, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CategorySelect from "./CategorySelect";
import AddIdeaImages from "./AddIdeaImages";
import AddIdeaVideos from "./AddIdeaVideos";
import AddTags from "./AddTags";
import AddCollaborators from "./AddCollaborators";
import OtherLinks from "./OtherLinks";
import { setTitle, setDescription } from "@/lib/redux/features/addIdeaSlice";
import MyAlert from "../auth/MyAlert";
import IdeaAlert from "./IdeaAlert";

const AddIdeaDetails = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const curIdea = useAppSelector((state) => state.addIdea);
    const dispatch = useAppDispatch();
    const [error, setError] = useState("");
    const isValidIdea = (idea) => {
        if (idea.title.length < 5) {
            return {
                status: false,
                message: "Title should be atleast 5 characters long",
            };
        }
        if (idea.description.length < 20) {
            return {
                status: false,
                message: "Description should be atleast 20 characters long",
            };
        }

        if (idea.category.length === 0) {
            return {
                status: false,
                message: "Please select a category",
            };
        }

        return {
            status: true,
            message: "",
        };
    };

    const submitIdea = (e) => {
        e.preventDefault();
        const isvalid = isValidIdea(curIdea);
        if (!isvalid.status) {
            setError(isvalid.message);
            console.log(isvalid.message);
            return;
        }
        console.log(curIdea);
    };

    return (
        // <Sheet className="bg-light-bg-sec dark:bg-dark-bg-sec" open={true}>
        <Sheet
            className={`${
                theme === "light"
                    ? "bg-light-bg text-dark-text"
                    : "bg-dark-bg text-light-text"
            } pb-10`}
        >
            {error !=="" && <IdeaAlert open={true}/>}
            <SheetTrigger>
                <Button className="bg-main hover:scale-110 transition-all text-base  items-center text-white">
                    Share
                    <ChevronRight className="ml-1 h-5 w-5" color="white" />
                </Button>
            </SheetTrigger>
            <SheetContent
                className="w-[95vw] md:min-w-[80vw] lg:min-w-[60vw] overflow-y-auto
            border-none min-h-[100vh]"
            >
                <div
                    className={`${
                        theme === "light"
                            ? "bg-light-bg text-dark-text"
                            : "bg-dark-bg text-light-text"
                    }   w-full min-h-full font-main`}
                >
                    <div className="px-4 md:px-8 py-4">
                        <h1 className="text-xl md:text-3xl font-semibold">
                            Add Idea
                        </h1>
                        <p className="font-medium md:text-lg text-gray-500 mt-1">
                            Please enter you details.
                        </p>
                    </div>
                    <Separator />
                    <form
                        onSubmit={submitIdea}
                        className="w-full h-full  md:p-8 p-4 "
                    >
                        <div className="w-full h-full space-y-6">
                            <div className="w-full space-y-1">
                                <Label className="text-lg">Title</Label>
                                <input
                                    className={`w-full p-4 ${
                                        theme === "light"
                                            ? "bg-light-bg-sec text-dark-text"
                                            : "bg-dark-bg-sec text-light-text"
                                    } rounded-lg outline-none text-lg`}
                                    placeholder="Title"
                                    value={curIdea.title}
                                    onChange={(e) => {
                                        dispatch(setTitle(e.target.value));
                                    }}
                                />
                            </div>
                            <div className={`w-full space-y-1`}>
                                <Label className="text-lg">Description</Label>
                                <Textarea
                                    placeholder={"Description"}
                                    spellCheck={false}
                                    className={`rounded-lg border-none outline-none h-64 text-lg ${
                                        theme === "light"
                                            ? "bg-light-bg-sec text-dark-text"
                                            : "bg-dark-bg-sec text-light-text"
                                    }`}
                                    value={curIdea.description}
                                    onChange={(e) => {
                                        dispatch(
                                            setDescription(e.target.value)
                                        );
                                    }}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-lg">Images</Label>
                                <AddIdeaImages />
                            </div>
                            <div className="space-y-1 w-full">
                                <Label className="text-lg">Video</Label>
                                <AddIdeaVideos />
                            </div>
                            <div className="space-y-1 w-full">
                                <Label className="text-lg">Category</Label>
                                <div
                                    className={`${
                                        theme === "light"
                                            ? "bg-light-bg-sec text-dark-text"
                                            : "bg-dark-bg-sec text-light-text"
                                    } p-4 rounded-lg`}
                                >
                                    <CategorySelect />
                                </div>
                            </div>
                            <div className="space-y-1 w-full">
                                <Label className="text-lg">Tags</Label>
                                <AddTags />
                            </div>
                            <div className="space-y-1 w-full">
                                <Label className="text-lg">Collborators</Label>
                                <AddCollaborators />
                            </div>
                            <div className="w-full space-y-1">
                                <Label className="text-lg">Link</Label>
                                <input
                                    className={`w-full p-4 ${
                                        theme === "light"
                                            ? "bg-light-bg-sec text-dark-text"
                                            : "bg-dark-bg-sec text-light-text"
                                    } rounded-lg outline-none text-lg`}
                                    placeholder="Link"
                                />
                            </div>
                            <div className="w-full space-y-1">
                                <Label className="text-lg">Other Links</Label>
                                <OtherLinks />
                            </div>
                            <div className="flex p-2 space-x-6">
                                <button
                                    className={`${
                                        theme === "light" ? "" : ""
                                    } bg-main hover:scale-110 transition-all text-lg  items-center text-white py-3 w-40 rounded-lg shadow-sm`}
                                    type="submit"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default AddIdeaDetails;
