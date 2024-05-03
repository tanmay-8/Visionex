"use client";
import { Menu, X } from "lucide-react";
import { React, useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        console.log("clicked");
        document
            .getElementById("sidebar")
            .classList.toggle("-translate-x-full");
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="pb-8 md:hidden">
            {isMenuOpen ? (
                <X
                    size={35}
                    color="#419197"
                    className="cursor-pointer transition-all hover:scale-105 translate-x-28 -translate-y-4"
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
