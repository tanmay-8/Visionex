"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { CameraIcon } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

const PhotoUpload = ({ iconColor }) => {
    const theme = useAppSelector((state) => state.theme.theme);
    const [files, setFiles] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        const fileList = [...e.dataTransfer.files];
        setFiles(fileList);
    };

    const handleSelectFiles = (e) => {
        const fileList = [...e.target.files];
        setFiles(fileList);
    };
    return (
        <Dialog className="border-none font-main ">
            <DialogTrigger>
                <div className="p-2 bg-gray-300/20 rounded-2xl cursor-pointer hover:bg-gray-300/50 transition-all">
                    <CameraIcon size={25} color={iconColor} />
                </div>
            </DialogTrigger>
            <DialogContent
                className={`min-h-60 w-[350px] ${
                    theme === "dark"
                        ? "bg-dark-bg-sec text-light-text"
                        : "bg-light-bg-sec text-dark-text"
                } rounded-xl border-none border border-gray-50`}
            >
                <div
                    className="flex justify-center items-center font-main"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <div className="border-4 border-dashed border-gray-400 p-8 rounded-xl ">
                        <label
                            htmlFor="fileInput"
                            className="block text-center text-lg font-bold mb-4 cursor-pointer"
                        >
                            Drag & Drop Image Here or Click to Select Image
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleSelectFiles}
                            multiple
                        />
                        {files.length > 0 && (
                            <div className="max-w-[320px] text-center">
                                <ul>
                                    {files.map((file, index) => (
                                        <li key={index} className="">
                                            {file.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PhotoUpload;
