import IdeaDetails from "@/components/ideas/IdeaDetails";
import { useAppSelector } from "@/lib/redux/hooks";
import React from "react";

const IdeaPage = ({ params }) => {
    const ideaId = params.iid;

    
    return (
        <div>
            <IdeaDetails ideaId={ideaId} />
        </div>
    );
};

export default IdeaPage;
