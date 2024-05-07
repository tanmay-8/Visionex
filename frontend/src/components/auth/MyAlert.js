import React from "react";
import { Alert,AlertTitle,AlertDescription } from "../ui/alert";
import { LoaderIcon } from "lucide-react";

const MyAlert = ({
    title,
    description,
    type,
}) => {


    return (
        <Alert>
            {
                (type==="Loading")?(
                    <LoaderIcon size="24" />
                ):(<> </>)

            }
            <AlertTitle>{
                title
                }</AlertTitle>
            <AlertDescription>
                {
                    description
                
                }
            </AlertDescription>
        </Alert>
    );
};

export default MyAlert;
