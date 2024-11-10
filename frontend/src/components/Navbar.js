"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { React, useState } from "react";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        console.log("clicked");
        document
            .getElementById("sidebar")
            .classList.toggle("-translate-x-full");
        setIsMenuOpen(!isMenuOpen);
    };
    const user = useAppSelector((state) => state.user);

    if (!user.isLogged) {
        if (!pathname.includes("auth") && pathname !== "/") {
            router.push("/auth/login");
        }
        return null;
    }

    return (
        <div className="pb-8 md:hidden">
            {isMenuOpen ? (
                <X
                    size={35}
                    color="#419197"
                    className="cursor-pointer transition-all hover:scale-105 translate-x-[7rem] -translate-y-4"
                    onClick={() => {
                        toggleMenu();
                    }}
                />
            ) : (
                <Menu
                    size={35}
                    color="#419197"
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => {
                        toggleMenu();
                    }}
                />
            )}
        </div>
    );
};

export default Navbar;
