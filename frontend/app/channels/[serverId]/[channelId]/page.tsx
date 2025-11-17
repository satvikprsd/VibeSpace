"use client";
import { useParams } from "next/navigation";

const ChannelPage = () => {
    const { channelId } = useParams();
    return <div>Channel ID: {channelId}</div>;
};

export default ChannelPage;
