"use client";
import { useParams } from "next/navigation";
import ChannelsList from "@/components/server/ChannelsList";
import useGetServer from "@/hooks/useGetServer";
import Me from "../Me";
import MembersList from "@/components/server/MembersList";

const ServerLayout = ({ children }: { children: React.ReactNode }) => {
    const { serverId } = useParams();

    useGetServer(serverId as string);
    if (serverId === "%40me") {
        return <Me />;
    }
    return (
        <div className="flex flex-1 border-l-2 border-t-2 border-border rounded-lg">
            <ChannelsList />
            <div className="flex-1 bg-background overflow-y-auto">
                {children}
            </div>
            <MembersList />
        </div>
    );
};

export default ServerLayout;
