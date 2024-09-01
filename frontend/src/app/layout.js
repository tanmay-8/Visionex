import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "../components/HOC/StoreProvider";
import Sidebar from "@/components/Sidebar";
import ThemeProvider from "@/components/HOC/ThemeProvider";
import Navbar from "@/components/Navbar";
import ApolloAppProvider from "@/components/HOC/ApolloAppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Visionex",
    description: "Visionex is a platform for sharing ideas and thoughts.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <StoreProvider>
                <ApolloAppProvider>
                    <body className="">
                        <ThemeProvider>
                            <div className="flex w-full min-h-screen bg-light-bg dark:bg-dark-bg font-main text-gray-800 dark:text-gray-300">
                                <Sidebar />
                                <div className="md:ml-40 lg:ml-[20%] w-full md:w-9/12 lg:w-8/12 xl:w-2/3  p-6 sm:p-12 h-full">
                                    <Navbar />
                                    {children}
                                </div>
                            </div>
                        </ThemeProvider>
                    </body>
                </ApolloAppProvider>
            </StoreProvider>
        </html>
    );
}
