import { getServerById } from "@/services/serverService";
import { useServerStore } from "@/store/useServerStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


const useGetServer = (serverId: string) => {
    const router = useRouter();
    const {setServer, servers} = useServerStore();
    useEffect(() => {
        const fetchServer = async () => {
            try {
                const response = await getServerById(serverId);
                const data = response?.data;
                if (data.success) {
                    router.push(`/channels/${serverId}/${data.server.defaultChannelId}`);
                    setServer(data.server);
                } else {
                    toast.error(data.message || "Failed to fetch server.");
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        if (!serverId || serverId === "%40me") return;
        if (servers[serverId]) {
            setServer(servers[serverId]);
            return;
        }
        fetchServer();
    }, [router, serverId, setServer, servers]);   
}

export default useGetServer;

