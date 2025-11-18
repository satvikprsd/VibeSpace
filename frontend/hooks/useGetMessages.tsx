import { getMessages } from "@/services/textChannelService";
import { useTextChannelStore } from "@/store/useTextChannelStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


const useGetMessages = (channelId: string) => {
    const router = useRouter();
    const { setMessages } = useTextChannelStore();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages(channelId);
                const data = response?.data;
                if (data.success) {
                    setMessages(data.messages);
                } else {
                    toast.error(data.message || "Failed to fetch messages. Please try again.");
                }

            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        fetchMessages();
    }, [router]);   
}

export default useGetMessages;

