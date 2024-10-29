"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronRight, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CategorySelect from "./CategorySelect";
import AddIdeaImages from "./AddIdeaImages";
import AddIdeaVideos from "./AddIdeaVideos";
import AddTags from "./AddTags";
import AddCollaborators from "./AddCollaborators";
import OtherLinks from "./OtherLinks";
import {
    setTitle,
    setDescription,
    setVisit,
    clearIdea,
} from "@/lib/redux/features/addIdeaSlice";
import { isValidIdea } from "@/lib/utils/validators";
import { useMutation } from "@apollo/client";
import { CREATE_IDEA } from "@/graphql/Mutations";

const StatusBar = ({ status, message, onClear }) => {
    const getStatusColor = () => {
        switch (status) {
            case "loading":
                return "bg-blue-500";
            case "success":
                return "bg-green-500";
            case "error":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case "loading":
                return <Loader2 className="h-5 w-5 animate-spin" />;
            case "success":
                return <CheckCircle className="h-5 w-5" />;
            case "error":
                return <AlertCircle className="h-5 w-5" />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`${getStatusColor()} text-white p-3 flex items-center justify-between transition-all duration-300 ease-in-out sticky top-0 z-10`}
        >
            <div className="flex items-center space-x-2">
                {getStatusIcon()}
                <span>{message}</span>
            </div>
            {status !== "idle" && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClear}
                    className="text-white hover:text-gray-800"
                >
                    Clear
                </Button>
            )}
        </div>
    );
};

const AddIdeaDetails = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const curIdea = useAppSelector((state) => state.addIdea);
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [createIdea] = useMutation(CREATE_IDEA);
    const formRef = useRef(null);

    const clearStatus = () => {
        setStatus("idle");
        setMessage("");
    };

    useEffect(() => {
        if (status !== "idle") {
            formRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [status]);

    const submitIdea = async (e) => {
        e.preventDefault();
        const isvalid = isValidIdea(curIdea);
        if (!isvalid.status) {
            setStatus("error");
            setMessage(isvalid.message);
            return;
        }
        setStatus("loading");
        setMessage("Sharing your vision with the world...");
        try {
            const res = await createIdea({
                variables: {
                    title: curIdea.title,
                    description: curIdea.description,
                    visit: curIdea.visit,
                    collaborators: curIdea.collaborators,
                    category: curIdea.category,
                    tags: curIdea.tags,
                    email: curIdea.email,
                    phone: curIdea.phone,
                    linkedin: curIdea.linkedin,
                    twitter: curIdea.twitter,
                    instagram: curIdea.instagram,
                    images: curIdea.images.map((image) => image.key),
                    videos: curIdea.videos.map((video) => video.key),
                },
            });
            if (res.data.createIdea.success) {
                setStatus("success");
                setMessage("Idea Added Successfully");
                dispatch(clearIdea());
            } else {
                setStatus("error");
                setMessage(res.data.createIdea.error);
            }
        } catch (err) {
            setStatus("error");
            setMessage(err.message);
            console.error(err);
        }
    };

    return (
        <Sheet
            className={`${
                theme === "light"
                    ? "bg-light-bg text-dark-text"
                    : "bg-dark-bg text-light-text"
            } pb-10`}
        >
            <SheetTrigger asChild>
                <Button className="bg-main hover:scale-110 transition-all text-base items-center text-white">
                    Share
                    <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent
                className="w-[95vw] md:min-w-[80vw] lg:min-w-[60vw] overflow-y-auto
      border-none min-h-[100vh]"
            >
                <div
                    ref={formRef}
                    className={`${
                        theme === "light"
                            ? "bg-light-bg text-dark-text"
                            : "bg-dark-bg text-light-text"
                    } w-full min-h-full font-main`}
                >
                    {status !== "idle" && (
                        <StatusBar
                            status={status}
                            message={message}
                            onClear={clearStatus}
                        />
                    )}
                    <div className="px-4 md:px-8 py-4">
                        <h1 className="text-xl md:text-3xl font-semibold">
                            Add Idea
                        </h1>
                        <p className="font-medium md:text-lg text-gray-500 mt-1">
                            Please enter your details.
                        </p>
                    </div>
                    <Separator />
                    <form
                        onSubmit={submitIdea}
                        className="w-full h-full md:p-8 p-4"
                    >
                        <div className="w-full h-full space-y-6">
                            <div className="w-full space-y-1">
                                <Label htmlFor="title" className="text-lg">
                                    Title
                                </Label>
                                <input
                                    id="title"
                                    className={`w-full p-4 ${
                                        theme === "light"
                                            ? "bg-light-bg-sec text-dark-text"
                                            : "bg-dark-bg-sec text-light-text"
                                    } rounded-lg outline-none text-lg`}
                                    placeholder="Title"
                                    value={curIdea.title}
                                    onChange={(e) =>
                                        dispatch(setTitle(e.target.value))
                                    }
                                />
                            </div>
                            <div className={`w-full space-y-1`}>
                                <Label
                                    htmlFor="description"
                                    className="text-lg"
                                >
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Description"
                                    spellCheck={false}
                                    className={`rounded-lg border-none outline-none h-64 text-lg ${
                                        theme === "light"
                                            ? "bg-light-bg-sec text-dark-text"
                                            : "bg-dark-bg-sec text-light-text"
                                    }`}
                                    value={curIdea.description}
                                    onChange={(e) =>
                                        dispatch(setDescription(e.target.value))
                                    }
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
                                <Label className="text-lg">Collaborators</Label>
                                <AddCollaborators />
                            </div>
                            <div className="w-full space-y-1">
                                <Label htmlFor="link" className="text-lg">
                                    Link
                                </Label>
                                <input
                                    id="link"
                                    className={`w-full p-4 ${
                                        theme === "light"
                                            ? "bg-light-bg-sec text-dark-text"
                                            : "bg-dark-bg-sec text-light-text"
                                    } rounded-lg outline-none text-lg`}
                                    placeholder="Link"
                                    onChange={(e) =>
                                        dispatch(setVisit(e.target.value))
                                    }
                                />
                            </div>
                            <div className="w-full space-y-1">
                                <Label className="text-lg">Other Links</Label>
                                <OtherLinks />
                            </div>
                            <div className="flex p-2 space-x-6">
                                <Button
                                    type="submit"
                                    className="bg-main hover:scale-110 transition-all text-lg items-center text-white py-3 w-40 rounded-lg shadow-sm"
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default AddIdeaDetails;
