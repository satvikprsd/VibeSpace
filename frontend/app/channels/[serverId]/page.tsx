"use client";
import { useParams } from "next/navigation";
import Me from "../Me";
import ChannelsList from "@/components/server/ChannelsList";

const ServerPage = () => {
    const { serverId } = useParams();
    console.log(serverId, serverId === "%40me");
    if (serverId === "%40me") {
        return (<Me />);
    }
        
    return (
        <div className="flex flex-1 border-l-2 border-t-2 border-border rounded-lg">
            <ChannelsList />
            <div className="flex-1 bg-background p-4 overflow-y-auto">
                Server ID: {serverId}
            </div>
        </div>
    )
}

export default ServerPage
