import { getMessages } from "@/services/convoService";
import { useDMStore } from "@/store/useDMStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


const useGetDmMessages = (dmId: string) => {
    const router = useRouter();
    const { setDMs, dms, setLoading } = useDMStore();
    useEffect(() => {
        const fetchMessages = async () => {
            if (!dms[dmId].messages || dms[dmId].messages.length === 0) {
                setLoading(true);
            }
            try {
                const response = await getMessages(dmId);
                const data = response?.data;
                if (data.success) {
                    const updatedDMs = {
                        ...dms,
                        [dmId]:{
                            ...dms[dmId],
                            messages: data.messages,
                        },
                    };
                    setDMs(updatedDMs);
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
        if(dmId) fetchMessages();
    }, [router, dmId]);   
}

export default useGetDmMessages;

