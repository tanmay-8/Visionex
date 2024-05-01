"use client";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { setTheme } from "@/lib/redux/features/themeSlice";
import Sidebar from "@/Components/Sidebar";

const Home = () => {
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();
    const toggleTheme = () => {
        if (theme.theme === "light") {
            dispatch(setTheme("dark"));
            localStorage.setItem("theme", "dark");
        } else {
            dispatch(setTheme("light"));
            localStorage.setItem("theme", "light");
        }
    };
    return (
        <div className={`w-full h-full ${theme.theme}`}>
            <div className="min-h-screen w-full bg-light-bg dark:bg-dark-bg flex space-x-6">
              <Sidebar />
                <div className="w-full">
                    <button onClick={toggleTheme}>Toggle Theme</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
