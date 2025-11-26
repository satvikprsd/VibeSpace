import { getMessages } from "@/services/textChannelService";
import { useTextChannelStore } from "@/store/useTextChannelStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


const useGetServerMessages = (channelId: string) => {
    const router = useRouter();
    const { setTextChannels, textChannels, setLoading } = useTextChannelStore();
    useEffect(() => {
        const fetchMessages = async () => {
            if (!textChannels[channelId]) {
                setLoading(true);
            }
            try {
                const response = await getMessages(channelId);
                const data = response?.data;
                if (data.success) {
                    const updatedTextChannels = {
                        ...textChannels,
                        [channelId]:data.messages,
                    };
                    setTextChannels(updatedTextChannels);
                } else {
                    toast.error(data.message || "Failed to fetch messages. Please try again.");
                }

            } catch (error) {
                console.error(error);
                throw error;
            }
            finally {
                setLoading(false);
            }
        }
        fetchMessages();
    }, [router]);   
}

export default useGetServerMessages;

