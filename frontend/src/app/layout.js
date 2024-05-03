import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Sidebar from "@/components/Sidebar";
import ThemeProvider from "@/components/HOC/ThemeProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <StoreProvider>
                <body className="">
                    <ThemeProvider>
                        <div className="flex w-full min-h-screen bg-light-bg dark:bg-dark-bg font-main text-gray-800 dark:text-gray-300">
                            <Sidebar />
                            <div className="md:ml-40 xl:ml-60 w-full lg:w-10/12 xl:w-9/12 p-6 sm:p-12 h-full">
                                <Navbar />
                                {children}
                            </div>
                        </div>
                    </ThemeProvider>
                </body>
            </StoreProvider>
        </html>
    );
}
