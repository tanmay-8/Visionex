"use client";

import AddIdea from "@/components/AddIdea/AddIdea";
import Idea from "@/components/ideas/Idea";
import Ideas from "@/components/ideas/Ideas";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect ,useState} from "react";
import { login } from "@/lib/redux/features/userSlice";

const Home = () => {
    const [token, setToken] = useState(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(()=>{
        let curToken = localStorage.getItem("visionToken");
        setToken(curToken);
        if(curToken){
            dispatch(login(token));
        }else{
            router.push("/auth/login");
        }
    },[token])
    return (
        <div className="w-full h-full space-y-10 ">
            <AddIdea />
            <Ideas />
        </div>
    );
};

export default Home;
