import React from "react";
import { useAppSelector,useAppDispatch } from "@/lib/redux/hooks";
import { PlusIcon } from "lucide-react";
import { setVideos } from "@/lib/redux/features/addIdeaSlice";

const AddIdeaVideos = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const curIdea = useAppSelector((state) => state.addIdea);
    const dispatch = useAppDispatch();
        

    const handleSelectVideo = (e) => {
        const videos = [...e.target.files];
        dispatch(setVideos(videos));
        console.log(videos);
    };
    return (
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
                                <source src={URL.createObjectURL(video)} />
                            </video>
                        </div>
                    );
                })}
            </div>
            <div className="p-4 w-full">
                <div
                    className="w-full p-4 border-dashed border-main border-2 rounded-lg flex items-center justify-center cursor-pointer box-border"
                    onClick={() => {
                        document.getElementById("fileInput2").click();
                    }}
                >
                    <PlusIcon width={32} height={32} color="#419197" />
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
    );
};

export default AddIdeaVideos;
