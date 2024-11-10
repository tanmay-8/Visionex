"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    BrainCircuit,
    Lightbulb,
    Share2,
    Users,
    ChevronRight,
    ThumbsUp,
    MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();
    const toLogin = () => {
        router.push("/auth/login");
    };
    const scrollToSection = (id) => {
        document
            .getElementById(id)
            .scrollIntoView({ behavior: "smooth" }, { block: "start" });
    };
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 absolute top-0 left-0 w-full">
            <header className="border-b dark:border-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-[#419197] dark:text-[#62B0A6]"
                    >
                        Visionex
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <button
                            onClick={() => {
                                scrollToSection("features");
                            }}
                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#419197] dark:hover:text-[#62B0A6] transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => {
                                scrollToSection("how-it-works");
                            }}
                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#419197] dark:hover:text-[#62B0A6] transition-colors"
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => {
                                scrollToSection("idea-showcase");
                            }}
                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#419197] dark:hover:text-[#62B0A6] transition-colors"
                        >
                            Idea Showcase
                        </button>
                    </nav>
                    <Button
                        variant="outline"
                        className="hidden dark:bg-main md:inline-flex text-gray-700 dark:text-gray-300 hover:text-[#419197]  dark:border-0"
                        onClick={toLogin}
                    >
                        Sign In
                    </Button>
                </div>
            </header>

            <main className="flex-grow">
                <section className="container mx-auto px-4 py-24 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Where Visionary Ideas{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#419197] to-[#2C5D63]">
                            Come to Life
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        Discover, share, and collaborate on groundbreaking
                        concepts that shape the future.
                    </p>
                    <Button
                        className="bg-[#419197] dark:bg-[#62B0A6] hover:bg-[#419197]/90 dark:hover:bg-[#62B0A6]/90 text-white text-lg px-8 py-6"
                        onClick={toLogin}
                    >
                        Get Started
                    </Button>
                </section>

                <section id="features" className="py-24">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
                            Why Choose Visionex?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: (
                                        <Lightbulb className="h-8 w-8 text-[#419197] dark:text-[#62B0A6]" />
                                    ),
                                    title: "Innovative Platform",
                                    description:
                                        "Access a world of cutting-edge ideas and visionary concepts.",
                                },
                                {
                                    icon: (
                                        <Share2 className="h-8 w-8 text-[#419197] dark:text-[#62B0A6]" />
                                    ),
                                    title: "Easy Sharing",
                                    description:
                                        "Share your ideas effortlessly and get instant feedback from the community.",
                                },
                                {
                                    icon: (
                                        <Users className="h-8 w-8 text-[#419197] dark:text-[#62B0A6]" />
                                    ),
                                    title: "Collaborative Environment",
                                    description:
                                        "Connect with like-minded individuals and turn ideas into reality.",
                                },
                            ].map((feature, index) => (
                                <Card
                                    key={index}
                                    className="text-center p-6 hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                >
                                    <CardContent className="pt-6">
                                        <div className="mb-4 flex justify-center">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    id="how-it-works"
                    className="py-24 bg-[#419197]  text-white"
                >
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            How Visionex Works
                        </h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                {
                                    title: "Share Your Idea",
                                    description:
                                        "Post your innovative concept on Visionex",
                                },
                                {
                                    title: "Get Feedback",
                                    description:
                                        "Receive insights from the community",
                                },
                                {
                                    title: "Collaborate",
                                    description:
                                        "Connect with potential partners and contributors",
                                },
                                {
                                    title: "Bring It to Life",
                                    description:
                                        "Turn your vision into reality with support",
                                },
                            ].map((step, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-white  text-[#419197] dark:text-[#62B0A6] flex items-center justify-center text-2xl font-bold mb-4">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-white  dark:text-gray-200">
                                        {step.title}
                                    </h3>
                                    <p className="text-white  ">
                                        {step.description}
                                    </p>
                                    {index < 3 && (
                                        <ChevronRight className="h-8 w-8 mt-4 hidden md:block text-white " />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="idea-showcase" className="py-24">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
                            Idea Showcase
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "AI-Powered Urban Farming",
                                    description:
                                        "Vertical farms managed by AI to maximize crop yield and minimize resource usage in urban environments.",
                                    author: "EcoTech Innovations",
                                    likes: 342,
                                    comments: 56,
                                },
                                {
                                    title: "Quantum Internet Security",
                                    description:
                                        "A new encryption method using quantum entanglement to create unhackable communication networks.",
                                    author: "Quantum Shields Inc.",
                                    likes: 289,
                                    comments: 41,
                                },
                                {
                                    title: "Bionic Limbs with Sensory Feedback",
                                    description:
                                        "Advanced prosthetics that provide real-time sensory information to the user's nervous system.",
                                    author: "NeuroLink Prosthetics",
                                    likes: 415,
                                    comments: 72,
                                },
                                {
                                    title: "Ocean Plastic to Sustainable Fuel",
                                    description:
                                        "A revolutionary process to convert ocean plastic waste into clean, sustainable fuel for vehicles.",
                                    author: "OceanFuel Technologies",
                                    likes: 376,
                                    comments: 63,
                                },
                                {
                                    title: "Mind-Controlled Smart Home",
                                    description:
                                        "An AI system that interprets brainwaves to control smart home devices without physical interaction.",
                                    author: "NeuroHome Solutions",
                                    likes: 301,
                                    comments: 48,
                                },
                                {
                                    title: "Space Debris Cleanup Satellites",
                                    description:
                                        "Autonomous satellites designed to capture and safely dispose of space debris in Earth's orbit.",
                                    author: "Orbital Janitors Ltd.",
                                    likes: 328,
                                    comments: 59,
                                },
                            ].map((idea, index) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                >
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                            {idea.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            {idea.description}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                            <span>{idea.author}</span>
                                            <div className="flex items-center space-x-4">
                                                <span className="flex items-center">
                                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                                    {idea.likes}
                                                </span>
                                                <span className="flex items-center">
                                                    <MessageSquare className="h-4 w-4 mr-1" />
                                                    {idea.comments}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <section className="py-24 bg-gradient-to-r from-[#419197] to-[#2C5D63] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Ready to Bring Your Vision to Life?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join Visionex today and be part of a community that's
                        shaping the future.
                    </p>

                    <Button
                        type="submit"
                        variant="secondary"
                        className="bg-white text-[#419197] hover:bg-gray-100"
                        onClick={toLogin}
                    >
                        Get Started
                    </Button>
                </div>
            </section>
            <footer className=" dark:text-gray-400 py-6">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm">
                        © 2024 Visionex. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
