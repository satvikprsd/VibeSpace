"use client";
import ChatArea from "@/components/server/ChatArea";
import { Input } from "@/components/ui/input";
import useGetMessages from "@/hooks/useGetMessages";
import { sendMessage } from "@/services/textChannelService";
import { useServerStore } from "@/store/useServerStore";
import { useTextChannelStore } from "@/store/useTextChannelStore";
import { useUserStore } from "@/store/useUserStore";
import { Hash, SendHorizonal } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ChannelPage = () => {
    const { channelId } = useParams();
    const { server } = useServerStore();
    useGetMessages(channelId as string);
    const channel = server?.textChannels.find((ch) => ch._id === channelId);
    const [msg, setMsg] = useState("");
    const {messages, setMessages} = useTextChannelStore();
    const {user} = useUserStore();

    const handleSendMessage = async () => {
        const response = await sendMessage(channelId as string, { content: msg });
        if (response?.data.success) {
            const newMessage = {...response?.data.messageData, sender: user, origin: 'textChannel', channel: channelId};
            console.log(newMessage);
            setMessages([...messages, newMessage]);
            setMsg("");
        } else {
            toast.error(response?.data.message || "Failed to send message. Please try again.");
            console.error("Failed to send message:", response?.data.message);
        }
    };

    return (
        <div className="flex flex-col flex-1 bg-background min-h-0">
            <div className="shrink-0 sticky top-0 h-12 z-10 border-b border-border bg-background">
                <h2 className="text-base font-semibold text-foreground px-3 py-3 h-12 border-b border-border">
                    <Hash className="inline mr-2" />
                    {channel?.name || "Channel"}
                </h2>
            </div>
            <ChatArea />
            <div className="relative bottom-0 p-2 pt-0 mt-px w-full bg-background">
                <Input onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey){e.preventDefault();handleSendMessage();}}} value={msg} onChange={(e) => setMsg(e.target.value)} className="h-15 bg-layer-2! w-full!"/>
                <SendHorizonal onClick={handleSendMessage} className="absolute right-7 bottom-7 w-5 h-5 text-foreground/70 hover:text-foreground cursor-pointer"/>
            </div>
        </div>
    )
};

export default ChannelPage;
