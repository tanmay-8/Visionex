import React from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import ProfileIdeas from "./ProfileIdeas";
import ProfileComments from "./ProfileComments";
import ProfileUpvotes from "./ProfileUpvotes";

const Content = ({user}) => {
    return (
        <div className="w-full min-h-40 bg-light-bg-sec lg:p-2 rounded-lg">
            {user && <Tabs defaultValue="ideas" className="w-full p-0">
                <TabsList >
                    <TabsTrigger value="ideas" className="text-lg ">Ideas</TabsTrigger>
                    <TabsTrigger value="comments" className="text-lg">Comments</TabsTrigger>
                    <TabsTrigger value="upvotes" className="text-lg">Upvotes</TabsTrigger>
                </TabsList>
                <TabsContent value="ideas">
                    <ProfileIdeas ideas={user.ideas} />
                </TabsContent>
                <TabsContent value="comments">
                    <ProfileComments />
                </TabsContent>
                <TabsContent value="upvotes">
                    <ProfileUpvotes />
                </TabsContent>
            </Tabs>}
        </div>
    );
};

export default Content;
