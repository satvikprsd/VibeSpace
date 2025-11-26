import { getUserConvos } from "@/services/convoService";
import { DM, useDMStore } from "@/store/useDMStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


const useGetConvos = () => {
    const router = useRouter();
    const { setDMs , dms} = useDMStore();
    useEffect(() => {
        const fetchConvos = async () => {
            try {
                const response = await getUserConvos();
                const data = response?.data;
                const convos = Object.fromEntries(
                    data.convos.map((convo: DM) => {
                        const { messages, ...rest } = convo; 
                        return [convo._id, rest];
                    })
                );
                if (data.success) {
                    const mergedConvos = { ...convos, ...dms};
                    setDMs(mergedConvos);
                } else {
                    toast.error(data.message || "Failed to fetch convos. Please try again.");
                }

            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        fetchConvos();
    }, [router]);   
}

export default useGetConvos;

