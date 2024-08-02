import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Edit2Icon, PlusIcon, PlusSquareIcon } from "lucide-react";
import { UPDATE_PROFILE_IMAGE } from "@/graphql/Mutations";
import { useMutation } from "@apollo/client";
import { updateProfileImage } from "@/lib/redux/features/userSlice";
import Image from "next/image";

const EditProfileImage = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const user = useAppSelector((state) => state.user);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const [updateProfileImageReq, { data: updateProfileImageData }] =
        useMutation(UPDATE_PROFILE_IMAGE);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const fileList = [...e.dataTransfer.files];
        setImage(fileList[0]);
    };
    const uploadImage = async (image) => {
        const data = new FormData();
        data.append("photo", image);
        data.append("folder", "ProfileImages");
        const res = await fetch("http://localhost:5000/api/image/uploadImage", {
            method: "POST",
            body: data,
            authToken: localStorage.getItem("visionToken"),
        });
        const resData = await res.json();
        if (resData.success) {
            return resData;
        } else {
            throw new Error("An error occurred");
        }
    };

    const saveImage = async () => {
        setIsLoading(true);
        try {
            const resData = await uploadImage(image);
            console.log(resData);
            const res = await updateProfileImageReq({
                variables: {
                    profileImageUrl: resData.fileName,
                },
            });

            if (res.data.updateProfileImage.success) {
                const url = res.data.updateProfileImage.url;
                console.log(url);
                dispatch(
                    updateProfileImage({
                        profileImageUrl: url,
                    })
                );
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };  
    return (
        <Dialog className="border-none font-main ">
            <DialogTrigger>
                <button className="w-24 py-2 rounded-lg text-white bg-main">
                    Edit
                </button>
            </DialogTrigger>
            <DialogContent
                className={`max-w-[300px] min-h-[300px]  ${
                    theme === "dark"
                        ? "bg-dark-bg-sec text-light-text"
                        : "bg-light-bg-sec text-dark-text"
                } rounded-xl border-none border border-gray-50`}
            >
                {!isLoading ? (
                    <div
                        className="font-main relative space-y-4 flex flex-col items-center justify-center"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <div
                            className="relative rounded-full cursor-pointer mx-auto w-[200px] h-[200px]"
                            onClick={() => {
                                document.getElementById("fileInput").click();
                            }}
                        >
                            <Image
                                src={
                                    image
                                        ? URL.createObjectURL(image)
                                        : user && user.profileImageUrl
                                        ? user.profileImageUrl
                                        : "https://via.placeholder.com/200x200/ffffff/?text="
                                }
                                alt="profile"
                                className="rounded-full w-[200px] h-[200px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                width={200}
                                height={200}
                            ></Image>
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="bg-black bg-opacity-50 rounded-full w-[200px] h-[200px] flex items-center justify-center">
                                    <div className=" text-2xl">
                                        <Edit2Icon className="w-8 h-8 text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                            multiple
                        />
                        <button
                            className="w-1/2 py-2 rounded-lg text-white bg-main mx-auto"
                            onClick={() => {
                                saveImage();
                            }}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="font-main relative space-y-4 flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full w-24 h-24 border-t-2 border-b-2 border-main"></div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileImage;
