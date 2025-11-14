import { getFriends, getPendingFriendRequests } from "@/services/userService";
import { useFriendsStore } from "@/store/useFriendsStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


const useGetPendingRequests = () => {
    const router = useRouter();
    const {setPendingRequests} = useFriendsStore();
    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const response = await getPendingFriendRequests();
                const data = response?.data;
                if (data.success) {
                    setPendingRequests(data.requests);
                } else {
                    toast.error(data.message || "Failed to fetch friends. Please try again.");
                }

            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        fetchPendingRequests();
    }, [router]);   
}

export default useGetPendingRequests;
