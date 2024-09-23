import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
const Loading = () => {
    return (
        <div className="space-y-8 w-full h-full">
            <Card className="w-full bg-light-bg-sec dark:bg-dark-bg-sec rounded-lg relative">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-2 lg:gap-6 items-center lg:flex-row lg:items-start w-full pb-2">
                        <Skeleton className="w-[140px] h-[140px] rounded-full" />
                        <div className="flex-1 w-full py-4 text-center lg:text-left">
                            <Skeleton className="h-8 w-48 mb-2 mx-auto lg:mx-0" />
                            <Skeleton className="h-6 w-32 mb-4 mx-auto lg:mx-0" />

                            <div className="w-full justify-center lg:justify-start space-x-3 py-3 flex">
                                <Skeleton className="h-10 w-28" />
                                <Skeleton className="h-10 w-28" />
                            </div>

                            <div className="flex justify-center lg:justify-start space-x-4 py-2">
                                <div>
                                    <Skeleton className="h-6 w-16 mb-1" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                                <div>
                                    <Skeleton className="h-6 w-16 mb-1" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                                <div>
                                    <Skeleton className="h-6 w-16 mb-1" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardContent>
            </Card>
        </div>
    );
};

export default Loading;
