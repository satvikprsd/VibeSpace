import { getInviteDetails } from "@/services/serverService";
import { useInviteStore } from "@/store/useInviteStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


const useGetInviteDetails = (inviteCode: string) => {
    const router = useRouter();
    const {setInvite, setLoading} = useInviteStore();
    useEffect(() => {
        const fetchInvite = async () => {
            setLoading(true);
            setInvite(null);
            try {
                const response = await getInviteDetails(inviteCode);
                const data = response?.data;
                if (data.success) {
                    setInvite(data.invite);
                } else {
                    toast.error(data.message || "Failed to fetch Invite. Please try again.");
                }

            } catch (error) {
                console.error(error);
                throw error;
            }
            finally {
                setLoading(false);
            }
        }
        if(inviteCode) fetchInvite();
    }, [router, inviteCode, setInvite, setLoading]);   
}

export default useGetInviteDetails;

