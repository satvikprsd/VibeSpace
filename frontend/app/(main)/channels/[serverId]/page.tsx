"use client";

import { useServerStore } from "@/store/useServerStore";
import { useParams, useRouter } from "next/navigation";

const ServerPage = () => {
    const {servers} = useServerStore();
    const {serverId} = useParams();
    const router = useRouter();
    const server = servers[serverId as string];
    if (server && serverId !== "%40me" && server._id === serverId) {
        router.push(`/channels/${server._id}/${server.defaultChannelId}`);
    }
    return <div></div>;
};

export default ServerPage;
