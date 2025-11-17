"use client";
import { useParams } from "next/navigation";
import ChannelsList from "@/components/server/ChannelsList";
import useGetServer from "@/hooks/useGetServer";
import Me from "../Me";

const ServerLayout = ({ children }: { children: React.ReactNode }) => {
    const { serverId } = useParams();

    useGetServer(serverId as string);
    if (serverId === "%40me") {
        return <Me />;
    }
    return (
        <div className="flex flex-1">
            <ChannelsList />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default ServerLayout;
