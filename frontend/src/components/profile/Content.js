import React from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import ProfileIdeas from "./ProfileIdeas";
import ProfileComments from "./ProfileComments";
import ProfileUpvotes from "./ProfileUpvotes";

const Content = ({user}) => {
    return (
        <div className="w-full h-full bg-light-bg-sec dark:bg-dark-bg-sec lg:p-2 rounded-lg">
            {user && <Tabs defaultValue="ideas" className="w-full h-full">
                <TabsList >
                    <TabsTrigger value="ideas" className="text-lg ">Ideas</TabsTrigger>
                    <TabsTrigger value="comments" className="text-lg">Comments</TabsTrigger>
                    <TabsTrigger value="upvotes" className="text-lg">Upvotes</TabsTrigger>
                </TabsList>
                <TabsContent value="ideas">
                    <ProfileIdeas ideas={user.ideas} />
                </TabsContent>
                <TabsContent value="comments">
                    <ProfileComments comments={user.comments}/>
                </TabsContent>
                <TabsContent value="upvotes">
                    <ProfileUpvotes upvotes={user.upvotes}/>
                </TabsContent>
            </Tabs>}
        </div>
    );
};

export default Content;
