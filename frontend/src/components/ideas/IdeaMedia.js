import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

const IdeaMedia = ({ images, videos }) => {
    return (
        <Carousel className="max-w-[80%]">
            <CarouselContent>
                {videos?.map((video, index) => {
                    return (
                        <CarouselItem key={index}>
                            <video
                                src={video.url}
                                controls
                                className="mx-auto rounded-md"
                            ></video>
                        </CarouselItem>
                    );
                })}
                {images?.map((image, index) => {
                    return (
                        <CarouselItem key={index}>
                            <Image
                                width={700}
                                height={700}
                                src={image.url}
                                alt={image.alt}
                                className="max-h-[600px] mx-auto rounded-md my-auto"
                            />
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default IdeaMedia;
