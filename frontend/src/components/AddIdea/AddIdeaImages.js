import React from "react";
import { useAppSelector,useAppDispatch } from "@/lib/redux/hooks";
import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { setImages } from "@/lib/redux/features/addIdeaSlice";

const AddIdeaImages = () => {
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

    return (
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
                                src={URL.createObjectURL(image)}
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
            </div>
        </div>
    );
};

export default AddIdeaImages;
