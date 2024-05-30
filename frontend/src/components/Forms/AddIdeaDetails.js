"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "../ui/button";
import { ChevronRight, PlusIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { setImages, setVideos } from "@/lib/redux/features/addIdeaSlice";

const AddIdeaDetails = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const curIdea = useAppSelector((state) => state.addIdea);
    const dispatch = useAppDispatch();

    const handleSelectFiles = (e) => {
        const images = [...curIdea.images, ...e.target.files];
        if (images.length > 4) {
            alert("You can only upload 4 images");
            images.splice(4, images.length - 4);
        }
        dispatch(setImages(images));
        console.log(images);
    };

    const handleSelectVideo = (e) => {
        const videos = [...e.target.files];
        dispatch(setVideos(videos));
        console.log(videos);
    };

    return (
        // <Sheet open={true}>
        <Sheet>
            <SheetTrigger>
                <Button className="bg-main hover:scale-110 transition-all text-base  items-center text-white">
                    Share
                    <ChevronRight className="ml-1 h-5 w-5" color="white" />
                </Button>
            </SheetTrigger>
            <SheetContent
                className="min-w-[95vw] md:min-w-[80vw] lg:min-w-[60vw] overflow-y-auto
            border-none"
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
                    <form className="w-full h-full  md:p-8 p-4 ">
                        <div className="w-full h-full space-y-6">
                            <div className="w-full space-y-1">
                                <Label className="text-lg">Title</Label>
                                <input
                                    className="w-full p-4 dark:bg-dark-bg-sec bg-light-bg-sec rounded-lg outline-none text-lg"
                                    placeholder="Title"
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
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-lg">Images</Label>
                                <div
                                    className={`md:flex w-full ${
                                        theme === "light"
                                            ? "bg-light-bg-sec text-dark-text"
                                            : "bg-dark-bg-sec text-light-text"
                                    } rounded-lg p-4`}
                                >
                                    <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                                        {curIdea.images.map((image, index) => {
                                            return (
                                                <div className="w-[150px] h-[150px] p-2 flex items-center justify-center">
                                                    <Image
                                                        key={index}
                                                        src={URL.createObjectURL(
                                                            image
                                                        )}
                                                        width={150}
                                                        height={150}
                                                        alt="Image"
                                                        className="w-full h-full rounded-lg border"
                                                    ></Image>
                                                </div>
                                            );
                                        })}
                                        <div className="w-[150px] h-[150px] p-2 flex items-center justify-center">
                                            <div
                                                className="w-full h-full border-dashed border-main border-2 rounded-lg flex items-center justify-center cursor-pointer box-border"
                                                onClick={() => {
                                                    document
                                                        .getElementById(
                                                            "fileInput"
                                                        )
                                                        .click();
                                                }}
                                            >
                                                <PlusIcon
                                                    width={32}
                                                    height={32}
                                                    color="#419197"
                                                />
                                                <input
                                                    id="fileInput"
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleSelectFiles}
                                                    max={4}
                                                    multiple
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1 w-full">
                                <Label className="text-lg">Video</Label>
                                <div
                                    className={` w-full ${
                                        theme === "light"
                                            ? "bg-light-bg-sec text-dark-text"
                                            : "bg-dark-bg-sec text-light-text"
                                    } rounded-lg p-2`}
                                >
                                    <div className="grid">
                                        {curIdea.videos.map((video, index) => {
                                            return (
                                                <div
                                                    className="w-full p-2 flex items-center h-[72] justify-center"
                                                    key={index}
                                                >
                                                    <video
                                                        className="w-full h-full rounded-lg"
                                                        controls={true}
                                                    >
                                                        <source
                                                            src={URL.createObjectURL(
                                                                video
                                                            )}
                                                        />
                                                    </video>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="p-4 w-full">
                                        <div
                                            className="w-full p-4 border-dashed border-main border-2 rounded-lg flex items-center justify-center cursor-pointer box-border"
                                            onClick={() => {
                                                document
                                                    .getElementById(
                                                        "fileInput2"
                                                    )
                                                    .click();
                                            }}
                                        >
                                            <PlusIcon
                                                width={32}
                                                height={32}
                                                color="#419197"
                                            />
                                            <input
                                                id="fileInput2"
                                                type="file"
                                                className="hidden"
                                                accept="video/*"
                                                onChange={handleSelectVideo}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default AddIdeaDetails;
