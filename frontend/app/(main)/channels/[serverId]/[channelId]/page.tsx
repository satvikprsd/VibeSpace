"use client";
import UserRow from "@/components/common/UserRow";
import MembersList from "@/components/server/MembersList";
import { ServerChatArea } from "@/components/server/ServerChatArea";
import { Input } from "@/components/ui/input";
import useGetServerMessages from "@/hooks/useGetServerMessages";
import { sendMessage } from "@/services/textChannelService";
import { useServerStore } from "@/store/useServerStore";
import { useTextChannelStore } from "@/store/useTextChannelStore";
import { useUIStore } from "@/store/useUIStore";
import { useUserStore } from "@/store/useUserStore";
import { Hash, SendHorizonal, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ChannelPage = () => {
    const { channelId, serverId } = useParams();
    const { servers } = useServerStore();
    useGetServerMessages(channelId as string);
    const server = servers[serverId as string];
    const channel = server?.textChannels.find((ch) => ch._id === channelId);
    const [showMembers, setShowMembers] = useState(true);
    const [msg, setMsg] = useState("");
    const {addMessage, updateMessage} = useTextChannelStore();
    const {user} = useUserStore();
    const {setTopBarText} = useUIStore();
    useEffect(() => {
        if (server?._id === "%40me") {
            setTopBarText("Friends");
        } else if (server) {
            setTopBarText(server.name || "Server");
        }
    }, [server, setTopBarText]);

    const handleSendMessage = async () => {
        const mockMessageId = "temp-id-" + Date.now();
        const mockMessage = {
            _id: mockMessageId,
            message: msg,
            sender: user!,
            origin: 'textChannel' as const,
            channel: channelId as string,
            createdAt: new Date(),
        };
        addMessage(channelId as string, mockMessage);
        setMsg("");
        const response = await sendMessage(channelId as string, { content: msg });
        if (response?.data.success) {
            const newMessage = {...response?.data.messageData, sender: user, origin: 'textChannel', channel: channelId};
            updateMessage(channelId as string, mockMessageId, newMessage);
        } else {
            toast.error(response?.data.message || "Failed to send message. Please try again.");
            console.error("Failed to send message:", response?.data.message);
        }
    };

    return (
        
        <div className="flex-1 bg-background overflow-y-auto">
            <div className="shrink-0 sticky top-0 h-12 z-10 border-b border-border bg-background p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Hash className="inline" />
                    <span>{channel?.name || "Channel"}</span>
                </div>
                <div className="flex items-center gap-5">
                    <Users onClick={() => setShowMembers(!showMembers)} className="cursor-pointer w-5 h-5 text-foreground/70 hover:text-foreground" />
                    <input
                        placeholder="Search"
                        className="w-60 h-8 bg-layer-2 text-sm text-muted-foreground rounded p-2 outline-none"
                    />
                </div>
            </div>
            <div className="flex flex-1 bg-background overflow-y-auto">
                <div className="flex flex-col flex-1 bg-background min-h-0">
                    <ServerChatArea />
                    <div className="relative bottom-3 px-2 pt-0 w-full bg-background">
                        <Input onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey){e.preventDefault();handleSendMessage();}}} value={msg} onChange={(e) => setMsg(e.target.value)} className="min-h-15 bg-layer-2! w-full!"/>
                        <SendHorizonal onClick={handleSendMessage} className="absolute right-7 bottom-5 w-5 h-5 text-foreground/70 hover:text-foreground cursor-pointer"/>
                    </div>
                </div>
                {showMembers && <MembersList />}
            </div>
        </div>
    )
};

export default ChannelPage;
