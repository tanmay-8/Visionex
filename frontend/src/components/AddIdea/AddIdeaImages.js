import React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import Image from "next/image";
import { Check, CircleCheck, PlusIcon } from "lucide-react";
import { setImages } from "@/lib/redux/features/addIdeaSlice";
import { X, UploadIcon } from "lucide-react";

const AddIdeaImages = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const curIdea = useAppSelector((state) => state.addIdea);
    const dispatch = useAppDispatch();
    const handleSelectFiles = (e) => {
        const newImages = Array.from(e.target.files).map((file) => {
            file["isUploading"] = false;
            file["isUploaded"] = false;
            return file;
        });
        const images = [...curIdea.images, ...newImages];
        if (images.length > 4) {
            alert("You can only upload 4 images");
            images.splice(4, images.length - 4);
        }
        dispatch(setImages(images));
        console.log(images);
    };

    const uploadImage = async (image) => {
        try {
            const index = curIdea.images.indexOf(image);
            let newImages = [...curIdea.images];
            newImages[index].isUploading = true;
            dispatch(setImages(newImages));
            newImages = [...curIdea.images];
            const data = new FormData();
            data.append("photo", image);
            data.append("folder", "PostImages");
            const res = await fetch(
                "http://localhost:5000/api/image/uploadImage",
                {
                    method: "POST",
                    body: data,
                    authToken: localStorage.getItem("visionToken"),
                }
            );
            const resData = await res.json();
            if (resData.success) {
                console.log(resData);
                newImages[index].isUploading = false;
                newImages[index].isUploaded = true;
                newImages[index].key = resData.fileName;
                dispatch(setImages(newImages));
            } else {
                newImages[index].isUploading = false;
                dispatch(setImages(newImages));
                throw new Error("An error occurred");
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div
            className={`md:flex w-full ${
                theme === "light"
                    ? "bg-light-bg-sec text-dark-text"
                    : "bg-dark-bg-sec text-light-text"
            } rounded-lg p-4`}
        >
            <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
                {curIdea.images.map((image, index) => {
                    return (
                        <div
                            key={index}
                            className="relative w-[150px] h-[150px] p-2 flex items-center justify-center"
                        >
                            <Image
                                key={index}
                                src={URL.createObjectURL(image)}
                                width={150}
                                height={150}
                                alt="Image"
                                className="w-full h-full rounded-lg border"
                            ></Image>
                            <span
                                className="cursor-pointer absolute top-[1px] right-[2px] p-1 rounded-full text-gray-100 bg-gray-700"
                                onClick={() => {
                                    const newImages = curIdea.images.filter(
                                        (img) => img !== image
                                    );
                                    dispatch(setImages(newImages));
                                }}
                            >
                                <X className="h-3 w-3" />
                            </span>
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 cursor-pointer">
                                {image.isUploaded ? (
                                    <Check
                                        width={28}
                                        height={28}
                                        className="text-green-500"
                                    />
                                ) : image.isUploading ? (
                                    <svg
                                        aria-hidden="true"
                                        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                ) : (
                                    <UploadIcon
                                        width={26}
                                        height={26}
                                        color="white"
                                        onClick={() => {
                                            uploadImage(image);
                                        }}
                                    />
                                )}
                            </span>
                        </div>
                    );
                })}
                {curIdea.images.length < 4 && (
                    <div className="w-[150px] h-[150px] p-2 flex items-center justify-center">
                        <div
                            className="w-full h-full border-dashed border-main border-2 rounded-lg flex items-center justify-center cursor-pointer box-border"
                            onClick={() => {
                                document.getElementById("fileInput").click();
                            }}
                        >
                            <PlusIcon width={32} height={32} color="#419197" />
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
                )}
            </div>
        </div>
    );
};

export default AddIdeaImages;
