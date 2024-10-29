import React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { PlusIcon, X, UploadIcon,Check } from "lucide-react";
import { setVideos } from "@/lib/redux/features/addIdeaSlice";

const AddIdeaVideos = () => {
    const theme = useAppSelector((state) => state.theme.theme);
    const curIdea = useAppSelector((state) => state.addIdea);
    const dispatch = useAppDispatch();

    const handleSelectVideo = (e) => {
        const newVideos = Array.from(e.target.files).map((file) => {
            file["isUploading"] = false;
            file["isUploaded"] = false;
            return file;
        });
        dispatch(setVideos(newVideos));
    };
    const uploadVideo = async (video) => {
        try{
            const curVideo = curIdea.videos[0];
            curVideo.isUploading = true;
            dispatch(setVideos([curVideo]));
            const data = new FormData();
            data.append("video", video);
            data.append("folder", "PostVideos");

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/video/uploadVideo`, {
                method: "POST",
                body: data,
                authToken: localStorage.getItem("visionToken"),
            })

            const resData = await res.json();
            if(resData.success){
                curVideo.isUploading = false;
                curVideo.isUploaded = true;
                curVideo.key = resData.fileName;
                dispatch(setVideos([curVideo]));
            }else{
                curVideo.isUploading = false;
                dispatch(setVideos([curVideo]));
                throw new Error("An error occurred");
            }
        }catch(err){
            alert("An error occurred. Please try again.");
            console.log(err);
        }
    }
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
                            className="relative w-full p-2 flex items-center h-[72] justify-center"
                            key={index}
                        >
                            <video
                                className="w-full max-h-[500px] rounded-lg"
                                controls={true}
                                autoPlay={true}
                                loop={true}
                            >
                                <source src={URL.createObjectURL(video)} />
                            </video>{" "}
                            <span
                                className="cursor-pointer absolute top-[1px] right-[2px] p-1 rounded-full text-gray-100 bg-gray-700"
                                onClick={() => {
                                    const newVideos = curIdea.videos.filter(
                                        (vid, i) => i !== index
                                    );
                                    dispatch(setVideos(newVideos));
                                }}
                            >
                                <X className="h-5 w-5" />
                            </span>{" "}
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 cursor-pointer">
                                {video.isUploaded ? (
                                    <Check
                                        width={28}
                                        height={28}
                                        className="text-green-500"
                                    />
                                ) : video.isUploading ? (
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
                                        width={32}
                                        height={32}
                                        color="white"
                                        onClick={() => {
                                            uploadVideo(video);
                                        }}
                                    />
                                )}
                            </span>
                        </div>
                    );
                })}
            </div>
            {curIdea.videos.length === 0 && (
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
            )}
        </div>
    );
};

export default AddIdeaVideos;
