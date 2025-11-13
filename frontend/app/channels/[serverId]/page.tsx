"use client";
import { useParams } from "next/navigation";
import Me from "../Me";

const ServerPage = () => {
    const { serverId } = useParams();
    console.log(serverId, serverId === "%40me");
    if (serverId === "%40me") {
        return (<Me />);
    }
        
    return (
        <div>
            {serverId} Channel Page
        </div>
    )
}

export default ServerPage
