"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { setTheme } from "@/lib/redux/features/themeSlice";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/DatePicker";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@apollo/client";
import { GET_USER_BASIC_INFO } from "@/graphql/Queries";
import EditProfileImage from "@/components/Settings/EditProfileImage";
import {
    setUserBirthDate,
    setUserData,
    setUserEmail,
    setUserName,
    setUserUsername,
    updateProfileImage,
} from "@/lib/redux/features/userSlice";
import { Edit2Icon } from "lucide-react";
import { DELETE_PROFILE_IMAGE, UPDATE_PROFILE } from "@/graphql/Mutations";
import { useMutation } from "@apollo/client";
import { set } from "date-fns";
import IdeaAlert from "@/components/AddIdea/IdeaAlert";

const Settings = () => {
    const theme = useAppSelector((state) => state.theme);
    const [isEditabled, setIsEditabled] = useState(false);
    const dispatch = useAppDispatch();

    const [updateProfile, {}] = useMutation(UPDATE_PROFILE);
    const [deleteProfileImage, {}] = useMutation(DELETE_PROFILE_IMAGE);

    const [curData, setCurData] = useState({
        name: "",
        username: "",
        birthDate: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [open, setOpen] = useState(false);
    const toggleTheme = () => {
        if (theme.theme === "light") {
            dispatch(setTheme("dark"));
            if(typeof window !== "undefined"){
                localStorage.setItem("theme", "dark");;
            }
        } else {
            dispatch(setTheme("light"));
            if(typeof window !== "undefined"){
                localStorage.setItem("theme", "light");
            }
        }
    };
    const user = useAppSelector((state) => state.user);
    useEffect(() => {
        setCurData({
            email: user.email || "",
            name: user.name || "",
            username: user.username || "",
            birthDate: user.birthDate || "",
        });
        console.log(user);
    }, [user]);

    const isValidData = (data) => {
        if (data.name.length < 3 || data.username.length < 3) {
            setMessage("Name and username must be at least 3 characters");
            setOpen(true);
            setType("error");
            return false;
        }
        if (data.birthDate === "") {
            setMessage("Birth date is required");
            setOpen(true);
            setType("error");
            return false;
        }

        return true;
    };
    const saveProfile = async () => {
        setIsLoading(true);
        if (!isValidData(curData)) {
            return;
        }
        setOpen(true);
        setType("Loading");
        setMessage("Updating profile");
        await new Promise((r) => setTimeout(r, 1000));
        try {
            const res = await updateProfile({
                variables: {
                    input: {
                        name: curData.name,
                        username: curData.username,
                        birthDate: curData.birthDate,
                    },
                },
            });
            if (res.data.updateProfile.success) {
                setMessage("Profile updated");
                setType("success");
                dispatch(setUserName(res.data.updateProfile.data.name));
                dispatch(setUserUsername(res.data.updateProfile.data.username));
                dispatch(
                    setUserBirthDate(res.data.updateProfile.data.birthDate)
                );

                setCurData({
                    ...curData,
                    name: res.data.updateProfile.data.name,
                    username: res.data.updateProfile.data.username,
                    birthDate: res.data.updateProfile.data.birthDate,
                });
                setIsEditabled(false);
            } else {
                setMessage(res.data.updateProfile.error);
                setType("error");
            }
        } catch {
            setMessage("An error occured");
            setType("error");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteImage = async () => {
        try {
            setOpen(true);
            setMessage("Deleting profile image");
            setType("Loading");
            const res = await deleteProfileImage();
            if (res.data.deleteProfileImage.success) {
                setMessage("Profile image deleted");
                setType("success");
                dispatch(updateProfileImage(null));
            } else {
                setMessage(res.data.deleteProfileImage.error);
                setType("error");
            }
        } catch (e) {
            console.log(e);
            setMessage("An error occured");
            setType("error");
        }
    };
    return (
        <div className="space-y-12">
            <IdeaAlert
                message={message}
                type={type}
                open={open}
                handleOpen={() => setOpen(() => !open)}
            />
            {user && (
                <>
                    <div className="pb-4">
                        <h1 className="text-3xl font-bold">Settings</h1>
                    </div>
                    <div className="flex  text-base font-medium space-x-4 md:space-x-8">
                        <Avatar className={`w-24 h-24 border-gray-100`}>
                            <AvatarImage
                                className={`w-24 h-24`}
                                src={
                                    user && user.profileImageUrl
                                        ? user.profileImageUrl
                                        : ""
                                }
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <div className="text-gray-500 p-1">
                                Profile Picture
                            </div>
                            <div className="flex space-x-4 p-1">
                                {/* <button className="w-24 py-2 rounded-lg text-white bg-main">
                                    Edit
                                </button> */}
                                <EditProfileImage user={user} />
                                <button
                                    onClick={() => {
                                        deleteImage();
                                    }}
                                    className="w-24 py-2 rounded-lg border border-red-500 text-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`space-y-10 p-1 ${
                            !isEditabled ? "text-gray-500" : ""
                        }`}
                    >
                        <div className="text-gray-500 flex justify-between ">
                            <span>Basic Information</span>
                            {!isEditabled && (
                                <span
                                    onClick={() => setIsEditabled(!isEditabled)}
                                    className="cursor-pointer"
                                >
                                    <Edit2Icon className="w-5 h-5 text-gray-500" />
                                </span>
                            )}
                        </div>
                        <div
                            className={`space-y-10 xl:space-y-0 xl:flex xl:space-x-10`}
                        >
                            <div className="space-y-2 flex flex-col">
                                <Label className="dark:text-gray-300 text-gray-800">
                                    NAME
                                </Label>
                                <input
                                    className="min-w-72 lg:min-w-96 p-4 dark:bg-dark-bg-sec bg-light-bg-sec rounded-lg outline-none "
                                    placeholder="NAME"
                                    value={curData.name}
                                    readOnly={!isEditabled}
                                    onChange={(e) => {
                                        setCurData({
                                            ...curData,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <Label className="dark:text-gray-300 text-gray-800">
                                    USERNAME
                                </Label>
                                <input
                                    className="min-w-72 lg:min-w-96 p-4 dark:bg-dark-bg-sec bg-light-bg-sec rounded-lg outline-none "
                                    placeholder="USERNAME"
                                    value={curData.username}
                                    readOnly={!isEditabled}
                                    onChange={(e) => {
                                        setCurData({
                                            ...curData,
                                            username: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="space-y-10 xl:space-y-0 xl:flex xl:space-x-10">
                            <div className="space-y-2 flex flex-col">
                                <Label className="dark:text-gray-300 text-gray-800">
                                    EMAIL
                                </Label>
                                <input
                                    className="min-w-72 lg:min-w-96 p-4 dark:bg-dark-bg-sec bg-light-bg-sec rounded-lg outline-none "
                                    placeholder="EMAIL"
                                    value={curData.email}
                                    readOnly
                                />
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <Label className="dark:text-gray-300 text-gray-800">
                                    BIRTH-DATE
                                </Label>
                                <DatePicker
                                    setDate={(e) => {
                                        setCurData({
                                            ...curData,
                                            birthDate: e,
                                        });
                                        console.log(curData);
                                    }}
                                    date={curData.birthDate}
                                    isEditabled={isEditabled}
                                />
                            </div>
                        </div>
                        {isEditabled && (
                            <div className="flex justify-end ">
                                <button
                                    className="w-24 py-2 rounded-lg text-white bg-main"
                                    onClick={() => {
                                        saveProfile();
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>

                    <Separator className="h-[1px] bg-gray-500" />
                    <div className="space-y-10 p-1">
                        <div className="text-gray-500">Other</div>
                        <div className="space-y-10 xl:space-y-0 xl:flex xl:space-x-10">
                            <div className="flex items-center space-x-4">
                                <Switch
                                    id="airplane-mode"
                                    onClick={toggleTheme}
                                    className="bg-black"
                                />
                                <Label htmlFor="airplane-mode">Dark Mode</Label>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Settings;
